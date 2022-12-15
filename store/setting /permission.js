export const state = () => ({
  permissionList: [],
  permissionToEdit: {},
})

export const actions = {

  // fetch permission list
  fetchPermissionList(vuexContext) {
    return this.$axios.$get('/permission/index', {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then((response) => {
      vuexContext.commit('setPermissionList', {permissionList: response.permissionList})
    }).catch(({response}) => {
      console.error('Setting/Permission/fetchPermissionList:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },

  // store new role
  store(vuexContext, payload) {
    return this.$axios.$post('/permission/store', payload, {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then(() => {
      this.$router.replace('/setting/permission-management').then(() =>
        this.toast('success', 'Success', 'permission has been created')
      )
    }).catch(({response}) => {
      console.error('permission/store:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },

  // edit role
  edit(vuexContext, payload) {
    return this.$axios.$get('/permission/' + payload.id + '/edit', {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then(response => {
      vuexContext.commit('setPermissionData', response.permission)
    }).catch(({response}) => {
      console.error('permission/edit:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },

  // update role
  update(vuexContext, payload) {
    return this.$axios.$put('/permission/' + payload.id + '/update', payload, {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then(() => {
      this.$router.replace('/setting/permission-management').then(() => {
        this.toast('success', 'Success', 'permission has been updated')
      })
    }).catch(({response}) => {
      console.error('permission/update:', response)
    })
  },
}

export const mutations = {
  setPermissionList(state, payload) {
    state.permissionList = payload.permissionList
  },

  setPermissionData(state, payload){
    state.permissionToEdit = payload
  }
}

export const getters = {
  getPermissionList(state) {
    return state.permissionList
  },

  getPermissionToEdit(state) {
    return state.permissionToEdit
  },
}
