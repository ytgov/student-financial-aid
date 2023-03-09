export const strict = false

export const state = () => ({
  list: []
})

export const getters = {
  list(state) {
    return state.list
  },
  count(state) {
    return state.list.length
  }
}

export const mutations = {
  SET(state, alert) {
    state.list.push(alert)
  }
}

export const actions = {

}



