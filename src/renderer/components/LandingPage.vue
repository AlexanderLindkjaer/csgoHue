<template>
  <div id="wrapper">
    <div class="logo-wrapper">
      <img id="logo1" src="~@/assets/img/csgo-logo.png" alt="electron-vue">
      <img id="logo2" src="~@/assets/img/hue-wheel-2.png" alt="electron-vue">
    </div>
    <div>
      <state-control></state-control>
    </div>
    <div class="mt-3" v-if="current_state">
      <p class="is-size-3">Current gamestate: <span class="is-capitalized">{{current_state}}</span></p>
    </div>
    <div class="mt-3" v-if="setting">

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import StateControl from './StateControl';

  export default {
    name: 'landing-page',
    components: { StateControl },
    data() {
      return {
        setting: false,
      };
    },
    computed: {
      ...mapGetters([
        'game_data',
        'current_state',
      ]),
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
</style>
