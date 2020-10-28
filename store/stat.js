export const STAT_MODULE_NAMESPACE = 'stat'
export const NET_INFO = 'netinfo'
export const PRICE = 'price'
export const TOP_WALLET_LIST = 'topWalletList'
export const TOP_WALLET_LIST_PAGINATION = 'topWalletListPagination'

const DEFAULT_PAGINATION = {
  page: 1,
  size: 20,
  total: 0,
}

export const state = () => ({
  [NET_INFO]: null,
  [PRICE]: null,
  [TOP_WALLET_LIST]: [],
  [TOP_WALLET_LIST_PAGINATION]: DEFAULT_PAGINATION,
})

export const SET_NET_INFO = 'setNetInfo'
export const SET_PRICE = 'setPrice'
export const SET_TOP_WALLET_LIST = 'setTopWalletList'
export const SET_TOP_WALLET_LIST_PAGINATION = 'setTopWalletListPagination'

export const mutations = {
  [SET_NET_INFO](state, obj) {
    state[NET_INFO] = obj
  },
  [SET_PRICE](state, obj) {
    state[PRICE] = obj
  },
  [SET_TOP_WALLET_LIST](state, list) {
    state[TOP_WALLET_LIST] = list
  },
  [SET_TOP_WALLET_LIST_PAGINATION](state, pagination) {
    state[TOP_WALLET_LIST_PAGINATION] = pagination
  },
}

export const FETCH_NET_INFO = 'loadNetInfo'
export const FETCH_PRICE = 'loadPrice'
export const FETCH_TOP_WALLET_LIST = 'loadTopWalletList'

export const actions = {
  async [FETCH_NET_INFO]({ commit }) {
    const response = await this.$axios.get('/api/stats/netinfo')

    commit(SET_NET_INFO, response.data)
  },
  async [FETCH_PRICE]({ commit }) {
    const response = await this.$axios.get('/api/stats/price')

    commit(SET_PRICE, response.data)
  },
  async [FETCH_TOP_WALLET_LIST]({ commit, state }, payload) {
    const response = await this.$axios.get('/api/stats/richest', {
      params: {
        page: payload?.page || state[TOP_WALLET_LIST_PAGINATION].page,
        size: payload?.size || state[TOP_WALLET_LIST_PAGINATION].size,
        sort: 1,
      },
    })

    commit(SET_TOP_WALLET_LIST, response.data.items)
    commit(SET_TOP_WALLET_LIST_PAGINATION, {
      page: response.data.page,
      size: response.data.size,
      total: response.data.total,
    })
  },
}
