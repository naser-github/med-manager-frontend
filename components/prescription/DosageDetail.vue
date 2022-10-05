<script>
export default {
  name: "ViewDosageModal",
  props: ["value", "dosageDetails"],

  data() {
    return {
      dosageData: [],
    };
  },

  watch: {
    dosageDetails() {
      this.dosageData = this.$props.dosageDetails // assigning props value to formData
    }
  },

  methods: {
    //close the modal
    close() {
      this.$emit("close");
    },
  },
};
</script>

<template>
  <transition name="modal-fade">
    <div id="static-backdrop-modal-preview" class="modal overflow-y-auto show" data-tw-backdrop="static" tabindex="-1"
         aria-hidden="true" v-show="value">
      <!--    <div class="modal overflow-y-auto show" v-show="value">-->
      <div class="modal-dialog">
        <div class="modal-content bg-sky-50">

          <!-- BEGIN: Modal Header -->
          <slot name="header">
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                Medicine Name :
                {{ dosageData ? dosageData[0] ? dosageData[0].name ? dosageData[0].name : 'N/A' : 'N/A' : 'N/A' }}
              </h2>
              <fa icon="fas fa-circle-xmark" class="w-5 h-5 text-primary cursor-pointer" @click="close"/>
            </div>
          </slot>
          <!-- END: Modal Header -->

          <!-- BEGIN: Modal Body -->
          <slot name="body">
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <table class="table table-report table-bordered table-hover">
                <thead>
                <tr class="whitespace-nowrap bg-gray-600 text-white">
                  <th>#</th>
                  <th>Label</th>
                  <th>Time</th>
                  <th>Expired At</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(dose,index) in dosageData" :key=dose.id>
                  <td>{{ index + 1 }}</td>
                  <td>{{ dose.label }}</td>
                  <td>{{ dose.time }}</td>
                  <td>{{ dose.time_period }}</td>
                  <td>
                    <fa v-if="dose.status==='active'" :icon="['fas','fa-circle-check']" class="text-success text-xl"/>
                    <fa v-else :icon="['fas','fa-circle-xmark']" class="text-danger text-xl"/>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </slot>
          <!-- END: Modal Body -->
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

/*.modal-fade-enter-from,*/
/*.modal-fade-leave-to {*/
/*  opacity: 0;*/
/*}*/

/*.modal-fade-enter-active,*/
/*.modal-fade-leave-active {*/
/*  transition: opacity 0.5s ease;*/
/*}*/
</style>

