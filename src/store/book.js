import apiClient from '../services/api'

const books = {
  namespaced: true,
  state: () => ({
    books: []
  }),
  getters: {
    getBooks: state => {
      return state.books
    }
  },
  mutations: {
    changeBooks: (state, books) => {
      state.books = books
    }
  },
  actions: {
    getBooks: async ({ commit }) => {
      try {
        const response = apiClient.get('/api/book')
        commit('changeBooks', response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default books
