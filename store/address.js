export const ADDRESS_MODULE_NAMESPACE = 'address'
export const ADDRESS = 'address'

export const state = () => ({
  [ADDRESS]: null,
})

export const SET_ADDRESS = 'setAddress'

export const mutations = {
  [SET_ADDRESS](state, block) {
    state[ADDRESS] = block
  },
}

export const FETCH_ADDRESS = 'loadAddress'

export const actions = {
  async [FETCH_ADDRESS]({ commit, state }, payload) {
    const response = await this.$axios.get(`/api/address/${payload.hash}`)

    commit(SET_ADDRESS, response.data)
  },
}
