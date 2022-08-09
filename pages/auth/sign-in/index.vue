<script>
import DetailPage from "@/components/auth/DetailPage";
import SocialMedia from "@/components/auth/SocialMedia";

export default {
  components: {SocialMedia, DetailPage},

  layout: 'auth',
  middleware: 'isLogged',

  name: 'SignIn',

  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
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
      await this.$store
        .dispatch('auth/singIn', {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe,
        })
        .catch(() => console.log('sign in unsuccessful!!'))
    },
  },
}
</script>

<template>
  <div class="block xl:grid grid-cols-2 gap-4">
    <!-- BEGIN: Login Info -->
    <DetailPage>
      sign in to your account
    </DetailPage>
    <!-- END: Login Info -->

    <!-- BEGIN: Login Form -->
    <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
      <div
        class="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
        <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
          Sign In
        </h2>
        <form @submit.prevent="onSubmit">
          <div class="intro-x mt-8">
            <!--email-->
            <input v-model.trim="email" type="email" class="intro-x login__input form-control py-3 px-4 block"
                   placeholder="Email" required>

            <!--password-->
            <input v-model.trim="password" type="password"
                   class="intro-x login__input form-control py-3 px-4 block mt-4"
                   placeholder="Password" required>

          </div>

          <div class="intro-x flex text-slate-600 text-xs sm:text-sm mt-4">
            <div class="form-check mr-auto">
              <input v-model.trim="rememberMe" id="remember-me" class="form-check-input" type="checkbox">
              <label class="form-check-label cursor-pointer" for="remember-me">Remember me</label>
            </div>
            <NuxtLink to="/auth/sign-in" class="float-right">Forgot Password?</NuxtLink>
          </div>
          <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
            <button class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">Login</button>
            <NuxtLink to="/auth/sign-up"
                      class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top">Register
            </NuxtLink>
          </div>

          <SocialMedia/>

          <div class="intro-x mt-6 xl:mt-12 text-slate-600 text-center xl:text-left">
            By signing in, you agree to our
            <a class="text-primary" href="">Terms and Conditions</a>
            &
            <a class="text-primary" href="">Privacy Policy</a>
          </div>
        </form>
      </div>
    </div>
    <!-- END: Login Form -->
  </div>
</template>
