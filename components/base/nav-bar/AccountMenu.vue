<template>
  <div v-if="userName" class="intro-x dropdown w-8 h-8">
    <div class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
         role="button" aria-expanded="false" data-tw-toggle="dropdown">
      <img alt="profile" src="@/assets/images/avatar.jpg">
    </div>
    <div class="dropdown-menu w-56">
      <ul
        class="dropdown-content bg-primary/70 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
        <li class="p-2">
          <div class="font-medium">{{ userName }}</div>
        </li>
        <li>
          <hr class="dropdown-divider border-white/[0.08]">
        </li>
        <li>
          <NuxtLink to="/profile" class="dropdown-item hover:bg-white/5">
            <i data-feather="user" class="w-4 h-4 mr-2"></i> Profile
          </NuxtLink>
        </li>
        <li>
          <span class="dropdown-item hover:bg-white/5" @click="signOut">
            <i data-feather="toggle-right" class="w-4 h-4 mr-2"></i> Logout
          </span>
        </li>
      </ul>
    </div>
  </div>

  <div v-else>
    <NuxtLink to="/auth/sign-in" class="btn btn-primary w-24 inline-block w-24" @click="signOut">
      Login
    </NuxtLink>
  </div>
</template>

<script>
export default {
  computed: {
    userName() {
      return this.$store.state.auth.userName
    }
  },

  methods: {
    signOut() {
      this.$store.dispatch('auth/signOut')
    }
  }
}
</script>
