<template>
  <LazyLoader v-if="lazyLoader"/>
  <form v-else @submit.prevent="onUpdate">
    <div class="-intro-y box rounded-lg my-8 lg:m-24 p-4 ">
      <div class="lg:px-8 lg:py-4">
        <div
          class="font-medium text-base flex items-center pb-5">
          Edit User
        </div>

        <div class="my-3">
          <label for="name" class="form-label ">Name</label>
          <input id="name" type="text" v-model="userData.name" class="form-control" placeholder="name" required>
        </div>

        <div class="my-3">
          <label for="email" class="form-label">Email</label>
          <input id="email" type="email" v-model="userData.email" class="form-control" placeholder="email" required>
        </div>

        <div class="my-3">
          <label for="phone" class="form-label">Phone</label>
          <input id="phone" type="text" v-model="userData.profile.user_phone" class="form-control"
                 placeholder="phone number">
        </div>

        <div class="my-3">
          <label for="role" class="form-label">Status</label>
          <select id="role" class="form-select form-select-sm mt-2" aria-label=".form-select-sm example"
                  v-model="userData.user_status"
          >
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
        </div>

        <div class="my-3">
          <label for="role" class="form-label">Role</label>
          <select id="role" class="form-select form-select-sm mt-2" aria-label=".form-select-sm example"
                  v-model="userData.roles[0].id"
          >
            <option disabled :value=null>Select Role</option>
            <option v-for="role in roleList" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
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
      roleList: [],
      userData: {},
      userId: this.$route.params,
    }
  },

  created() {
    this.fetchUserData().then(() => this.lazyLoader = false)
  },

  computed: {
    // get role list
    getRoleList() {
      return JSON.parse(JSON.stringify(this.$store.getters["setting /role/getRoleList"]))
    },

    // get user list
    getUserData() {
      return JSON.parse(JSON.stringify(this.$store.getters["setting /user/getUserData"]))
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

    async fetchUserData() {
      await this.$store.dispatch('setting /user/edit', this.userId).then(() => {
        this.userData = {...this.getUserData}
        this.roleList.splice(0, this.roleList.length, ...this.getRoleList);
      })
    },

    onUpdate() {
      this.$store.dispatch('setting /user/update', {
        formData: this.userData,
        userId: this.userId
      })
    },
  }
}
</script>






