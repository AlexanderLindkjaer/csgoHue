const state = {
  game_data: {},
  current_state: '',
};

const getters = {
  game_data: state => state.game_data,
  current_state: state => state.current_state,
};

const mutations = {
  SET_GAME_DATA(state, data) {
    state.game_data = data;
  },
  SET_CURRENT_STATE(state, event) {
    state.current_state = event;
  },
};

const actions = {
  setGameData({ commit }, data) {
    // do something async
    commit('SET_GAME_DATA', data);
  },
  setCurrentState({ commit }, event) {
    commit('SET_CURRENT_STATE', event);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
