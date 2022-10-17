export const state = () => ({
  dosageDetails: [],
  prescribedMedicineDetail: [],
  prescriptionList: [],
})

export const actions = {
  // add medicine in their prescription list
  AddPrescription(vuexContext, payload) {
    return this.$axios.$post('/prescription/add', {
      formData: payload.formData
    }, {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).catch(({response}) => {
      console.error('prescription/AddPrescription:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },

  //dosage details
  fetchDosageDetails(vuexContext, payload) {
    return this.$axios.$get('prescription/' + payload + '/dosage', {
      headers: {
        Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
      },
    }).then(response => {
      vuexContext.commit('setDosageDetails', {dosageDetails: response.dosageDetails})
    }).catch(({response}) => {
      console.error('prescription/fetchDosageDetails:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },

  fetchPrescribedMedicineDetail(vuexContext, payload) {
    return this.$axios.$get('/prescription/edit/' + payload.medicineId, {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then(response => {
      vuexContext.commit('setPrescribedMedicineDetail', {prescribedMedicineDetail: response.prescribedMedicine})
    }).catch(({response}) => {
      console.error('prescription/fetchPrescribedMedicineDetail:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },

  // fetch prescription list
  fetchPrescriptionList(vuexContext, payload) {
    return this.$axios.$get('/prescription/list', {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).then(response => {
      vuexContext.commit('setPrescriptionList', {
        prescriptionList: response.prescriptionList
      })
    }).catch(({response}) => {
      console.error('prescription/fetchPrescriptionList:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },

  // updateMedicine
  updatePrescriptionData(vuexContext, payload) {
    return this.$axios.$put('/prescription/update', payload, {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).catch(({response}) => {
      console.error('prescription/updatePrescription:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
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
