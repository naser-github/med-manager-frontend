export const state = () => ({
  presentationList: []
})

export const actions = {

  // add medicine in their prescription list
  AddPrescription(vuexContext, payload) {
    return this.$axios
      .$post('/add-medicine', {
        formData: payload.formData
      }, {
        headers: {
          Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
          'Content-Type': 'multipart/form-data',
          'Content-type': 'application/json',
        },
      })
      .catch(function (err) {
        console.warn('prescription/AddPrescription:', err)

        this.$toast.show({
          type: 'danger',
          title: 'Error',
          message: 'something went wrong!!',
        })
      })
  },

  // fetch prescription list
  fetchPrescriptionList(vuexContext, payload) {
    return this.$axios
      .$get('/prescription-list', {
        headers: {
          Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
        },
      }).then((response) => {
        vuexContext.commit('setPrescriptionList', {
          prescriptionList: response.list
        })
      })
      .catch(function (err) {
        console.warn('prescription/fetchPrescriptionList:', err.response)

        this.$toast.show({
          type: 'danger',
          title: 'Error',
          message: 'something went wrong!!',
        })
      })
  }

}

export const mutations = {
  setPrescriptionList(state, payload) {
    state.presentationList = payload.prescriptionList
  }
}
