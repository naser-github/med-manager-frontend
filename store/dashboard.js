export const state = () => ({
  dailyDoseList: []
})

export const actions = {
  // fetch dashboard data
  fetchDashboardData(vuexContext, payload) {
    return this.$axios.$get('/dashboard', {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then(response => {
      vuexContext.commit('setDailyDoseList', {dailyDoseList: response.dailyDoseList})
    }).catch(({response}) => {
      console.error('dashboard/fetchDashboardData:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },


}

export const mutations = {
  setDailyDoseList(state, payload) {
    state.dailyDoseList = payload.dailyDoseList
  }
}
