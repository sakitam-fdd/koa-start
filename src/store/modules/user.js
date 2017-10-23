/**
 * Created by FDD on 2017/9/14.
 * @desc 用户store
 */

import {
  SET_USER_NAME,
  SET_USER_TOKEN
} from '../mutation-types'
// initial state
const state = {
  userToken: '',
  activeName: 'first',
  userName: ''
}
// getters
const getters = {
  userToken: state => state.userToken,
  userName: state => state.userName,
  activeName: state => state.activeName
}
// actions
const actions = {
  actionUserToken ({commit, state}, param) {
    commit(SET_USER_NAME, param)
  },
  actionUserName ({commit, state}, param) {
    commit(SET_USER_TOKEN, param)
  }
}
// mutations
const mutations = {
  [SET_USER_NAME] (state, data) {
    state.userToken = data
  },
  [SET_USER_TOKEN] (state, data) {
    state.userName = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
