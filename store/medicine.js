export const state = () => ({
  presentationList: []
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

  // add medicine in their prescription list
  suggestMedicine(vuexContext, payload) {
    return this.$axios
      .$get('/medicine/search/' + payload.name, {
        headers: {
          Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`
        },
      })
      .catch(function (err) {
        console.error('medicine/suggestMedicine:', err)

        this.toast('danger', 'Error', 'something went wrong!!')
      })
  },


}

export const mutations = {
  setPrescriptionList(state, payload) {
    state.presentationList = payload.prescriptionList
  }
}
