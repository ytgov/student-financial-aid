export const strict = false

export const state = () => ({
  list: [
    {
      date: '2020/21',
      name: {
        en: 'High School Transcript',
        fr: 'Relevé de notes du secondaire'
      },
      status: 'VERIFIED',
      resource: '2020-high-school-transcript'
    },
    {
      date: '2020/21',
      name: {
        en: 'Letter of Acceptance',
        fr: 'Lettre d\'acceptation',
      },
      status: 'UPLOADING',
      resource: '2020-letter-of-acceptance'
    },
    {
      date: '2020/21',
      name: {
        en: 'Spouse Income Tax (2018)',
        fr: 'Impôt sur le revenu du conjoint (2018)'
      },
      status: 'PENDING',
      resource: '2018-spouse-income-tax'
    },
    {
      date: '2020/21',
      name: {
        en: 'Student Income Tax (2018)',
        fr: 'Impôt sur le revenu des étudiants (2018)'
      },
      status: 'PENDING',
      resource: '2018-student-income-tax'
    }
  ]
})

export const getters = {
  list(state) {
    return state.list
  },
  by_resource: (state) => (resource) => {
    return _.find(state.list, { resource })
  }
}



export const mutations = {
  POPULATE(state, documents) {
    state.list = documents
  },
  CLEAR(state) {
    state.list = []
  }
}

export const actions = {
  async init({ commit }) {
    let { data } = await this.$axios.get('/SfaDocumentLinks', { student_id: 2 })
    commit('POPULATE', data) 
  },
  create({ commit, dispatch }, { values }) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/SfaDocumentLinks', { values }).then(response => {
        resolve(response)
      }).catch((error) => {
        console.error(error)
        reject(error)
      });
    })
  },
  update({ commit, dispatch }, { id, values }) {
    return new Promise((resolve, reject) => {
      this.$axios.put(`/SfaDocumentLinks/${id}`, { values }).then(response => {
        resolve(response)
      }).catch((error) => {
        console.error(error)
        reject(error)
      });
    })
  },
  delete({ commit, dispatch }, { app, id }) {
    return new Promise((resolve, reject) => {
      this.$axios.delete(`/SfaDocumentLinks/${id}`).then(response => {
        resolve(response)
      }).catch((error) => {
        console.error(error)
        reject(error)
      });
    })
  }
}
