<template>
  <section class="py-5 md:py-0 bg-black/[0.15] dark:bg-transparent">

    <!-- BEGIN: Mobile Menu -->
    <MobileMenu></MobileMenu>
    <!-- END: Mobile Menu -->

    <!-- BEGIN: Top Bar -->
    <div
      class="top-bar-boxed border-b border-white/[0.08] -mt-7 md:mt-0 -mx-3 sm:-mx-8 md:mx-0 px-4 sm:px-8 md:px-6 mb-14 md:mb-8">
      <div class="h-full flex items-center">

        <!-- BEGIN: Logo -->
        <NuxtLink to="/" class="-intro-x hidden md:flex">
          <img alt="logo" class="w-6" src="@/assets/images/logo.svg">
          <span class="text-white text-lg ml-3"> Med-Man </span>
        </NuxtLink>
        <!-- END: Logo -->

        <!-- BEGIN: Breadcrumb -->
        <Breadcrumb></Breadcrumb>
        <!-- END: Breadcrumb -->

        <!-- BEGIN: Account Menu [profile] -->
        <AccountMenu></AccountMenu>
        <!-- END: Account Menu -->
      </div>
    </div>
    <!-- END: Top Bar -->
    <!-- BEGIN: Top Menu -->
    <TopBar></TopBar>
    <!-- END: Top Menu -->

    <!-- BEGIN: Content -->
    <main class="content content--top-nav">
      <Nuxt/>
    </main>
    <!-- END: Content -->

  </section>
</template>


<script>
import MobileMenu from "~/components/base/nav-bar/MobileMenu";
import Breadcrumb from "~/components/base/nav-bar/Breadcrumb";
import AccountMenu from "~/components/base/nav-bar/AccountMenu";
import TopBar from "~/components/base/nav-bar/TopBar";
export default {
  components: {TopBar, AccountMenu, Breadcrumb, MobileMenu},
}
</script>


<style>
div#toasts {
  z-index: 150 !important;
  justify-content: flex-end !important;
}
</style>
