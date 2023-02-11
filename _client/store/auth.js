export const state = () => ({
  auth: null,
  id: null,
  profile: null
})

export const getters = {
  getActive(state) {
    return !!state.auth ? true : false
  },
  getID(state) {
    return state.id
  },
  getProfile(state) {
    return state.profile
  },
  getRole(state) {
    return !!state.auth ? state.auth['role'] : null
  }
}

export const mutations = {
  set (state, { _id, auth, profile }){
    state.auth = auth
    state.profile = profile
    state.id = _id
  },
  remove (state) {
    state.auth = null
    state.profile = null
    state.id = null
  }
}