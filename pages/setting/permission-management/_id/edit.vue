<template>
  <LazyLoader v-if="lazyLoader"/>
  <form v-else @submit.prevent="onUpdate">
    <div class="-intro-y box rounded-lg my-8 lg:m-24 p-4 ">
      <div class="lg:px-8 lg:py-4">
        <div
          class="font-medium text-base flex items-center pb-5">
          Edit Permission
        </div>

        <div class="my-3">
          <label for="name" class="form-label ">Name</label>
          <input id="name" type="text" v-model="permissionData.name" class="form-control shadow shadow-gray-400" placeholder="name" required>
        </div>

        <button type="submit" class="btn btn-primary mt-5 text-white">Update</button>
      </div>
    </div>
  </form>
</template>

<script>
// BEGIN::base components
import LazyLoader from "@/components/base/components/LazyLoader"
// END::base-component

export default {
  name: 'EditPermission',
  middleware: 'isAuthorized',
  components: {LazyLoader},

  data() {
    return {
      lazyLoader: true,
      permissionData: {},
      permissionId: this.$route.params,
    }
  },

  created() {
    this.fetchPermissionData().then(() => this.lazyLoader = false)
  },

  computed: {
    // get role list
    getPermissionData() {
      return JSON.parse(JSON.stringify(this.$store.getters["setting /permission/getPermissionToEdit"]))
    },
  },

  methods: {
    // Begin::general functions
    toast(type, title, msg) {
      this.$toast.show({
        type: type,
        title: title,
        message: msg,
      })
    },
    // END::general functions

    async fetchPermissionData() {
      await this.$store.dispatch('setting /permission/edit', this.permissionId).then(() => {
        this.permissionData = {...this.getPermissionData}
      })
    },

    onUpdate() {
      this.$store.dispatch('setting /permission/update', this.permissionData)
    },
  }
}
</script>






