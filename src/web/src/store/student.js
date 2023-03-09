//import API from '~/plugins/api.js';

export const strict = false

export const state = () => ({
  list: [],
  profile: {}
})

export const getters = {
  GET(state) {
    return state.profile
  }
}

export const mutations = {
  SET(state, values) {
    state.profile = Object.assign(state.profile, values)
  },
  CLEAR(state) {
    state.profile = {}
  }
}


// https://api.gov.yk.ca/sfa/api/v1/data/profile

export const actions = {
  async init({ commit }) {
    let { data } = await this.$axios.get('/profile', { student_id: 2 })
    commit('SET', data[0])
  },
  async save({ commit, dispatch, getters }) {
    
    var values = getters['GET'];
    var id = values.STUDENT_ID

    var method = (id) ? 'put' : 'post';
    var endpoint = (id) ? `/profile` : '/profile'

    console.log(method, typeof values, endpoint, typeof this.$axios[method])

    var response = await this.$axios[method](endpoint, { ...values })

    console.log(response)
  }
}


