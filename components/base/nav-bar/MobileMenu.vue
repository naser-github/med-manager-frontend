<template>
  <div class="mobile-menu md:hidden">
    <div class="mobile-menu-bar">
      <NuxtLink to="/" class="flex mr-auto">
        <img alt="logo" class="w-6" src="@/assets/images/logo.svg">
        <span class="text-white text-lg ml-3"> Med-Man </span>
      </NuxtLink>
      <span id="mobile-menu-toggler" @click="menuFunction">
        <svg class="w-8 h-8 text-white transform -rotate-90"
             viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M838.6 484.7H578.5c-22.5 0-40.7-18.3-40.7-40.7V183.9c0-22.5 18.3-40.7 40.7-40.7h260.1c22.5 0 40.7 18.3 40.7 40.7V444c0 22.5-18.2 40.7-40.7 40.7zM578.5 170.8c-7.3 0-13.2 5.9-13.2 13.2v260c0 7.3 5.9 13.2 13.2 13.2h260.1c7.3 0 13.2-5.9 13.2-13.2V183.9c0-7.3-5.9-13.2-13.2-13.2H578.5zM838.6 880.4H578.5c-22.5 0-40.7-18.3-40.7-40.7V579.6c0-22.5 18.3-40.7 40.7-40.7h260.1c22.5 0 40.7 18.3 40.7 40.7v260.1c0 22.5-18.2 40.7-40.7 40.7zM578.5 566.5c-7.3 0-13.2 5.9-13.2 13.2v260.1c0 7.2 5.9 13.1 13.2 13.1h260.1c7.3 0 13.2-5.9 13.2-13.1V579.6c0-7.3-5.9-13.2-13.2-13.2H578.5zM444.1 484.7H184c-22.5 0-40.7-18.3-40.7-40.7V183.9c0-22.5 18.3-40.7 40.7-40.7h260.1c22.5 0 40.7 18.3 40.7 40.7V444c0 22.5-18.3 40.7-40.7 40.7zM184 170.8c-7.3 0-13.2 5.9-13.2 13.2v260c0 7.3 5.9 13.2 13.2 13.2h260.1c7.3 0 13.2-5.9 13.2-13.2V183.9c0-7.3-5.9-13.2-13.2-13.2H184zM444.1 880.4H184c-22.5 0-40.7-18.3-40.7-40.7V579.6c0-22.5 18.3-40.7 40.7-40.7h260.1c22.5 0 40.7 18.3 40.7 40.7v260.1c0 22.5-18.3 40.7-40.7 40.7zM184 566.5c-7.3 0-13.2 5.9-13.2 13.2v260.1c0 7.2 5.9 13.1 13.2 13.1h260.1c7.3 0 13.2-5.9 13.2-13.1V579.6c0-7.3-5.9-13.2-13.2-13.2H184z"
            fill="#FFFFFF"/>
        </svg>
      </span>
    </div>

    <ul :class="(!menu) ? 'hidden': '' " class="border-t border-white/[0.08] py-5">
      <li @click="subMenuFunction('dashboard')">
        <NuxtLink to="/dashboard" class="menu menu--active">
          <div class="menu__icon">
            <fa :icon="['fas','fa-house']"/>
          </div>
          <div class="menu__title">
            <span>Dashboard</span>
          </div>
        </NuxtLink>
      </li>
      <li @click="subMenuFunction('apps')">
        <div class="menu">
          <div class="menu__icon">
            <fa :icon="['fas','fa-book-medical']"/>
          </div>
          <div class="menu__title">
            <span>Prescription</span>
            <fa :icon="['fas','fa-chevron-down']" class="menu__sub-icon "/>
          </div>
        </div>
        <ul :class="(subMenu.apps)?'menu__sub-open': '' ">
          <li>
            <NuxtLink to="/prescription/form" class="menu menu--active">
              <div class="menu__icon">
                <fa :icon="['fas','fa-plus']"/>
              </div>
              <div class="menu__title"> Add Prescription</div>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink to="/prescription/list" class="menu menu--active">
              <div class="menu__icon">
                <fa :icon="['fas','fa-list']"/>
              </div>
              <div class="menu__title"> Prescription List</div>
            </NuxtLink>
          </li>
        </ul>
      </li>

      <li @click="subMenuFunction('apps')">
        <div class="menu">
          <div class="menu__icon">
            <fa :icon="['fas','fa-book-medical']"/>
          </div>
          <div class="menu__title">
            <span>Setting</span>
            <fa :icon="['fas','fa-gear']" class="menu__sub-icon "/>
          </div>
        </div>
        <ul :class="(subMenu.apps)?'menu__sub-open': '' ">
          <li>
            <NuxtLink to="/setting/import/medicine-data" class="top-menu">
              <div class="top-menu__icon pl-2">
                <fa :icon="['fas','fa-upload']"/>
              </div>
              <div class="top-menu__title"> Import Medicine</div>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink to="/setting/user-management/" class="menu menu--active">
              <div class="menu__icon">
                <fa :icon="['fas','fa-list']"/>
              </div>
              <div class="menu__title"> User List</div>
            </NuxtLink>
          </li>
        </ul>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      subMenu: {
        dashboard: false,
        apps: false,
      }
    }
  },
  methods: {
    menuFunction() {
      this.menu = !this.menu;
    },
    subMenuFunction(val) {
      this.subMenu[val] = !this.subMenu[val]
    }
  }
}
</script>
