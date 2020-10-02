import Vue from 'vue'
import Vuex from 'vuex'
import apiClient from '../services/api'
import createPersistedState from 'vuex-persistedstate'
import router from '../router/'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    user: {},
    loggedIn: false,
    borrowers: [],
    books: [],
    categories: [],
    onlyCategories: [],
    loans: []
  },
  getters: {
    getBooks: state => {
      return state.books
    }
  },
  mutations: {
    user: (state, userData) => {
      state.user = userData
    },
    loggedStatus: (state, value) => {
      state.loggedIn = value
    },
    borrower: (state, data) => {
      state.borrowers = data
    },
    book: (state, data) => {
      state.books = data
    },
    changeBooks: (state, books) => {
      state.books = books
    },
    categories: (state, data) => {
      state.categories = data
      const only = []
      data.forEach(cat => {
        only.push(cat.wording)
      })
      state.onlyCategories = only
    },
    GET_LOAN: (state, data) => {
      state.loans = data
    }
  },
  actions: {
    getAuth: async (context) => {
      try {
        const response = await apiClient.get('/api/user')
        context.commit('user', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    login: (context, data) => {
      apiClient.get('/sanctum/csrf-cookie').then(res => {
        apiClient.post('/login', data).then(response => {
          context.commit('loggedStatus', true)
          router.replace({ name: 'home' })
        }).catch(err => console.log(err))
      }).catch(err => {
        console.log(err)
      })
    },
    logout: ({ commit }) => {
      apiClient.post('/logout').then(response => {
        commit('loggedStatus', false)
        commit('user', {})
      }).catch(error => {
        console.log(error)
      })
    },
    borrowers: async ({ commit }) => {
      try {
        const response = await apiClient.get('/api/borrower')
        commit('borrower', response.data.data)
      } catch (err) {
        console.log(err)
      }
    },
    getBooks: async ({ commit }) => {
      try {
        const response = await apiClient.get('/api/book')
        commit('changeBooks', response.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    getCategory: async ({ commit }) => {
      try {
        const response = await apiClient.get('/api/category')
        const categories = response.data.data
        commit('categories', categories)
      } catch (error) {
        console.log(error)
      }
    },
    loans: async ({ commit }) => {
      try {
        const response = await apiClient.get('/api/loan')
        commit('GET_LOAN', response.data.data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
  }
})
