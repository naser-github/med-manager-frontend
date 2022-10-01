export const state = () => ({
  dailyDoseList: []
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

  // fetch dashboard data
  fetchDashboardData(vuexContext, payload) {
    return this.$axios
      .$get('/dashboard', {
        headers: {
          Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
        },
      }).then((response) => vuexContext.commit('setDailyDoseList', {dailyDoseList: response.dailyDoseList}))
      .catch(function (response) {
        console.error('dashboard/fetchDashboardData:', response)
        this.toast('danger', 'Error', 'something went wrong!!')
      })
  },


}

export const mutations = {
  setDailyDoseList(state, payload) {
    state.dailyDoseList = payload.dailyDoseList
  }
}
