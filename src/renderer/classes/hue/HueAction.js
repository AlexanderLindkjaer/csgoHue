// const HueConnection = require('./HueConnection');
import HueConnection from './HueConnection';

const hue = require('node-hue-api');

export default class HueAction {
  constructor() {
    this.api = new HueConnection().getConnection();
    this.state = hue.lightState.create();
  }

  singleLightsAction(light, state) {
    this.api.setGroupLightState(light, state)
      .then((result) => {
        console.log(result);
      })
      .fail((error) => {
        throw error;
      })
      .done();
  }

  allLightsAction(state) {
    this.api.setGroupLightState(0, state)
      .then((result) => {
        console.log(result);
      })
      .fail((error) => {
        throw error;
      })
      .done();
  }

  test() {
    setTimeout(() => {
      this.singleLightsAction(1, this.state.off);
      this.off();
      this.blink(1000, 0.5, 0.1557, 0.1454);
      setTimeout(() => { this.default(); }, 1000);
      setTimeout(() => { this.explode(); }, 5000);
      setTimeout(() => { this.freeze(); }, 10000);
      setTimeout(() => { this.defuse(); }, 15000);
      setTimeout(() => { this.colorloop(); }, 20000);
      setTimeout(() => { this.off(); }, 40000);
    }, 1000);
  }

  blink(sleep, transitionTime, x, y) {
    const stateOn = hue.lightState.create().off().on(true).bri(254)
      .sat(254)
      .xy(x, y)
      .transitionTime(transitionTime);
    this.allLightsAction(stateOn);
    setTimeout(() => {
      this.allLightsAction(this.state.off().transitionTime(transitionTime));
    }, sleep);
  }

  off() {
    const state = hue.lightState.create().off();
    this.allLightsAction(state);
  }

  default() {
    const state = hue.lightState.create().off().on(true).white(350, 20)
      .transitionTime(1);
    this.allLightsAction(state);
  }

  explode() {
    const state = hue.lightState.create().off().on(true).bri(254)
      .sat(254)
      .xy(0.5546, 0.4111)
      .transitionTime(1);
    this.allLightsAction(state);
  }

  freeze() {
    const state = hue.lightState.create().off().on(true).bri(254)
      .sat(254)
      .xy(0.1557, 0.1454)
      .transitionTime(1);
    this.allLightsAction(state);
  }

  defuse() {
    const state = hue.lightState.create().off().on(true).bri(254)
      .sat(254)
      .xy(0.1955, 0.6808)
      .transitionTime(1);
    this.allLightsAction(state);
  }

  colorloop() {
    const state = hue.lightState.create().on().bri(254).sat(254)
      .effect('colorloop');
    this.allLightsAction(state);
  }

  startupBlink() {
    this.blink(1000, 0.5, 0.1557, 0.1454);
  }
}
// module.exports = HueAction;
// const h = new HueAction();
// h.test();
