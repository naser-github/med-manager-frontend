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
  AddPrescription(vuexContext, payload) {
    console.log(payload.formData)
    return this.$axios
      .$post('/add-prescription', {
        formData: payload.formData
      }, {
        headers: {
          Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
          'Content-Type': 'multipart/form-data',
          'Content-type': 'application/json',
        },
      })
      .catch(function (err) {
        console.error('prescription/AddPrescription:', err)

        this.toast('danger', 'Error', 'something went wrong!!')
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
        console.error('prescription/fetchPrescriptionList:', err)

        this.toast('danger', 'Error', 'something went wrong!!')
      })
  },

  // updateMedicine
  updatePrescription(vuexContext, payload) {
    return this.$axios
      .$put('/update-prescription', {
        formData: payload.formData
      }, {
        headers: {
          Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
          'Content-Type': 'multipart/form-data',
          'Content-type': 'application/json',
        },
      })
      .catch(function (err) {
        console.error('prescription/updatePrescription:', err)

        this.toast('danger', 'Error', 'something went wrong!!')
      })
  }

}

export const mutations = {
  setPrescriptionList(state, payload) {
    state.presentationList = payload.prescriptionList
  }
}
