export const strict = false

export const state = () => ({
  locale: 'en',
  languages: [
  	{
  		name: 'English',
  		abbr: 'en'
  	},
   	{
  		name: 'French',
  		abbr: 'fr'
  	}
  ]
})

export const getters = {
  all(state) {
    return state.languages
  }
}

export const mutations = {
  SET(state, locale) {
    state.locale = locale
  }
}

export const actions = {

}
