<script>
export default {
  name: "doseList",
  props: ["doseList"],

  methods: {
    getCurrentTime(dose) {
      return dose.split(':')[0] >= new Date().getHours()
    }
  },
};
</script>

<template>
  <section>
    <div class="intro-y flex items-center h-10">
      <h2 class="text-lg font-medium truncate mr-5">Daily Dose List</h2>
    </div>

    <div v-for="(dose, index) in doseList.dose_time" :key="index" class="mt-5">
      <div class="intro-y" v-if="getCurrentTime(dose)">
        <div class="box px-4 py-4 mb-3 flex items-center zoom-in">
          <div class="ml-4 mr-auto">
            <div class="font-medium">{{ doseList.medicine_name[index] }}</div>
            <div class="text-slate-500 text-xs mt-0.5">{{ doseList.label[index] }}</div>
          </div>
          <div class="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
            {{ dose }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
