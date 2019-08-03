// const HueConnection = require('./HueConnection');
import HueConnection from './HueConnection';

const hue = require('node-hue-api');

export default class HueAction {
  constructor(ip, username) {
    this.hueConnection = new HueConnection(ip, username);
    this.api = this.hueConnection.getConnection();
    this.state = hue.lightState.create();
  }

  singleLightsAction(light, state) {
    if (!this.api) return;

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
    if (!this.api) return;

    this.api.setGroupLightState(0, state)
      .then((result) => {
        console.log(result);
      })
      .fail((error) => {
        throw error;
      })
      .done();
  }

  searchBridge() {
    return this.hueConnection.searchBridge();
  }

  getCreds() {
    return this.hueConnection.getCreds();
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

  blink(sleep, transitionTime, x, y, bri = 254, sat = 254) {
    const stateOn = hue.lightState.create().off().bri(bri)
      .sat(sat)
      .xy(x, y)
      .transitionTime(transitionTime)
      .on(true);
    this.allLightsAction(stateOn);
    setTimeout(() => {
      this.allLightsAction(this.state.transitionTime(transitionTime).off());
    }, sleep);
  }

  off() {
    const state = hue.lightState.create().off();
    this.allLightsAction(state);
  }

  default() {
    const state = hue.lightState.create().off().white(350, 20)
      .effect('none')
      .on(true)
      .transitionTime(2);
    this.allLightsAction(state);
  }

  explode() {
    const state = hue.lightState.create().off().bri(254)
      .sat(254)
      .xy(0.5546, 0.4111)
      .effect('none')
      .on(true)
      .transitionTime(2);
    this.allLightsAction(state);
  }

  freeze() {
    const state = hue.lightState.create().off().bri(254)
      .sat(254)
      .xy(0.1557, 0.1454)
      .effect('none')
      .on(true)
      .transitionTime(2);
    this.allLightsAction(state);
  }

  defuse() {
    const state = hue.lightState.create().off().bri(254)
      .sat(254)
      .xy(0.1955, 0.6808)
      .effect('none')
      .on(true)
      .transitionTime(2);
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
