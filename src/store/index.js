import Vue from 'vue'
import Vuex from 'vuex'

import { setIdToken, clearIdToken, setUserDetail, clearUserDetail } from '../utils/auth'

Vue.use(Vuex)

let API_URL = 'https://i-trust-u.com/api'

export const store = new Vuex.Store({
  state: {
    user: null,
    token: null,
    userDetail: null,
    loading: false,
    error: null,
    homeOrDashboardUrl: '/',
    apiUrl: API_URL
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserDetail(state, payload) {
      state.userDetail = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state, payload) {
      state.error = null
    },
    setHomeButtonToDashBoard(state, payload) {
      state.homeOrDashboardUrl = payload
    }
  },
  actions: {
    signIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      console.log('jalan');
      return new Promise((resolve, reject) => {
        Vue.axios({
          url: API_URL + '/users/custom-login',
          data: {
            email: payload.email,
            password: payload.password
          },
          method: 'POST'
        }).then(user => {
            console.log('get user : ', user.data);
            commit('setLoading', false)
            // set token and user detail to Vuex
            commit('setToken', user.data.token)
            commit('setUserDetail', user.data.userDetail)
            // set token and user detail to localStorage
            setIdToken(user.data.token)
            setUserDetail(user.data.userDetail)
            resolve()
        }).catch(error => {
          console.log('Error when login : ', error);
          commit('setLoading', false)
          commit('setError', error)
          reject(error)
        })
      })
    },
    signOut ({ commit }, payload) {
      commit('setToken', null)
      commit('setUserDetail', null)
      clearIdToken()
      clearUserDetail()
    }
  },
  getters: {
    token (state) {
      return state.token
    },
    userDetail (state) {
      return state.userDetail
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    homeOrDashboardUrl(state) {
      return state.homeOrDashboardUrl
    },
    apiUrl(state) {
      return state.apiUrl
    }
  }
})
