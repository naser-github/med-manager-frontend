<template>
  <div class="intro-x dropdown w-8 h-8">
    <div class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
         role="button" aria-expanded="false" data-tw-toggle="dropdown">
      <img alt="Tinker Tailwind HTML Admin Template" src="../../../assets/images/profile-10.jpg">
    </div>
    <div class="dropdown-menu w-56">
      <ul
        class="dropdown-content bg-primary/70 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
        <li class="p-2">
          <div class="font-medium">Brad Pitt</div>
          <div class="text-xs text-white/60 mt-0.5 dark:text-slate-500">Backend Engineer</div>
        </li>
        <li>
          <hr class="dropdown-divider border-white/[0.08]">
        </li>
        <li>
          <a href="" class="dropdown-item hover:bg-white/5">
            <i data-feather="user" class="w-4 h-4 mr-2"></i> Profile </a>
        </li>
        <li>
          <a href="" class="dropdown-item hover:bg-white/5">
            <i data-feather="edit" class="w-4 h-4 mr-2"></i> Add Account </a>
        </li>
        <li>
          <a href="" class="dropdown-item hover:bg-white/5">
            <i data-feather="lock" class="w-4 h-4 mr-2"></i> Reset Password </a>
        </li>
        <li>
          <a href="" class="dropdown-item hover:bg-white/5">
            <i data-feather="help-circle" class="w-4 h-4 mr-2"></i> Help </a>
        </li>
        <li>
          <hr class="dropdown-divider border-white/[0.08]">
        </li>
        <li>
          <a href="" class="dropdown-item hover:bg-white/5">
            <i data-feather="toggle-right" class="w-4 h-4 mr-2"></i> Logout </a>
        </li>
      </ul>
    </div>
  </div>
</template>
