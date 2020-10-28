export const BLOCK_MODULE_NAMESPACE = 'block'
export const BLOCK = 'block'
export const BLOCK_LIST = 'blockList'
export const BLOCK_LIST_PAGINATION = 'blockListPagination'

const DEFAULT_PAGINATION = {
  page: 1,
  size: 20,
  total: 0,
}

export const state = () => ({
  [BLOCK]: null,
  [BLOCK_LIST]: [],
  [BLOCK_LIST_PAGINATION]: DEFAULT_PAGINATION,
})

export const SET_BLOCK = 'setBlock'
export const SET_BLOCK_LIST = 'setBlockList'
export const SET_BLOCK_LIST_PAGINATION = 'setBlockListPagination'

export const mutations = {
  [SET_BLOCK](state, block) {
    state[BLOCK] = block
  },
  [SET_BLOCK_LIST](state, list) {
    state[BLOCK_LIST] = list
  },
  [SET_BLOCK_LIST_PAGINATION](state, pagination) {
    state[BLOCK_LIST_PAGINATION] = pagination
  },
}

export const FETCH_BLOCK = 'loadBlock'
export const FETCH_BLOCK_LIST = 'loadBlockList'

export const actions = {
  async [FETCH_BLOCK]({ commit, state }, payload) {
    const response = await this.$axios.get(`/api/block/${payload.hash}`)

    commit(SET_BLOCK, response.data)
  },
  async [FETCH_BLOCK_LIST]({ commit, state }, payload) {
    const response = await this.$axios.get('/api/block', {
      params: {
        page: payload?.page || state[BLOCK_LIST_PAGINATION].page,
        size: payload?.size || state[BLOCK_LIST_PAGINATION].size,
        sort: 1,
      },
    })

    commit(SET_BLOCK_LIST, response.data.items)
    commit(SET_BLOCK_LIST_PAGINATION, {
      page: response.data.page,
      size: response.data.size,
      total: response.data.total,
    })
  },
}
