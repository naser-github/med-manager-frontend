<template>
  <nav class="top-nav">
    <ul>

      <!--BEGIN::dashboard-->
      <li>
        <NuxtLink to="/dashboard" class="top-menu">
          <div class="top-menu__icon pl-2">
            <fa :icon="['fas','fa-house']"/>
          </div>
          <div class="top-menu__title"> Dashboard</div>
        </NuxtLink>
      </li>
      <!--END::dashboard-->

      <!--BEGIN::prescription menu-->
      <li>
        <NuxtLink to="/prescription" class="top-menu">
          <div class="top-menu__icon pl-2">
            <fa :icon="['fas','fa-book-medical']"/>
          </div>
          <div class="top-menu__title"> Prescription
            <div class="top-menu__sub-icon">
              <fa :icon="['fas','fa-chevron-down']"/>
            </div>
          </div>
        </NuxtLink>
        <ul class="">
          <li>
            <NuxtLink to="/prescription/form" class="top-menu">
              <div class="top-menu__icon pl-2">
                <fa :icon="['fas','fa-plus']"/>
              </div>
              <div class="top-menu__title"> Add Prescription</div>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/prescription/list" class="top-menu">
              <div class="top-menu__icon pl-2">
                <fa :icon="['fas','fa-list']"/>
              </div>
              <div class="top-menu__title"> Prescription List</div>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <!--END::prescription menu-->

      <!--BEGIN::setting-->
      <li>
        <NuxtLink to="/setting" class="top-menu">
          <div class="top-menu__icon pl-2">
            <fa :icon="['fas','fa-gear']"/>
          </div>
          <div class="top-menu__title"> Setting
            <div class="top-menu__sub-icon">
              <fa :icon="['fas','fa-chevron-down']"/>
            </div>
          </div>
        </NuxtLink>
        <ul class="">
          <li>
            <NuxtLink to="/setting/import/medicine-data" class="top-menu">
              <div class="top-menu__icon pl-2">
                <fa :icon="['fas','fa-upload']"/>
              </div>
              <div class="top-menu__title"> Import Medicine</div>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/setting/user-management" class="top-menu">
              <div class="top-menu__icon pl-2">
                <fa :icon="['fas','fa-list']"/>
              </div>
              <div class="top-menu__title"> User List</div>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <!--END::setting-->
    </ul>
  </nav>
</template>
