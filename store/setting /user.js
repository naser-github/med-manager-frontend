export const state = () => ({
  userList: []
})

export const actions = {

  // common toast body
  toast(type, title, msg) {
    this.$toast.show({
      type: type,
      title: title,
      message: msg,
    })
  },

  // fetch user list
  fetchUserList(vuexContext) {
    return this.$axios
      .$get('/user/index', {
        headers: {
          Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
        },
      }).then((response) => vuexContext.commit('setUserList', {userList: response.userList}))
      .catch(function (response) {
        console.error('Setting/User/fetchUserList:', response)
        this.toast('danger', 'Error', 'something went wrong!!')
      })
  },

  createUser(vuexContext, payload) {
    return this.$axios.$post('/user/create', {
      formData: payload.formData
    }, {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).catch(function (response) {
      console.error('user/createUser:', response)
      this.toast('danger', 'Error', 'something went wrong!!')
    })
  }
}

export const mutations = {
  setUserList(state, payload) {
    state.userList = payload.userList
  }
}

export const getters = {
  getUserList(state) {
    return state.userList
  },
}
