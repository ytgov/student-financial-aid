export const strict = false

export const state = () => ({
  list: []
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
  }
}

export const actions = {
  get({ commit, dispatch }, { app }) {
    return new Promise((resolve, reject) => {
      app.$api_storage.get('/api/storage/files').then(response => {
        resolve(response)
      }).catch((error) => {
        console.error(error)
        reject(error)
      });
    })
  },
  create({ commit, dispatch }, { app, values }) {
    return new Promise((resolve, reject) => {
      app.$api_storage.post('/api/storage/files', { values }).then(response => {
        resolve(response)
      }).catch((error) => {
        console.error(error)
        reject(error)
      });
    })
  },
  update({ commit, dispatch }, { app, id, values }) {
    return new Promise((resolve, reject) => {
      app.$api_storage.put(`/api/storage/files/${id}`, { values }).then(response => {
        resolve(response)
      }).catch((error) => {
        console.error(error)
        reject(error)
      });
    })
  },
  delete({ commit, dispatch }, { app, id }) {
    return new Promise((resolve, reject) => {
      app.$api_storage.delete(`/api/storage/files/${id}`).then(response => {
        resolve(response)
      }).catch((error) => {
        console.error(error)
        reject(error)
      });
    })
  }
}
