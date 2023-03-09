export const strict = false

export const state = () => ({
  list: [
  	{
      en: {
    		text: 'You have started an application that has not been submitted.',
    		link: {
    			text: 'Continue to application',
    			url: '/application'
    		}
      },
      fr: {
        text: 'Vous avez commencé une demande qui n\'a pas été soumise.',
        link: {
          text: 'Continuer à postuler',
          url: '/fr/application'
        }
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
  SET(state, alert) {
    state.list.push(alert)
  }
}

export const actions = {

}



