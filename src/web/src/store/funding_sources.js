export const strict = false

export const state = () => ({
  list: [
    {
      name: {
        en: 'Yukon Excellence Award',
        fr: 'Yukon Excellence Award'
      },
      status: 'PENDING'
    },
    {
      name: {
        en: 'Yukon Grant',
        fr: 'Yukon Grant',
      },
      status: 'PENDING'
    },
    {
      name: {
        en: 'Canada Student Loans and Grants',
        fr: 'Canada Student Loans and Grants'
      },
      status: 'PENDING'
    }
  ]
})

export const getters = {
  list(state) {
    return state.list
  }
}

export const mutations = {
  POPULATE(state, documents) {
    state.list = documents
  }
}

export const actions = {

}
