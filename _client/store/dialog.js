export const state = () => ({
  sign: {
    active: false
  },
  error: {
    active: false,
    message: null,
    status: null
  }
})

export const getters = {
  getSign(state) {
    return state.sign
  },
  getError(state) {
    return state.error
  }
}

export const mutations = {
  // Sign
  openSign (state) {
    state.sign.active = true
  },
  closeSign (state) {
    state.sign.active = false
  },
  
  // Error
  openError (state, data) {
    state.error.active = true
    state.error.message = !!data && data.message
    state.error.status = !!data && data.status
  },
  closeError (state) {
    state.error.active = false
  },
}