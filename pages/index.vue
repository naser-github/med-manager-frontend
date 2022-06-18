<template>
 <div class="text-center"> <div class="dropdown inline-block" data-tw-placement="bottom-start"> <button class="dropdown-toggle btn btn-primary" aria-expanded="false" data-tw-toggle="dropdown"> Filter Dropdown <i data-feather="chevron-down" class="w-4 h-4 ml-2"></i> </button> <div class="dropdown-menu"> <div class="dropdown-content"> <div class="p-2"> <div> <div class="text-xs">From</div> <input type="text" class="form-control mt-2 flex-1" placeholder="example@gmail.com"/> </div> <div class="mt-3"> <div class="text-xs">To</div> <input type="text" class="form-control mt-2 flex-1" placeholder="example@gmail.com"/> </div> <div class="flex items-center mt-3"> <button data-dismiss="dropdown" class="btn btn-secondary w-32 ml-auto">Close</button> <button class="btn btn-primary w-32 ml-2">Search</button> </div> </div> </div> </div> </div> </div>
</template>

<script>
export default {
  name: 'IndexPage',

  // head: {
  //   script: [
  //     {
  //       type: 'module',
  //       src: '../assets/js/app.js'
  //     }
  //   ]
  // },
}
</script>
