export const strict = false

export const state = () => ({
  profile: {
    firstName: '',
    lastName: '',
    tombstone: {
      has_existing_alias: false
    },
    email: {
      use_existing: false,
      value: false,
      new: false
    },
    address: {
      permanent: false,
      at_school: false
    },
    phone: '',
    dob: '',
    sin: '',
    atipp: {
      read_terms: false
    }
  }
})

export const getters = {
  GET(state) {
    return state.profile
  }
}

export const mutations = {
  SET(state, values) {
    state.profile = Object.assign(state.profile, values)
  }
}

export const actions = {

}
