<script>
import DetailPage from "@/components/auth/DetailPage";
import SocialMedia from "@/components/auth/SocialMedia";

export default {
  name: 'SignUp',
  layout: 'auth',
  components: {SocialMedia, DetailPage},

  data() {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'user',
    }
  },

  methods: {

    toast(type, title, msg) {
      this.$toast.show({
        type: type,
        title: title,
        message: msg,
      })
    },

    async onSubmit() {
      const passwordExpression = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])";

      if (!this.name || !this.email || !this.phone || !this.password || !this.confirmPassword || !this.role) {
        this.toast('please fill up all the fields')
        return;
      }

      if (!this.password.match(passwordExpression)) {
        this.toast('password must contain at least 1 uppercase letter, 1 lowercase letter & 1 number')
        return;
      }

      if (this.password.length < 8) {
        this.toast('password must be at least eight characters long')
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.toast('password & confirm password field does not match')
        return;
      }

      await this.$store
        .dispatch('auth/singUp', {
          name: this.name,
          email: this.email,
          phone: this.phone,
          password: this.password,
          confirmPassword: this.confirmPassword,
          role: this.role,
        })
        .then((response) => {
          if (response.success === true) {
            this.toast('success', 'Success', response.message)
            this.$router.replace('/auth/sign-in')
          }
        })
        .catch(() => console.log('sign in unsuccessful!!'))
    },
  },

}
</script>

<template>
  <div class="block xl:grid grid-cols-2 gap-4">
    <!-- BEGIN: Register Info -->
    <DetailPage>
      sign up to your account
    </DetailPage>
    <!-- END: Register Info -->
    <!-- BEGIN: Register Form -->
    <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
      <div
        class="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
        <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
          Sign Up
        </h2>
        <form @submit.prevent="onSubmit">
          <div class="intro-x mt-8">
            <input type="text" v-model.trim="name" class="intro-x login__input form-control py-3 px-4 block"
                   placeholder="Name" required>
            <input type="text" v-model.trim="phone" class="intro-x login__input form-control py-3 px-4 block mt-4"
                   placeholder="Phone" required>
            <input type="email" v-model.trim="email" class="intro-x login__input form-control py-3 px-4 block mt-4"
                   placeholder="Email" required>
            <input type="password" v-model.trim="password"
                   class="intro-x login__input form-control py-3 px-4 block mt-4"
                   placeholder="Password" required>
            <input type="password" v-model.trim="confirmPassword"
                   class="intro-x login__input form-control py-3 px-4 block mt-4"
                   placeholder="Password Confirmation" required>
            <!--<div class="intro-x w-full grid grid-cols-12 gap-4 h-1 mt-3">-->
            <!--<div class="col-span-3 h-full rounded bg-success"></div>-->
            <!--<div class="col-span-3 h-full rounded bg-success"></div>-->
            <!--<div class="col-span-3 h-full rounded bg-success"></div>-->
            <!--<div class="col-span-3 h-full rounded bg-slate-100"></div>-->
            <!--</div>-->
          </div>
          <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
            <button class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">Register</button>
            <NuxtLink to="/auth/sign-in"
                      class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top">Sign in
            </NuxtLink>
          </div>
        </form>

        <SocialMedia/>

        <div class="intro-x mt-6 xl:mt-12 text-slate-600 text-center xl:text-left">
          By signing in, you agree to our
          <a class="text-primary" href="">Terms and Conditions</a>
          &
          <a class="text-primary" href="">Privacy Policy</a>
        </div>
      </div>
    </div>
    <!-- END: Register Form -->
  </div>
</template>

