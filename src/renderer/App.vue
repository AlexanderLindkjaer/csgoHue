<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <div><small>{{data}}</small></div>
    <h2>{{lastState}}</h2>
    <router-view></router-view>
  </div>
</template>

<script>

import StateExtractor from './classes/StateExtractor';
const http = require('http');
export default {
  name: 'csgo-gue',
  data() {
    return {
      server: null,
      data: null,
      lastState: '',
    };
  },
  mounted() {
    this.createHttpServer();
  },
  computed: {
    defaultComputed() {
      return '';
    },
  },
  methods: {
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
        this.data = postDataObject;
        this.handleGameData();
      });
    },
    handleGameData() {
      this.lastState = StateExtractor.extract(this.data);
      console.log(this.lastState);
    },
  },
};
</script>

<style>
  /* CSS */
</style>
