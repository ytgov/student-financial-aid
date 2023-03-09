export const strict = false

var defaultData = {
  profile: {

  },
  documents: {
    
  }
}

export const state = () => ({
  application: Object.assign({}, defaultData),
  programs: [],
  list: [
    {
      date: '2020/21',
      name: {
        en: 'Yukon College',
        fr: 'Collège du Yukon'
      },
      status: 'SUBMITTED',
      past: false
    },
     {
      date: '2020/21',
      name: {
        en: 'Other College',
        fr: 'Other College'
      },
      status: 'SUBMITTED',
      past: false
    },
    {
      date: '2019/20',
      name: {
        en: 'Yukon College',
        fr: 'Collège du Yukon'
      },
      status: 'SUBMITTED',
      past: true
    }
  ]
})

export const getters = {
  GET(state) {
    return state.application
  },
  current(state) {
    return _.filter(state.list, (o) => { return !o.past })
  },
  past(state) {
    return _.filter(state.list, (o) => { return o.past==true })
  },
  programs(state) {
    return state.programs
  },
  list(state) {
    return state.list
  }
}

export const mutations = {
  SET(state, application) {
    state.application = Object.assign(state.application, application)
  },
  CLEAR(state) {
    state.application = Object.assign({}, defaultData)
  },
  TOGGLE_APPLICATION_PROGRAM(state, program) {


    var index = _.findIndex(state.programs, (o) => { 
      return o == program
    })

    console.log('FOUND INDEX', index);
    if (index !== -1) {
      state.programs = state.programs.filter((o) => {
        return o == program
      })
    } else {
      state.programs.push(program) 
    }

  },
  TOGGLE_APPLICATION_PROGRAMS(state, programs) {
    state.programs = programs
  }
}

export const actions = {
  async fetch({ commit }) {
    await axios.get('').then(response => {
      commit("SET", response.data);
    }).catch(() => {
      commit("CLEAR");
    });
  },
}
