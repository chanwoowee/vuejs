const state = {
  s_received: [],
  count: 0
};

const mutations = {
  updateS_received(state, payload) {
    state.s_received.push(payload)
    state.count = state.s_received.length - 1
    console.log(state.count)
  }
};

const getters = {
};

const actions = {
  updateS_received(store, payload) {
    store.commit('updateS_received', payload)
  },
};

const module = {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations
};

export default module;
