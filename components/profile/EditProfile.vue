<template>
  <form @submit.prevent="onUpdate">
    <div class="-intro-y box rounded-lg my-8 m-24 p-4 ">
      <div class="px-8 py-4">
        <div
          class="font-medium text-base flex items-center pb-5">
          Edit Profile
        </div>

        <div class="my-3">
          <label for="name" class="form-label">Name</label>
          <input id="name" v-model="profileData.name" type="text" class="form-control" placeholder="name">
        </div>
        <div class="my-3">
          <label for="phone" class="form-label">Phone</label>
          <input id="phone" v-model.number="profileData.profile.user_phone" type="text" class="form-control"
                 placeholder="phone number">
        </div>

        <button type="submit" class="btn btn-primary mt-5 text-white">Update</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'EditProfile',
  middleware: 'isAuthorized',

  props: ["profileData"],

  methods: {
    onUpdate() {
      this.$store.dispatch('profile/updateProfile', {
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
