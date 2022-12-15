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
          <input id="name" type="text" v-model="roleData.name" class="form-control shadow shadow-gray-400"
                 placeholder="name" required>
        </div>

        <div class="mt-5">
          <label>Assign Permissions</label>
          <div class="intro-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2">
            <div v-for="(permission,index) in permissions" :key="permission.id" class="form-check my-2 mr-2">
              <input :id="`permission_${index}`" class="form-check-input shadow shadow-gray-400" type="checkbox"
                     :value=permission.id v-model="roleData.permissions">
              <label class="form-check-label" :for="`permission_${index}`">
                <span class="break-all">{{ permission.name }}</span>
              </label>
            </div>
          </div>
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
      permissions: [],
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

    // get permission list
    getPermissionList() {
      return JSON.parse(JSON.stringify(this.$store.getters["setting /permission/getPermissionList"]))
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
        const permissions = []
        this.roleData = {...this.getRoleData}

        this.roleData.permissions.map((ele)=>permissions.push(ele.id))

        this.roleData.permissions = permissions

        this.permissions.splice(0, this.permissions.length, ...this.getPermissionList);
      })
    },

    onUpdate() {
      this.$store.dispatch('setting /role/update', this.roleData)
    },
  }
}
</script>






