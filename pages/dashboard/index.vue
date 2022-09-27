<template>
  <line-chart
    :chart-options='chartOptions'
    :chart-data='chartData'
    chart-id='myCustomId'
  />
</template>

<script>

export default {
  name: 'IndexPage',
  middleware: 'isAuthorized',

  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
        datasets: [{data: [10, 20, 12, 30, 50, 22, 55, 69]}]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>
