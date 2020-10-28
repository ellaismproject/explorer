export const TRANSACTION_MODULE_NAMESPACE = 'transaction'
export const TRANSACTION = 'transaction'
export const TRANSACTION_LIST = 'transactionList'
export const TRANSACTION_LIST_PAGINATION = 'transactionListPagination'

const DEFAULT_PAGINATION = {
  page: 1,
  size: 20,
  total: 0,
}

export const state = () => ({
  [TRANSACTION]: null,
  [TRANSACTION_LIST]: [],
  [TRANSACTION_LIST_PAGINATION]: DEFAULT_PAGINATION,
})

export const SET_TRANSACTION = 'setBlock'
export const SET_TRANSACTION_LIST = 'setTransactionList'
export const SET_TRANSACTION_LIST_PAGINATION = 'setTransactionListPagination'

export const mutations = {
  [SET_TRANSACTION](state, block) {
    state[TRANSACTION] = block
  },
  [SET_TRANSACTION_LIST](state, list) {
    state[TRANSACTION_LIST] = list
  },
  [SET_TRANSACTION_LIST_PAGINATION](state, pagination) {
    state[TRANSACTION_LIST_PAGINATION] = pagination
  },
}

export const FETCH_TRANSACTION = 'loadTransaction'
export const FETCH_TRANSACTION_LIST = 'loadTransactionList'

export const actions = {
  async [FETCH_TRANSACTION]({ commit, state }, payload) {
    const response = await this.$axios.get(`/api/transaction/${payload.hash}`)

    commit(SET_TRANSACTION, response.data)
  },
  async [FETCH_TRANSACTION_LIST]({ commit, state }, payload) {
    let url = ''
    let params = null
    switch (payload.type) {
      case 'block':
        url = `/api/transaction/block/${payload.hash}`
        break
      case 'address':
        url = `/api/transaction/address/${payload.hash}`
        params = {
          page: payload?.page || state[TRANSACTION_LIST_PAGINATION].page,
          size: payload?.size || state[TRANSACTION_LIST_PAGINATION].size,
          sort: 1,
        }
        break
    }

    const response = await this.$axios.get(url, {
      params,
    })

    switch (payload.type) {
      case 'block':
        commit(SET_TRANSACTION_LIST, response.data)
        commit(SET_TRANSACTION_LIST_PAGINATION, DEFAULT_PAGINATION)
        break
      case 'address':
        commit(SET_TRANSACTION_LIST, response.data.items)
        commit(SET_TRANSACTION_LIST_PAGINATION, {
          page: response.data.page,
          size: response.data.size,
          total: response.data.total,
        })
        break
    }
  },
}
