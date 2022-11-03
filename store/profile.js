export const state = () => ({
  profileData: []
})

export const actions = {
  // shows profile data
  fetchProfileData(vuexContext) {
    return this.$axios.$get('/profile', {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then((response) => {
      vuexContext.commit('setProfileData', {userDetail: response.userDetail})
    }).catch(({response}) => {
      console.error('profile/fetchProfileData:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },

  // update profile
  updateProfile(vuexContext, payload) {
    return this.$axios.$put('/profile/update-profile', payload.profileData, {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then((response) => {
      if (response.success) {
        this.$toast.show({
          type: 'success',
          title: 'Success',
          message: 'profile has been updated',
        })
      }
    })
      .catch(({response}) => {
        console.error('profile/updateProfile:', response.data)
        this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
      })
  },

  // update password
  updatePassword(vuexContext, payload) {
    return this.$axios.$put('/profile/update-password', payload, {
      headers: {
        Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
      },
    }).then((response) => {
      if (response.success) {
        this.$toast.show({
          type: 'success',
          title: 'Success',
          message: 'password has been updated',
        })
      }
    }).catch(({response}) => {
      console.error('profile/updatePassword:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },
}

export const mutations = {
  setProfileData(state, payload) {
    state.profileData = payload.userDetail
  }
}
