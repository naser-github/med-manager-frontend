export const state = () => ({
  profileData: []
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

  // shows profile data
  fetchProfileData(vuexContext) {
    return this.$axios
      .$get('/profile', {
        headers: {
          Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`
        },
      }).then((response) => vuexContext.commit('setProfileData', {userDetail: response.userDetail}))
      .catch(function (err) {
        console.error('profile/fetchProfileData:', err)
        this.toast('danger', 'Error', 'something went wrong!!')
      })
  },

  // update profile
  updateProfile(vuexContext, payload) {
    return this.$axios.$put('/profile/update', payload, {
      headers: {
        Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
      },
    }).catch(function (response) {
      console.error('profile/updateProfile:', response)

      this.toast('danger', 'Error', 'something went wrong!!')
    })
  },

  // update password
  updatePassword(vuexContext, payload) {
    return this.$axios.$put('/profile/update', payload, {
      headers: {
        Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
      },
    }).catch(function (response) {
      console.error('profile/updatePassword:', response)

      this.toast('danger', 'Error', 'something went wrong!!')
    })
  },
}

export const mutations = {
  setProfileData(state, payload) {
    state.profileData = payload.userDetail
  }
}
