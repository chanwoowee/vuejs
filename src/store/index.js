import { createStore } from 'vuex'
import home from "./modules/home"
import chat from "./modules/chat"
import lotto from "./modules/lotto"

export default createStore({
  modules: {
    home,
    chat,
    lotto
  }
})