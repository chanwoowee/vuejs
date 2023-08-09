const state = {
  inventory : [
    {
      "totSellamnt": 111,
      "returnValue": "success",
      "drwNoDate": "2019-06-01",
      "firstWinamnt": 4872108844,
      "drwtNo6": 25,
      "drwtNo4": 21,
      "firstPrzwnerCo": 4,
      "drwtNo5": 22,
      "bnusNo": 24,
      "firstAccumamnt": 19488435376,
      "drwNo": 861,
      "drwtNo2": 17,
      "drwtNo3": 19,
      "drwtNo1": 11
    },
    {
      "totSellamnt": 222,
      "returnValue": "success",
      "drwNoDate": "2019-06-01",
      "firstWinamnt": 4872108844,
      "drwtNo6": 23,
      "drwtNo4": 11,
      "firstPrzwnerCo": 24,
      "drwtNo5": 32,
      "bnusNo": 44,
      "firstAccumamnt": 19488435376,
      "drwNo": 862,
      "drwtNo2": 19,
      "drwtNo3": 12,
      "drwtNo1": 13
    }
  ]
};

const mutations = {
  updateInventory(state, payload) {
    console.log(state, payload)
  }
};

const getters = {
};

const actions = {
  updateInventory(store, payload) {
    store.commit('updateInventory', payload)
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