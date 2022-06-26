<template>
  <section>
    <div class="intro-x grid grid-cols-12 gap-6 my-6 xl:mt-12">
      <hr class="col-span-5">
      <span class="col-span-1 -my-2">OR</span>
      <hr class="col-span-5">
    </div>

    <div class="intro-x mt-6 xl:mt-12 text-slate-600 text-center">
      <a href="http://med-man.dev/api/sign-in/google" class="cursor-pointer">
          <fa :icon="['fab','fa-facebook-square']" class="mr-3 lg:mr-4 text-3xl xl:text-4xl"/>
      </a>

      <a href="http://med-man.dev/api/sign-in/google" class="cursor-pointer">
          <fa :icon="['fab','fa-google']" class="mx-3 lg:mx-5 text-3xl xl:text-4xl"/>
      </a>

      <a href="http://med-man.dev/api/sign-in/google" class="cursor-pointer">
          <fa :icon="['fab','fa-linkedin']" class="mx-3 lg:mx-5 text-3xl  xl:text-4xl"/>
      </a>

      <a href="http://med-man.dev/api/sign-in/google" class="cursor-pointer">
          <fa :icon="['fab','fa-twitter']" class="mx-3 lg:mx-5 text-3xl xl:text-4xl"/>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    socialLogin(channel) {
      if (channel === 'google') {
        this.$axios.$get('/sign-in/google')
          .then((res) => {
            console.log(res);
          })
          .catch(function (err) {
            console.log('Social Media Login Failed:', err)

            this.$toast.show({
              type: 'danger',
              title: 'Error',
              message: 'something went wrong!!',
            })
          })
      }
    }
  }
}
</script>
