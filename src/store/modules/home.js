const state = {
  count: 0,
  counter: 0,
  message: 'welcome to Vue world'
};

const mutations = {
  increment: state => state.count++,
  decrement: state => state.count--,
  addcounter: state => state.counter++,
  resetCount(state, payload) {
      state.count = 0;
      alert('reseted!')
      console.log('store.mutation: ' + payload);
  },
};

const getters = {
  getMessage: state => state.message + '-GOOD'
};

const actions = {
  resetCount(store, payload) {
      console.log('store.action: ' + payload);
      store.commit('resetCount', payload)
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
