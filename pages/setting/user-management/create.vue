<template>
  <form @submit.prevent="onSubmit">
    <div class="-intro-y box rounded-lg my-8 m-24 p-4 ">
      <div class="px-8 py-4">
        <div
          class="font-medium text-base flex items-center pb-5">
          Create User
        </div>

        <div class="my-3">
          <label for="name" class="form-label ">Name</label>
          <input id="name" type="text" class="form-control" placeholder="name" required>
        </div>
        <div class="my-3">
          <label for="email" class="form-label">Email</label>
          <input id="email" type="email" class="form-control" placeholder="email" required>
        </div>
        <div class="my-3">
          <label for="phone" class="form-label">Phone</label>
          <input id="phone" type="text" class="form-control" placeholder="phone number">
        </div>

        <button type="submit" class="btn btn-primary mt-5 text-white">Create</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'EditUser',
  middleware: 'isAuthorized',

  data() {
    return {
      formData: {
        name: null,
        email: null,
        phone: null,
      },
      image: null,
    }
  },

  methods: {
    onSubmit() {
      this.$store.dispatch('user/createUser', {
        profileData: this.profileData
      }).then(() => this.closeAfterUpdate())
        .catch((error) => {
          console.log(error)
          this.toast('danger', 'Error', 'something went wrong!!')
        })
    },
  }
}
</script>
