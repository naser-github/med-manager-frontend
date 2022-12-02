<script>
export default {
  name: "DashboardCard",
  props: ["runningMedicine"],

  methods: {},
};
</script>

<template>
  <section>
    <div class="col-span-12 grid grid-cols-12 gap-6 mt-8">
      <div class="col-span-6 intro-y">
        <div class="box p-5 zoom-in">
          <div class="border border-slate-200/60 rounded-md">
            <div class="flex items-center p-3 break-all">
              <div class="flex-none">
                <div class="text-lg font-medium truncate">Running Medicines</div>
                <div class="text-slate-500 mt-1">{{ runningMedicine }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-6 intro-y">
        <div class="box p-5 zoom-in">
          <div class="border border-slate-200/60 rounded-md">
            <div class="flex items-center p-3">
              <div class="flex-none">
                <div class="text-lg font-medium truncate">Message Sent</div>
                <div class="text-slate-500 mt-1">10 [dummy]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
