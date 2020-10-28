export const SEARCH_MODULE_NAMESPACE = 'search'
export const SEARCH = 'search'

export const state = () => ({
  [SEARCH]: null,
})

export const SET_SEARCH = 'setSearch'

export const mutations = {
  [SET_SEARCH](state, obj) {
    state[SEARCH] = obj
  },
}

export const FETCH_SEARCH = 'loadSearch'

export const actions = {
  async [FETCH_SEARCH]({ commit }, payload) {
    const response = await this.$axios.get('/api/search', {
      params: {
        term: payload.term,
      },
    })

    commit(SET_SEARCH, response.data)
  },
}
