<template>
  <section>
    <LazyLoader v-if="lazyLoader"/>
    <div v-else>
      <div class="intro-y box px-5 pt-5 mt-5 mx-16">
        <div class="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">
          <div class="flex flex-1 px-5 items-center justify-center lg:justify-start">
            <div class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
              <img alt="" class="rounded-full" src="https://tinker.left4code.com/dist/images/profile-12.jpg">
            </div>
            <div class="ml-5">
              <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">{{ profileData.name }}</div>
              <!--          <div class="text-slate-500">{{ profileData.email }}</div>-->
            </div>
          </div>
          <div
            class="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0">
            <div class="font-medium text-center lg:text-left lg:mt-3">Contact Details</div>
            <div class="flex flex-col justify-center items-center lg:items-start mt-4">
              <div class="truncate sm:whitespace-normal flex items-center my-4">
                <fa :icon="['fas','fa-envelope']"/>
                <span class="mx-4">{{ profileData.email }}</span>
              </div>
              <div class="truncate sm:whitespace-normal flex items-center my-4">
                <fa :icon="['fas','fa-phone']"/>
                <span class="mx-4">{{ profileData.profile.user_phone }}</span>
              </div>
            </div>
          </div>
        </div>
        <ul class="nav nav-link-tabs flex-col sm:flex-row justify-center lg:justify-start text-center" role="tablist">
          <li id="profile-tab" class="nav-item" @click="currentTab='profile' ">
            <div class="nav-link py-4 flex items-center" :class="{active:activeTab('profile')}">
              <fa :icon="['fas','fa-user']" class="mr-2"/>
              Profile
            </div>
          </li>

          <li id="settings-tab" class="nav-item" @click="currentTab='editProfile' ">
            <div class="nav-link py-4 flex items-center" :class="{active:activeTab('editProfile')}">
              <fa icon="fas fa-gear" class="mr-2"/>
              Edit Profile
            </div>
          </li>

          <li id="change-password-tab" class="nav-item" @click="currentTab='editPassword' ">
            <div class="nav-link py-4 flex items-center" :class="{active:activeTab('editPassword')}">
              <fa icon="fas fa-lock" class="mr-2"/>
              Change Password
            </div>
          </li>
        </ul>
      </div>

      <EditProfile v-if="activeTab('editProfile')" :profileData="profileData"/>

      <EditPassword v-if="activeTab('editPassword')"/>
    </div>
  </section>
</template>

<script>
import LazyLoader from "@/components/base/components/LazyLoader"
import EditPassword from "@/components/profile/EditPassword";
import EditProfile from "@/components/profile/EditProfile";

export default {

  name: 'ProfilePage',
  middleware: 'isAuthorized',
  components: {EditPassword, EditProfile, LazyLoader},

  data() {
    return {
      currentTab: 'profile',
      lazyLoader: true,
      profileData: {},
    }
  },

  created() {
    this.fetchProfileData().then(() => this.lazyLoader = false)
  },

  computed: {
    // get user list
    getProfileData() {
      return JSON.parse(JSON.stringify(this.$store.state.profile.profileData))
    },
  },

  methods: {
    activeTab(value) {
      return this.currentTab === value
    },

    async fetchProfileData() {
      await this.$store.dispatch('profile/fetchProfileData').then(() => {
        this.profileData = {...this.getProfileData};
      }).catch((er) => {
        console.log(er)
        this.toast('danger', 'Error', 'something went wrong!!')
      })
    }
  }
}
</script>
