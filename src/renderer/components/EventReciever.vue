<template>
    <div class="has-text-light">
        <div>
            <h1 class="is-size-3">{{current_state}}</h1>
        </div>
        <div>
            <p class="is-size-7">{{game_data}}</p>
        </div>
        <div>
            <system-information></system-information>
        </div>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex';
    import SystemInformation from './LandingPage/SystemInformation';

    export default {
      components: { SystemInformation },
      props: [],
      data() {
        return {
          default: null,
        };
      },
      mounted() {
      },
      computed: {
        ...mapGetters([
          'game_data',
          'current_state',
        ]),
      },
      methods: {

      },
    };
</script>

<style>
</style>
