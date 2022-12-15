<script>
export default {
  name: "ViewPermissionsModal",
  props: ["value", "permissions"],

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
      <div class="modal-dialog modal-xl">
        <div class="modal-content bg-sky-50">

          <!-- BEGIN: Modal Header -->
          <slot name="header">
            <div class="modal-header">
              <fa icon="fas fa-circle-xmark" class="w-5 h-5 text-primary cursor-pointer" @click="close"/>
            </div>
          </slot>
          <!-- END: Modal Header -->

          <!-- BEGIN: Modal Body -->
          <slot name="body">
            <div class="modal-body">
              <div v-if="permissions.length>0" class="grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-3">
                <div v-for="permission in permissions" :key="permission.id">
                  <span class="btn btn-outline-primary py-1 px-2">{{ permission.name }}</span>
                </div>
              </div>
              <div v-else>
                <span class="font-semibold">No Permission Assign</span>
              </div>
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

