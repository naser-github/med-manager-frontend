<template>
  <section>
    <form @submit.prevent="onSubmit">
      <div class="intro-x box rounded-lg my-5 p-2 md:p-5 ">
        <div class="border border-slate-200/60 rounded-md p-2 md:p-5">
          <div
            class="font-medium text-base flex items-center pb-5">
            Prescription form
          </div>

          <div v-for="(row,index) in counter" :key="index">
            <div class="border border-slate-200/60 rounded-md my-2 p-2">
              <div class="grid grid-cols-12 gap-2 my-3">

                <div class="col-span-1 flex items-center">
                  <span class="mx-0 lg:mx-auto px-1 lg:px-4 py-2 self-center btn box border-primary text-xs md:text-md">
                    {{ index + 1 }}
                  </span>
                </div>

                <div class="col-span-4">
                  <input type="text" v-model="formData[index].medicineName" @input="suggestMedicine(index)"
                         class="form-control " placeholder="Medicine name" required>
                  <div v-if="formData[index].suggestedMedicines.length>0"
                       class=" flex items-center pt-3 mt-3 font-medium">
                    <span v-for="medicine in formData[index].suggestedMedicines" :key="medicine.id">
                        <span class="btn btn-sm btn-outline-secondary mx-1"
                              @click="setSuggestedMedicine(index,medicine.name)">
                          {{ medicine.name }}
                        </span>
                    </span>
                  </div>
                </div>

                <div class="col-span-4">
                  <input type="number" v-model.number="formData[index].doseFrequency" @input="setDose(index)"
                         class="form-control" placeholder="Dose Frequency" required>
                </div>

                <div class="col-span-3">
                  <input type="number" v-model.number="formData[index].timePeriod" @input="checkDays(index)"
                         class="form-control" placeholder="Days to continue" required>
                </div>
              </div>

              <div v-for="(dose, doseIndex) in formData[index].doseDetails" :key="doseIndex">
                <div class="grid grid-cols-12 gap-2 my-2">
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
          </div>
          <!--increase medicine slot-->
          <div class="-intro-x mt-5 xl:mt-8 text-right">
            <fa :icon="['fas','fa-square-plus']" class="text-primary text-4xl" @click="increaseRow"/>
          </div>

          <div class="flex flex-col-reverse sm:flex-row">

            <div class="text-center sm:text-right sm:ml-auto">
              <div class="-intro-x mt-5 xl:mt-8 text-center lg:text-left">
                <div class="py-3 lg:mr-3 align-top">
                  <button class="btn btn-lg btn-primary w-11/12 lg:w-32 zoom-in">Save</button>
                </div>
              </div>
            </div>
          </div>
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
          doseDetails: [],
          suggestedMedicines: [],
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
        doseDetails: [],
        suggestedMedicines: [],
      })
      this.counter += 1
    },

    checkDays(index) {
      if (this.formData[index].timePeriod < 0) this.formData[index].timePeriod = null
    },

    setDose(index) {
      this.formData[index].doseDetails = [];

      const doseFrequency = this.formData[index].doseFrequency;
      if (doseFrequency < 1 || doseFrequency > 24) {
        this.toast(
          'danger',
          'Error',
          doseFrequency < 1 ? 'minimum dose frequency limit is 1' : 'maximum dose frequency limit 24'
        )
        this.formData[index].doseFrequency = null;
        return
      }

      for (let i = 0; i < doseFrequency; i++) {
        this.formData[index].doseDetails.push({
          label: '',
          time: null
        })
      }
    },

    suggestMedicine(index) {
      if (this.formData[index].medicineName) {
        this.$store
          .dispatch('medicine/suggestMedicine', {
            name: this.formData[index].medicineName
          }).then((response) => {
          this.formData[index].suggestedMedicines = response.result
        }).catch(() => {
          this.toast('danger', 'Error', 'something went wrong!!')
        })
      } else {
        this.formData[index].suggestedMedicines = [];
      }
    },

    setSuggestedMedicine(index, name) {
      this.formData[index].medicineName = name;
      this.formData[index].suggestedMedicines = [];
    },

    onSubmit() {
      this.$store
        .dispatch('prescription/AddPrescription', {
          formData: this.formData
        })
        .then((response) => {
          console.log(response);
          if (response.prescriptionNotSaved.length > 0) {
            const message = response.prescriptionNotSaved + ` already exist in your running prescription but rest are added`;
            this.toast('danger', 'Error', message)
          } else {
            this.toast('success', 'Success', 'medicines has been added to prescription successfully')
            this.$router.replace('/')
          }
        })
        .catch(() => {
          this.toast('danger', 'Error', 'something went wrong!!')
        })
    }
  }
}
</script>


