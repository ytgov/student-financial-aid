export const strict = false

export const state = () => ({
  list: [
    {
      name: 'Army Yukon Scolorship',
      eligible: (profile) => {
        return profile.scolorship.is_high_school_student == 'Yes'
      }
    },
    {
      name: 'Nicolas John Hararch Scoloarship',
      eligible: (profile) => {
        return (
          profile.scolorship.is_high_school_student == 'Yes' && 
          profile.scolorship.is_high_school_graduate == 'Yes'
        ) && profile.scolorship.is_pursuing_aviation == 'Yes'
      }
    },
    {
      name: 'Yukon Art Society Scolorship',
      eligible: (profile) => {
        return profile.scolorship.is_high_school_student == 'Yes' && 
          profile.scolorship.is_high_school_graduate == 'Yes' 
      }
    },
    {
      name: 'Huskies CB Radio Club Scolarship',
      eligible: (profile) => {
        return profile.scolorship.is_high_school_student == 'Yes' && 
          profile.scolorship.is_high_school_graduate == 'Yes' 
      }
    }
  ]
})


export const getters = {
  list(state) {
    return state.list
  }
}

export const mutations = {
  POPULATE(state, scolorships) {
    state.list = scolorships
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
