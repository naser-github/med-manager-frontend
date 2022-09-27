<script>
export default {
  name: "EditMedicineModal",
  props: ["prescription", "value"],

  data() {
    return {
      formData: {}
    };
  },

  watch: {
    prescription() {
      this.formData = {...this.$props.prescription}
    }
  },

  methods: {
    // common toast body
    toast(type, title, msg) {
      this.$toast.show({
        type: type,
        title: title,
        message: msg,
      })
    },

    //close the modal
    close() {
      this.$emit("close");
    },

    //update & close the modal
    closeAfterUpdate() {
      this.$emit("update-list");
      this.$emit("close");
    },

    onUpdate() {
      this.$store.dispatch('prescription/updatePrescriptionData', {
        formData: this.formData
      }).then(() => this.closeAfterUpdate())
        .catch(() => this.toast('danger', 'Error', 'something went wrong!!'))
    },
  },
};
</script>

<template>
  <transition name="modal-fade">
    <div id="static-backdrop-modal-preview" class="modal overflow-y-auto show" data-tw-backdrop="static" tabindex="-1"
         aria-hidden="true" v-show="value">
      <div class="modal-dialog">
        <div class="modal-content bg-sky-50 ">

          <!-- BEGIN: Modal Header -->
          <slot name="header">
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">Edit Medicine Details</h2>
              <fa icon="fas fa-circle-xmark" class="w-5 h-5 text-primary" @click="close"/>
            </div>
          </slot>
          <!-- END: Modal Header -->

          <!-- BEGIN: Modal Body -->
          <form @submit.prevent="onUpdate">
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <slot name="body">
                <!--medicine name-->
                <div class="col-span-12" v-if="formData.medicine">
                  <label for="name" class="form-label">Name</label>
                  <input v-model="formData.medicine.name" id="name" type="text"
                         class="form-control">
                </div>

                <!--expiry time-->
                <div class="col-span-12 sm:col-span-6">
                  <label for="timePeriod" class="form-label">Days To Continue</label>
                  <input v-model="formData.time_period" id="timePeriod" type="text" class="form-control border-success">
                </div>

                <!--status-->
                <div class="col-span-12 sm:col-span-6">
                  <label for="status" class="form-label">Status</label>
                  <select v-model="formData.status" id="status" class="form-select border-success">
                    <option value="active">Active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </div>

                <div class="col-span-12">
                  <span class="text-lg">Dosage Time</span>
                </div>

                <div class="col-span-12">
                  <table class="table">
                    <tbody>
                    <tr v-for="(dose, index) in formData.dose" :key="index">
                      <td>
                        <input v-model="formData.dose[index].label" id="timePeriod" type="text"
                               class="form-control col-span-4">
                      </td>
                      <td>
                        <input v-model="formData.dose[index].time" id="timePeriod" type="time"
                               class="form-control col-span-4">
                      </td>
                      <td>
                        <select v-model="formData.dose[index].status" id="status" class="form-select col-span-4">
                          <option value="active">Active</option>
                          <option value="inactive">inactive</option>
                        </select>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </slot>
            </div>
            <!-- END: Modal Body -->

            <!-- BEGIN: Modal Footer -->
            <div class="modal-footer ">
              <button type="button" class="btn btn-pending  w-20 mr-1" @click="close">Cancel</button>
              <button type="submit" class="btn btn-primary w-20 text-white" @click="closeAfterUpdate">Update</button>
            </div>
          </form>
          <!-- END: Modal Footer -->
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>

.modal {
  background: #000000a6;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  margin-top: 0;
  margin-left: 0;

  overflow-x: hidden;
  overflow-y: auto;
  z-index: 10000;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
