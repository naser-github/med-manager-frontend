export const state = () => ({
  presentationList: []
})

export const actions = {
  // add medicine in their prescription list
  suggestMedicine(vuexContext, payload) {
    return this.$axios.$get('/medicine/search/' + payload.name, {
      headers: {Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`},
    }).catch(({response}) => {
      console.error('medicine/suggestMedicine:', response.data)
      this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
    })
  },

  importMedicine(vuexContext, payload) {
    return this.$axios.$post('/import/medicine-data', payload, {
      headers: {
        Authorization: `Bearer ${vuexContext.rootState.auth.authToken}`,
        'Content-Type': 'multipart/form-data',
        'Content-type': 'application/json',
      },
    }).then(() => {
      console.log('file uploaded')
    })
      .catch(({response}) => {
        console.error('medicine/importMedicine:', response.data)
        this.$toast.show({type: 'danger', title: 'Error', message: response.data.message})
      })
  }
}

export const mutations = {
  setPrescriptionList(state, payload) {
    state.presentationList = payload.prescriptionList
  }
}
