<template>
  <section>
    <form @submit.prevent="onSubmit">
      <div class="intro-y box my-5 p-4">

        <div v-for="(row,index) in counter" :key="index">
          <div class="grid grid-cols-12 gap-2 my-3">
            <div class="col-span-1 flex items-stretch">
              <span class="mx-0 lg:mx-auto px-1 lg:px-4 py-2 self-center btn box border-primary text-xs md:text-md">{{
                  index + 1
                }}</span>
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

        <!--increase medicine slot-->
        <div class="intro-x mt-5 xl:mt-8 text-right">
          <div class="btn px-2 box border-primary " @click="increaseRow">
            <span class="w-5 h-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="#084f3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   icon-name="plus" class="lucide lucide-plus w-4 h-4" data-lucide="plus">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </span>
          </div>
        </div>

        <div class="intro-x mt-5 xl:mt-8 text-center lg:text-left">
          <button class="btn btn-primary py-3 px-4 w-11/12 lg:w-32 lg:mr-3 align-top zoom-in">Save</button>
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
        this.toast('danger', 'Error', 'maximum limit is 24 & minimum 1')
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


