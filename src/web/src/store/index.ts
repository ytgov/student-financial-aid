import Vue from "vue";
import Vuex from "vuex";

// import { secureGet } from "./jwt";

export default new Vuex.Store({
  getters: {},
  state: {
    user: {},
    initializationComplete: false
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_COMPLETE(state, value) {
      state.initializationComplete = value;
    }
  },
  actions: {
    async initialize(state) {
      console.log("Initializing Store");

      console.log("Initializing Complete");

      state.commit("SET_COMPLETE", true);
      //state.initializationComplete = true;
    }
    //TODO
    // async getCurrentUser(state) {
    //   let userResp = await secureGet(`${USER_URL}/me`);
    //   state.commit("SET_USER", userResp.data.data);
    //   return userResp.data.data;
    // },
  },
  modules: {}
});
