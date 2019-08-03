<template>
    <div id="app" class="columns is-mobile">
        <div class="menu has-background-grey-dark has-text-white">
            <ul class="menu-list has-text-white">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/event-receiver">Event debugger</router-link>
                </li>
            </ul>
        </div>
        <div class="main column has-background-dark has-text-light">
            <router-view></router-view>
            <div class="creds">
                <span>Hue IP: {{hue_ip}}</span>
                <span>Hue Username: {{hue_username}}</span>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapGetters, mapActions } from 'vuex';
    import StateExtractor from './classes/StateExtractor';
    import GameEventHandler from './classes/GameEventHandler';
    import HueAction from './classes/hue/HueAction';

    const Store = require('electron-store');
    const http = require('http');

    export default {
      name: 'csgo-hue-controller',
      data() {
        return {
          server: null,
          data: null,
          lastState: '',
          gameEventHandler: null,
          hueAction: null,
          data_store: null,
          hue_ip: null,
          hue_username: null,
        };
      },
      mounted() {
        this.createHttpServer();
        this.setupHueConnection();
      },
      computed: {
        ...mapGetters([
          'game_data',
          'current_state',
        ]),
      },
      watch: {
        current_state() {
          this.handleNewGameEvent();
        },
      },
      methods: {
        ...mapActions(['setGameData', 'setCurrentState']),
        createHttpServer() {
          this.server = http.createServer((req, res) => {
            const route = req.url;
            console.log(route);
            if (route === '/csgo' && req.method === 'POST') {
              this.collectRequestData(req);
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(route);
            res.end();
          }).listen(8080);
        },
        setupHueConnection() {
          this.data_store = new Store();
          this.hue_ip = this.data_store.get('ip');
          this.hue_username = this.data_store.get('username');

          this.hueAction = new HueAction(this.hue_ip, this.hue_username);
          this.gameEventHandler = new GameEventHandler(this.hueAction);
          setTimeout(() => {
            this.$store.dispatch('setCurrentState', 'startup');

            if (!this.gameEventHandler.getHueApi()) {
              this.setupNewConnection();
              return;
            }

            this.gameEventHandler.startup();
          }, 1000);
        },
        setupNewConnection() {
          alert('No Hue connection - Press the hue bridge button before accepting this alert');
          this.hueAction.searchBridge();

          setTimeout(() => {
            const data = this.hueAction.getCreds();
            console.log(data);
            if (!data) {
              this.setupHueConnection();
              return;
            }

            this.data_store.set('ip', data.ip);
            this.data_store.set('username', data.username);
            this.setupHueConnection();
          }, 2000);
        },
        collectRequestData(request) {
          let body = '';
          request.on('data', (chunk) => {
            body += chunk;
          });
          request.on('end', () => {
            if (!body) {
              return;
            }
            const postDataObject = JSON.parse(body);
            this.$store.dispatch('setGameData', postDataObject);
            this.handleGameData();
          });
        },
        handleGameData() {
          const state = StateExtractor.extract(this.game_data);
          console.log('handle game data: ', state);
          this.$store.dispatch('setCurrentState', state);
        },
        handleNewGameEvent() {
          console.log('watch working');
          this.gameEventHandler.handleEvent(this.current_state);
        },
      },
    };
</script>



<style lang="scss">
    @import './assets/style.scss';
</style>
