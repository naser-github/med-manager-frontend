<template>
  <div class="hidden xl:flex flex-col min-h-screen">
    <NuxtLink to="/" class="-intro-x items-center">
      <!--<img alt="logo" class="w-6 flex-wrap-reverse" src="@/assets/images/logo.svg">-->
      <span class="flex-wrap-reverse text-white text-4xl font-bold mt-20">
          Med Man
      </span>
    </NuxtLink>
    <div class="my-auto">
      <img alt="image" class="-intro-x w-1/2 -mt-16" src="@/assets/images/logo.svg">
      <div class="-intro-x text-white font-medium text-4xl leading-tight mt-10">
        A few more clicks to
        <br>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
