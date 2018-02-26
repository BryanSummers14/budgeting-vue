import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: !!localStorage.getItem('budget'),
    authToken: localStorage.getItem('budget'),
    userName: ''
  },
  getters: {
    authState: state => {
      return state.loggedIn
    },
    user: state => {
      return state.userName
    }
  },
  mutations: {
    login (state, payload) {
      state.loggedIn = true
      state.authToken = payload.authToken
      state.userName = payload.user.name
    },
    logout (state) {
      state.loggedIn = false
      state.authToken = null
      state.userName = ''
    }
  },
  actions: {
    login ({commit}, payload) {
      commit('login', payload)
    },
    logout ({commit}) {
      commit('logout')
    }
  }
})

export default store
