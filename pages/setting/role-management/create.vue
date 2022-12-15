<template>
  <!--lazy loader activates while fetching data from backend-->
  <LazyLoader v-if="loading"/>
  <form v-else @submit.prevent="onSubmit">
    <div class="-intro-y box rounded-lg my-8 m-0 lg:m-4 p-4 ">
      <div class="px-8 py-4">
        <div
          class="font-medium text-base flex items-center pb-5">
          Create Role
        </div>

        <div class="my-3">
          <label for="name" class="form-label ">Name</label>
          <input id="name" type="text" v-model="name" class="form-control shadow shadow-gray-400" placeholder="name"
                 required>
        </div>

        <div class="mt-5">
          <label>Assign Permissions</label>
          <div class="intro-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2">
            <div v-for="permission in permissions" :key="permission.id" class="form-check my-2 mr-2">
              <input :id="`permission_${permission.id}`" class="form-check-input shadow shadow-gray-400" type="checkbox"
                     :value=permission.id v-model="selectedPermission">
              <label class="form-check-label" :for="`permission_${permission.id}`">
                <span class="break-all">{{ permission.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary mt-5 text-white">Create</button>
      </div>
    </div>
  </form>
</template>

<script>
// BEGIN::base components
import LazyLoader from "@/components/base/components/LazyLoader"
// END::base-component

export default {
  name: 'CreateRole',
  middleware: 'isAuthorized',
  components: {LazyLoader},

  data() {
    return {
      loading: true, // disable when fetching data is complete

      name: null,
      permissions: [], // variable that holds permission list data
      selectedPermission: [], // array that holds all the permission
    }
  },

  created() {
    this.fetchPermissionList().then(() => this.loading = false)
  },

  computed: {
    // get user list
    getPermissionList() {
      return JSON.parse(JSON.stringify(this.$store.getters["setting /permission/getPermissionList"]))
    },
  },

  methods: {

    // BEGIN::general functions
    toast(type, title, msg) {
      this.$toast.show({
        type: type,
        title: title,
        message: msg,
      })
    },
    // END::general functions

    // call fetchPermissionList (user.js) to get the user list from DB
    async fetchPermissionList() {
      await this.$store.dispatch('setting /permission/fetchPermissionList').then(() => {
        this.permissions.splice(0, this.permissions.length, ...this.getPermissionList);
      })
    },

    async onSubmit() {
      await this.$store.dispatch('setting /role/store', {
        name: this.name,
        permissions: this.selectedPermission
      })
    },
  }
}
</script>
