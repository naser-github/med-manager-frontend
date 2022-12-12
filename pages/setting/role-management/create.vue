<template>
  <form v-else @submit.prevent="onSubmit">
    <div class="-intro-y box rounded-lg my-8 m-24 p-4 ">
      <div class="px-8 py-4">
        <div
          class="font-medium text-base flex items-center pb-5">
          Create Role
        </div>

        <div class="my-3">
          <label for="name" class="form-label ">Name</label>
          <input id="name" type="text" v-model="name" class="form-control" placeholder="name" required>
        </div>

        <button type="submit" class="btn btn-primary mt-5 text-white">Create</button>
      </div>
    </div>
  </form>
</template>

<script>

export default {
  name: 'CreateRole',
  middleware: 'isAuthorized',

  data() {
    return {
      name: null,
    }
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

    async onSubmit() {
      await this.$store.dispatch('setting /role/store', {name: this.name})
    },
  }
}
</script>
