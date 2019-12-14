// import { cqClient } from '@/lib/cqClient';

// export const syncSession = ({ commit }) => {
//     cqClient.command('auth.checkToken', { token: window.localStorage.getItem('token') });
//     commit('SET_SESSION');
// };

// export const loginUser = (store: Vuex{ commit }, { username, password }) => {
//     console.log(username, password);
//     cqClient.command('auth.login', { username, password });
//     commit('SET_SESSION');
//     return false;
// };

// export const logoutUser = ({ commit }) => {
//     commit('CLEAR_SESSION');
// };
