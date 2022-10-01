<template>
  <section>
    <LazyLoader v-if="lazyLoader"></LazyLoader>
    <div v-else class="grid grid-cols-12 gap-6">
      <div class="col-span-12 2xl:col-span-9">

        <DashboardCard :runningMedicine="CountRunningMedicines"></DashboardCard>

        <div class="grid grid-cols-12 gap-6 my-12">

          <div class="col-span-12 lg:col-span-6">
            <DailyDoseList :dailyDoseList="dailyDoseList"></DailyDoseList>
          </div>

          <!--Begin::chart-->
          <div class="col-span-12 lg:col-span-6 mx-8">
            <div class="intro-y box p-5 mt-12 sm:mt-5">
              <line-chart
                :chart-options='chartOptions'
                :chart-data='chartData'
                chart-id='myCustomId'
                :height="1"
                :width="2"
              />
            </div>
          </div>
          <!--chart::END-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DailyDoseList from "@/components/dashboard/DailyDoseList";
import DashboardCard from "@/components/dashboard/DashboardCard"
import LazyLoader from "@/components/base/components/LazyLoader"

export default {
  name: 'IndexPage',
  middleware: 'isAuthorized',
  components: {DailyDoseList, DashboardCard, LazyLoader},

  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Daily Dose Chart',
            backgroundColor: '#074332',
            data: [],
          },
        ]
      },
      chartOptions: {
        responsive: true
      },
      dailyDoseList: {
        count: [],
        dose_time: [],
        label: [],
        medicine_name: [],
      },
      lazyLoader: true,
    }
  },

  created() {
    this.fetchDashboardData().then(() => this.loading = false)
  }
  ,

  computed: {

    CountRunningMedicines() {
      return this.dailyDoseList.count.reduce((a, b) => {
        return a + b;
      }, 0);
    },

    // get dosage details of a medicine from vuex
    getDailyDoseList() {
      return JSON.parse(JSON.stringify(this.$store.state.dashboard.dailyDoseList))
    },
  }
  ,

  methods: {
    // <--general functions
    toast(type, title, msg) {
      this.$toast.show({
        type: type,
        title: title,
        message: msg,
      })
    },
    // general functions-->

    // fetch dosage details of a medicine
    async fetchDashboardData() {
      await this.$store.dispatch('dashboard/fetchDashboardData').then(() => {
        const fetchedDailyDoseListData = [...this.getDailyDoseList]
        Object.keys(this.dailyDoseList).forEach(key => this.dailyDoseList[key] = []) // running loop to empty the current graph data

        // inserting fetched data to graph data
        fetchedDailyDoseListData.forEach(property => {
          this.dailyDoseList.count.push(property.count) // counts how many medicines have to take on a certain time
          this.dailyDoseList.dose_time.push(property.dose_time)
          this.dailyDoseList.label.push(property.label)
          this.dailyDoseList.medicine_name.push(property.medicine_name)
        })

        this.chartData.labels = this.dailyDoseList.dose_time;
        this.chartData.datasets.forEach(property => property.data = this.dailyDoseList.count)

        this.lazyLoader = false;

      }).catch(() => this.toast('danger', 'Error', 'something went wrong!!'))
    },
  },
}
</script>
