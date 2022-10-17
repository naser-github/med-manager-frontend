export const state = () => ({
  userData: {},
  userList: [],
})

export const actions = {
  // fetch user list
  fetchUserList(vuexContext) {
    return this.$axios
      .$get('/user/index', {
        headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
      }).then((response) => vuexContext.commit('setUserList', {userList: response.userList}))
      .catch(({response}) => {
        console.error('Setting/User/fetchUserList:', response.data)
        this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
      })
  },

  edit(vuexContext, payload) {
    return this.$axios.$get('/user/' + payload.id + '/edit', {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then(response => {

      vuexContext.commit('setUserData', {userData: response.userData})
      vuexContext.commit('setting /role/setRoleList', {roleList: response.roleList}, {root: true})

    }).catch(({response}) => {
      console.error('user/editUser:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },

  store(vuexContext, payload) {
    return this.$axios.$post('/user/store', payload, {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then(() => {
      this.$router.replace('/setting/user-management').then(() =>
        this.toast('success', 'Success', 'user has been created')
      )
    }).catch(({response}) => {
      console.error('user/storeUser:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },

  update(vuexContext, payload) {
    console.log(payload.formData)
    return this.$axios.$put('/user/' + payload.userId + '/update', payload.formData, {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then(() => {
      this.$router.replace('/setting/user-management').then(() => {
        this.toast('success', 'Success', 'user has been updated')
      })
    }).catch(({response}) => {
      console.error('user/storeUser:', response)
    })
  },
}

export const mutations = {
  setUserData(state, payload) {
    state.userData = payload.userData;
  },

  setUserList(state, payload) {
    state.userList = payload.userList;
  },
}

export const getters = {
  getUserData(state) {
    return state.userData;
  },

  getUserList(state) {
    return state.userList;
  },
}
