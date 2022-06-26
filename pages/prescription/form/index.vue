<template>
  <section>
    <form @submit.prevent="onSubmit">
      <div class="intro-y box my-5 p-4">
        <div v-for="(row,index) in counter" :key="index">
          <div class="grid grid-cols-12 gap-2 my-3">
            <div class="col-span-1  mt-3 text-center">
              <span class="text-xs md:text-md px-1 md:px-5 py-2 bg-primary text-white rounded">{{ index + 1 }}</span>
            </div>
            <input type="text" v-model="formData[index].medicineName" class="form-control col-span-4"
                   placeholder="Medicine name" aria-label="default input inline 1" required>
            <input type="number" v-model="formData[index].doseFrequency" @change="setDose(index)"
                   class="form-control col-span-4" placeholder="Dose Frequency" aria-label="default input inline 2"
                   required>
            <input type="number" v-model="formData[index].timePeriod" class="form-control col-span-3"
                   placeholder="Days to continue" aria-label="default input inline 3" required>
          </div>

          <div v-for="(dose, doseIndex) in formData[index].doseDetails" :key="doseIndex">
            <div class="grid grid-cols-12 gap-2 my-3">
              <div class="col-span-2 lg:col-span-6"></div>
              <input type="text" v-model="formData[index].doseDetails[doseIndex].label"
                     class="form-control col-span-5 lg:col-span-3" placeholder="label"
                     aria-label="default input inline 1" required>
              <input type="time" v-model="formData[index].doseDetails[doseIndex].time"
                     class="form-control col-span-5 lg:col-span-3" placeholder="time"
                     aria-label="default input inline 2" required>
            </div>
          </div>

        </div>

        <div class="intro-x mt-5 xl:mt-8 text-right">
          <span class="btn btn-outline-primary py-1 px-2 w-12 lg:mr-3 align-top text-2xl" @click="increaseRow">
            +
          </span>
        </div>

        <div class="intro-x mt-5 xl:mt-8 text-center lg:text-left">
          <button class="btn btn-primary py-3 px-4 w-full lg:w-32 lg:mr-3 align-top">Save</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'PrescriptionPage',
  middleware: 'isAuthorized',
  data() {
    return {
      counter: 1,

      formData: [
        {
          medicineName: '',
          timePeriod: null,
          doseFrequency: null,
          doseDetails: []
        }
      ],
    }
  },
  methods: {

    toast(type, title, msg) {
      this.$toast.show({
        type: type,
        title: title,
        message: msg,
      })
    },

    increaseRow() {
      this.formData.push({
        medicineName: '',
        doseFrequency: null,
        timePeriod: null,
        doseDetails: []
      })
      this.counter += 1
    },

    setDose(index) {
      if (this.formData[index].doseFrequency < 1 || this.formData[index].doseFrequency > 24) {
        this.$toast.show({
          type: 'danger',
          title: 'Error',
          message: 'maximum limit is 24 & minimum 1',
        })
        this.formData[index].doseFrequency = null
        return
      }
      this.formData[index].doseDetails = [];
      for (let i = 0; i < this.formData[index].doseFrequency; i++) {
        this.formData[index].doseDetails.push({
          label: '',
          time: null
        })
      }
    },

    onSubmit() {
      this.$store
        .dispatch('prescription/AddPrescription', {
          formData: this.formData
        })
        .then((response) => {
          if (response.prescriptionNotSaved.length > 0) {
            const msg = response.prescriptionNotSaved + ` already exist in your running prescription`;
            this.toast('danger', 'Error', msg)
          } else {
            if (response.msg === 'medicines has been added') {
              this.toast('success', 'Success', 'medicines has been added')
              this.$router.replace('/')
            }
          }
        })
        .catch(() => {
          this.toast('danger', 'Error', 'something went wrong!!')
        })

    }
  }
}
</script>


