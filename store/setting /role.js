export const state = () => ({
  roleList: []
})

export const actions = {

  // fetch user list
  fetchRoleList(vuexContext) {
    return this.$axios.$get('/role/index', {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then((response) => {
      vuexContext.commit('setRoleList', {roleList: response.roleList})
    }).catch(({response}) => {
      console.error('Setting/Role/fetchRoleList:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },
}

export const mutations = {
  setRoleList(state, payload) {
    state.roleList = payload.roleList
  },
}

export const getters = {
  getRoleList(state) {
    return state.roleList
  },
}
