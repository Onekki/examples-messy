import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user'
import app from '@/store/app'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    app
  },
  getters: () => {
    return {
      gApp: app,
      gUser: user
    }
  }
})

export default store
