export const state = () => ({
  dosageDetails: [],
  prescribedMedicineDetail: [],
  prescriptionList: [],
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
    return this.$axios
      .$post('/prescription/add', {
        formData: payload.formData
      }, {
        headers: {
          Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
          'Content-Type': 'multipart/form-data',
          'Content-type': 'application/json',
        },
      })
      .catch(function (response) {
        console.error('prescription/AddPrescription:', response)

        this.toast('danger', 'Error', 'something went wrong!!')
      })
  },

  //dosage details
  fetchDosageDetails(vuexContext, payload) {
    return this.$axios
      .$get('prescription/' + payload + '/dosage', {
        headers: {
          Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
        },
      }).then((response) => vuexContext.commit('setDosageDetails', {dosageDetails: response.dosageDetails}))
      .catch(function (response) {
        console.error('prescription/fetchDosageDetails:', response)
        this.toast('danger', 'Error', 'something went wrong!!')
      })
  },

  fetchPrescribedMedicineDetail(vuexContext, payload) {
    return this.$axios
      .$get('/prescription/edit/' + payload.medicineId, {
        headers: {
          Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`
        },
      }).then((response) => {
        vuexContext.commit('setPrescribedMedicineDetail', {prescribedMedicineDetail: response.prescribedMedicine})
      }).catch(function (response) {
        console.error('prescription/fetchPrescribedMedicineDetail:', response)

        this.toast('danger', 'Error', 'something went wrong!!')
      })
  },

  // fetch prescription list
  fetchPrescriptionList(vuexContext, payload) {
    return this.$axios
      .$get('/prescription/list', {
        headers: {
          Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
        },
      }).then((response) => {
        vuexContext.commit('setPrescriptionList', {
          prescriptionList: response.prescriptionList
        })
      })
      .catch(function (response) {
        console.error('prescription/fetchPrescriptionList:', response)
        this.toast('danger', 'Error', 'something went wrong!!')
      })
  },

  // updateMedicine
  updatePrescriptionData(vuexContext, payload) {
    return this.$axios.$put('/prescription/update', payload, {
      headers: {
        Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
      },
    }).catch(function (response) {
      console.error('prescription/updatePrescription:', response)

      this.toast('danger', 'Error', 'something went wrong!!')
    })
  },

}

export const mutations = {
  setPrescriptionList(state, payload) {
    state.prescriptionList = payload.prescriptionList
  },

  setDosageDetails(state, payload) {
    state.dosageDetails = payload.dosageDetails
  },

  setPrescribedMedicineDetail(state, payload) {
    state.prescribedMedicineDetail = payload.prescribedMedicineDetail
  },
}

export const getters = {
  getPrescriptionList(state) {
    return state.prescriptionList
  },
}
