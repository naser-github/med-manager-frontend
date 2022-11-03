<template>
  <form @submit.prevent="onUpdate">
    <div class="-intro-y box rounded-lg my-8 m-24 p-4 ">
      <div class="px-8 py-4">
        <div
          class="font-medium text-base flex items-center pb-5">
          Change Password
        </div>

        <div class="mt-3">
          <label for="current_password" class="form-label">Current Password</label>
          <input id="current_password" type="password" class="form-control" v-model="formData.currentPassword">
        </div>

        <div class="mt-3">
          <label for="new_password" class="form-label">New Password</label>
          <input id="new_password" type="password" class="form-control" v-model="formData.password">
        </div>
        <div class="mt-3">
          <label for="confirm_password" class="form-label">Confirm Password</label>
          <input id="confirm_password" type="password" class="form-control" v-model="formData.password_confirm">
        </div>

        <button class="btn btn-primary mt-5">Update</button>
      </div>
    </div>
  </form>
</template>

<script>

export default {
  name: 'ChangePassword',
  middleware: 'isAuthorized',
  data() {
    return {
      formData: {
        currentPassword: null,
        password: null,
        password_confirm: null,
      }
    }
  },

  methods: {
    // common toast body
    toast(type, title, msg) {
      this.$toast.show({
        type: type,
        title: title,
        message: msg,
      })
    },

    onUpdate() {
      if (this.formData.password !== this.formData.password_confirm) {
        this.toast('danger', 'Error', 'password & confirm password mismatch')
        return
      }


      this.$store.dispatch('profile/updatePassword', {
        current_password: this.formData.currentPassword,
        password: this.formData.password,
        password_confirmation: this.formData.password_confirm,
      }).then(() => this.closeAfterUpdate)
        .catch((error) => {
          console.log(error)
          this.toast('danger', 'Error', 'something went wrong!!')
        })
    },
  }
}
</script>
