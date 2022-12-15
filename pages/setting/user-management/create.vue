<template>
  <LazyLoader v-if="lazyLoader"/>
  <form v-else @submit.prevent="onSubmit">
    <div class="-intro-y box rounded-lg my-8 m-24 p-4 ">
      <div class="px-8 py-4">
        <div
          class="font-medium text-base flex items-center pb-5">
          Create User
        </div>

        <div class="my-3">
          <label for="name" class="form-label ">Name</label>
          <input id="name" type="text" v-model="formData.name" class="form-control shadow shadow-gray-400" placeholder="name" required>
        </div>
        <div class="my-3">
          <label for="email" class="form-label">Email</label>
          <input id="email" type="email" v-model="formData.email" class="form-control shadow shadow-gray-400" placeholder="email" required>
        </div>
        <div class="my-3">
          <label for="phone" class="form-label">Phone</label>
          <input id="phone" type="text" v-model="formData.phone" class="form-control shadow shadow-gray-400" placeholder="phone number">
        </div>

        <div class="my-3">
          <label for="role" class="form-label">Role</label>
          <select id="role" v-model="formData.role" class="form-select form-select-sm mt-2"
                  aria-label=".form-select-sm example">
            <option disabled :value=null>Select Role</option>
            <option v-for="role in roleList" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
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
  name: 'CreateUser',
  middleware: 'isAuthorized',
  components: {LazyLoader},

  data() {
    return {
      lazyLoader: true,
      formData: {
        name: null,
        email: null,
        phone: null,
        role: null
      },
      roleList: [],
    }
  },

  created() {
    this.fetchRoleList().then(() => this.lazyLoader = false)
  },

  computed: {
    // get role list
    getRoleList() {
      return JSON.parse(JSON.stringify(this.$store.getters["setting /role/getRoleList"]))
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

    async fetchRoleList() {
      await this.$store.dispatch('setting /role/fetchRoleList').then(() => {
        this.roleList.splice(0, this.roleList.length, ...this.getRoleList);
      })
    },

    async onSubmit() {
      await this.$store.dispatch('setting /user/store', {formData: this.formData})
    },
  }
}
</script>
