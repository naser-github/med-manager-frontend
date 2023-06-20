export const state = () => ({
  roleList: [],
  roleToEdit: {},
})

export const actions = {

  // fetch role list
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

  // store new role
  store(vuexContext, payload) {
    return this.$axios.$post('/role/store', payload, {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then(() => {
      this.$router.replace('/setting/role-management').then(() =>
        this.toast('success', 'Success', 'role has been created')
      )
    }).catch(({response}) => {
      console.error('role/store:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },

  // edit role
  edit(vuexContext, payload) {
    return this.$axios.$get('/role/' + payload.id + '/edit', {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then(response => {
      vuexContext.commit('setRoleData', response.role)
      vuexContext.commit('setting /permission/setPermissionList', {permissionList: response.permissions}, {root: true})
    }).catch(({response}) => {
      console.error('role/edit:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },
  // update role
  update(vuexContext, payload) {
    return this.$axios.$put('/role/' + payload.id + '/update', payload, {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then(() => {
      this.$router.replace('/setting/role-management').then(() => {
        this.toast('success', 'Success', 'role has been updated')
      })
    }).catch(({response}) => {
      console.error('role/update:', response)
    })
  },
}

export const mutations = {
  setRoleList(state, payload) {
    state.roleList = payload.roleList
  },

  setRoleData(state, payload) {
    state.roleToEdit = payload
  }
}

export const getters = {
  getRoleList(state) {
    return state.roleList
  },

  getRoleToEdit(state) {
    return state.roleToEdit
  },
}
