<template>
  <div class="container">
    <p>Please wait while we're logging you in...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: this.$route.query.token ? this.$route.query.token : null,
      name: this.$route.query.name ? this.$route.query.name : null,
      email: this.$route.query.email ? this.$route.query.email : null,

    }
  },
  mounted() {
    this.$store
      .dispatch('auth/socialLogin', {
        token: this.token,
        name: this.name,
        email: this.email,
        expiredAt: new Date().getTime() + 2 * 3600 * 1000,
      }).then(()=>{
        this.$router.replace('/')
    })
  }
}
</script>
