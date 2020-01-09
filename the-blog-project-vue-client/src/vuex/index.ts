import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import { cqClient } from '@/lib/cqClient';
import { AuthLoginResponseDTO } from '@/modules/auth/dtos/authLoginResponse.dto';

export default new Vuex.Store({
  state: {
    bootingState: '', // ERROR -> LOADING_CACHE -> SYNCING_SESSION -> AUTHENTICATED -> UNAUTHENTICATED -> ERROR
    isAuthenticated: false,
    user: null,
    roles: null,
    permissions: null
  },
  mutations: {
    SET_SESSION(state, loginResponse: AuthLoginResponseDTO) {
      console.log(loginResponse);
      window.localStorage.setItem('token', loginResponse.token);
      window.localStorage.setItem('user', JSON.stringify(loginResponse.user));
      state.isAuthenticated = true;
      state.user = loginResponse.user;
      state.permissions = loginResponse.permissions;
      state.roles = loginResponse.roles;
    },
    CLEAR_SESSION(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.roles = null;
      state.permissions = null;
    }
  },
  actions: {
    async syncSession({ commit }) {
      try {
        const loginResponse = await cqClient.command('auth.syncSession', { token: window.localStorage.getItem('token') });
        commit('SET_SESSION', loginResponse);
        return true;
      } catch (err) {
        return false;
      }
    },
    async loginUser({ commit }, { username, password }) {
      try {
        const loginResponse = await cqClient.command('auth.login', { username, password });
        commit('SET_SESSION', loginResponse);
        return true;
      } catch (err) {
        return false;
      }
    },
    logoutUser({ commit }) {
      commit('CLEAR_SESSION');
    }
  },
});
