import Vue from "vue";
import {Bubble, Line} from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
);

Vue.component("bubble-chart", {
  extends: Bubble
});

Vue.component("line-chart", {
  extends: Line
});
