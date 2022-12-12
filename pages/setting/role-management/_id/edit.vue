<template>
  <LazyLoader v-if="lazyLoader"/>
  <form v-else @submit.prevent="onUpdate">
    <div class="-intro-y box rounded-lg my-8 lg:m-24 p-4 ">
      <div class="lg:px-8 lg:py-4">
        <div
          class="font-medium text-base flex items-center pb-5">
          Edit Role
        </div>

        <div class="my-3">
          <label for="name" class="form-label ">Name</label>
          <input id="name" type="text" v-model="roleData.name" class="form-control" placeholder="name" required>
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
  name: 'EditUser',
  middleware: 'isAuthorized',
  components: {LazyLoader},

  data() {
    return {
      lazyLoader: true,
      roleData: {},
      roleId: this.$route.params,
    }
  },

  created() {
    this.fetchRoleData().then(() => this.lazyLoader = false)
  },

  computed: {
    // get role list
    getRoleData() {
      return JSON.parse(JSON.stringify(this.$store.getters["setting /role/getRoleToEdit"]))
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

    async fetchRoleData() {
      await this.$store.dispatch('setting /role/edit', this.roleId).then(() => {
        this.roleData = {...this.getRoleData}
      })
    },

    onUpdate() {
      this.$store.dispatch('setting /role/update', this.roleData)
    },
  }
}
</script>






