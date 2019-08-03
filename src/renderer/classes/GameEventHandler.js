const Timer = require('tiny-timer');

export default class GameEventHandler {
  constructor(hueAction) {
    this.hueAction = hueAction;
    this.prev_state = '';
    this.bomb_time = 0;
    this.timer = this.timer = new Timer({ interval: 1000, stopwatch: false });
  }

  handleEvent(state) {
    console.log(`Game event Handling state: ${state}`);

    if (this.prev_state === state) {
      console.log('prev state match');
      return;
    }

    if (state !== 'planted') {
      this.timer.stop();
    }

    switch (state) {
      case 'freeze':
        this.hueAction.freeze();
        break;
      case 'default':
        this.hueAction.default();
        break;
      case 'off':
        this.hueAction.off();
        break;
      case 'planted':
        this.bombPlant(state);
        break;
      case 'defuse':
        this.hueAction.defuse();
        break;
      case 'exploded':
        this.hueAction.explode();
        break;
      case 'colorloop':
        this.colorLoop();
        break;
      default:
        this.hueAction.default();
        break;
    }

    this.prev_state = state;
  }

  bombPlant(state) {
    if (state !== 'planted') return;
    this.timer = new Timer({ interval: 1000, stopwatch: false });
    this.timer.start(40000, 2000);
    this.timer.on('statusChanged', status => console.log('status change:', status));

    this.hueAction.blink(1000, 4, 0.679, 0.3138, 150, 200);

    this.timer.on('tick', (ms) => {
      console.log(ms);
      if (ms >= 20000) {
        this.hueAction.blink(1000, 4, 0.679, 0.3138, 50, 150);
      }
      if (ms > 10000 && ms < 20000) {
        this.hueAction.blink(1000, 4, 0.679, 0.3138, 140, 254);
      }
      if (ms > 0 && ms < 10000) {
        this.hueAction.blink(1000, 4, 0.679, 0.3138);
      }
    });
  }

  colorLoop() {
    this.hueAction.off();
    this.hueAction.colorloop();
    setTimeout(() => { this.hueAction.off(); }, 15000);
  }

  getHueApi() {
    return this.hueAction.api;
  }

  startup() {
    this.hueAction.startupBlink();
  }
}
