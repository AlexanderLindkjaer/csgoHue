
export default class GameEventHandler {
  constructor(hueAction) {
    this.hueAction = hueAction;
    this.prev_state = '';
  }

  handleEvent(state) {
    console.log(`Game event Handling state: ${state}`);

    if (this.prev_state !== state) {
      this.prev_state = state;
      return;
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
        this.bombPlant();
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

  bombPlant() {
    console.log('bomb plant', this.prev_state);
  }

  colorLoop() {
    this.hueAction.off();
    this.hueAction.colorloop();
    setTimeout(() => { this.hueAction.off(); }, 15000);
  }

  startup() {
    this.hueAction.startupBlink();
  }
}
