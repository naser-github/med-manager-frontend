export const state = () => ({

})

export const actions = {

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
        console.log('log error:', err)

        this.$toast.show({
          type: 'danger',
          title: 'Error',
          message: 'something went wrong!!',
        })
      })
  }

}

export const mutations = {}

export const getters = {

}
