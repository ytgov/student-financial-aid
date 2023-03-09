export const strict = false

export const state = () => ({
  menu_open: false
})


export const getters = {
  menu_open(state) {
    return state.menu_open
  }
}

export const mutations = {
  TOGGLE_MENU(state) {
    state.menu_open = !state.menu_open
  },
  TOGGLE_MENU_OFF(state) {
    state.menu_open = false
  }
}


export const actions = {
  async nuxtServerInit ({ commit, dispatch }, {app, req, redirect}) {
    console.log("RUNNING GLOBAL SERVER INIT.")

    console.log("Auth", this.$auth.loggedIn)
    console.log(this.$auth.strategy.token.get())

    if (this.$auth.loggedIn) {
      await dispatch('student/init')
      await dispatch('documents/init')
    }
  },
  nuxtClientInit ({ commit, dispatch }, {app, req, redirect, route}) {
    console.log("RUNNING GLOBAL CLIENT INIT.");
  }
}
