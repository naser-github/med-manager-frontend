<script>
export default {
  name: "dailyDoseList",
  props: ["dailyDoseList"],

  data() {
    return {
      medicineExist: false
    }
  },

  methods: {
    getCurrentTime(dose) {
      if (!this.medicineExist && dose.split(':')[0] >= new Date().getHours()) this.medicineExist = true

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

    <div v-if="!medicineExist" class="mt-5">
      <div class="intro-y">
        <div class="box px-4 py-4 mb-3 flex items-center zoom-in">
          <div class="font-medium">No medicine left to show for today</div>
        </div>
      </div>
    </div>

    <div v-for="(dose, index) in dailyDoseList.dose_time" :key="index" class="mt-5">
      <div class="intro-y" v-if="getCurrentTime(dose)">
        <div class="box px-4 py-4 mb-3 flex items-center zoom-in">
          <div class="ml-4 mr-auto">
            <div class="font-medium">{{ dailyDoseList.medicine_name[index] }}</div>
            <div class="text-slate-500 text-xs mt-0.5">{{ dailyDoseList.label[index] }}</div>
          </div>
          <div class="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
            {{ dose }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
