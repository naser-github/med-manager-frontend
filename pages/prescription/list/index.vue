<script>
// <--base components
import LazyLoader from "@/components/base/components/LazyLoader"
// base component-->

import DosageDetail from "@/components/prescription/DosageDetail";
import EditModal from '@/components/prescription/editMedicine'

export default {
  components: {DosageDetail, EditModal, LazyLoader},
  name: 'PrescriptionList',
  middleware: 'isAuthorized',
  data() {
    return {

      // <--datatable
      loading: true,
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,

      headers: [
        {text: 'Name', value: 'medicine_name'},
        {text: 'Expired At', value: 'time_period'},
        {text: 'Status', value: 'status'},
        {text: 'Action', sortable: false}
      ],

      items: [],
      // datatable-->

      // <--modal
      dosageDetails: [],
      prescription: {},

      editModalVisible: false,
      showDosageDetailVisible: false,
      // modal-->
    }
  },

  created() {
    this.fetchPrescriptionList().then(() => this.loading = false)
  },

  computed: {
    // get dosage details of a medicine from vuex
    getDosageDetails() {
      return JSON.parse(JSON.stringify(this.$store.state.prescription.dosageDetails))
    },

    // get prescription list from vuex
    getPrescriptionList() {
      return JSON.parse(JSON.stringify(this.$store.state.prescription.prescriptionList))
    },

    // get prescription medicine detail from vuex
    getPrescribedMedicineDetail() {
      return JSON.parse(JSON.stringify(this.$store.state.prescription.prescribedMedicineDetail))
    },
  },

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
    async fetchDosageDetail(id) {
      await this.$store.dispatch('prescription/fetchDosageDetails', id).then(() => {
        this.dosageDetails.splice(0, this.getDosageDetails.length, ...this.getDosageDetails);
      }).catch(() => {
        this.toast('danger', 'Error', 'something went wrong!!')
      })
    },

    // call fetchPrescriptionList (prescription.js) to get the prescription list from DB
    async fetchPrescriptionList() {
      await this.$store.dispatch('prescription/fetchPrescriptionList').then(() => {
        this.items.splice(0, this.items.length, ...this.getPrescriptionList);
      }).catch(() => {
        this.toast('danger', 'Error', 'something went wrong!!')
      })
    },

    async fetchPrescribedMedicine(payload) {
      await this.$store.dispatch('prescription/fetchPrescribedMedicineDetail', {
        medicineId: payload
      }).then(() => {
        this.prescription = {...this.getPrescribedMedicineDetail}
        const expiryDate = new Date(this.prescription.time_period)
        const currentDate = new Date()
        this.prescription.time_period = expiryDate > currentDate ? Math.ceil((Math.abs(expiryDate - currentDate)) / (1000 * 3600 * 24)) : 0
      }).catch(() => {
        this.toast('danger', 'Error', 'something went wrong!!')
      })
    },

    // edit medicine details()
    async editMedicine(medicine_id) {
      await this.fetchPrescribedMedicine(medicine_id).then(() => {
        this.showDosageDetailVisible = false;
        this.editModalVisible = true;
      })
    },

    async viewDosageDetail(id) {
      await this.fetchDosageDetail(id).then(() => {
        this.editModalVisible = false;
        this.showDosageDetailVisible = true;
      })
    },

    closeEditMedicineModal(id) {
      this.editModalVisible = false;
      this.showDosageDetailVisible = false;
    },

    async updateList() {
      await this.fetchPrescriptionList();
    }
  }
}
</script>

<template>
  <section>

    <div class="m-5">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center pt-2">

        <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <button class="text-lg font-medium truncate">Prescription List</button>

          <div class="hidden md:block mx-auto text-slate-500"></div>
          <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div class="w-56 relative text-slate-500">
              <input
                type="text"
                v-model="search"
                placeholder="Search..."
                class="form-control w-56 box pr-10"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   icon-name="search" class="lucide lucide-search w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
                   data-lucide="search">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!--lazy loader activates while fetching data from backend-->
      <LazyLoader v-if="loading"/>

      <!--datatable-->
      <div v-else class="intro-y overflow-x-auto mx-4">
        <v-data-table
          :headers="headers"
          hide-default-footer
          :items="items"
          :items-per-page="itemsPerPage"
          :page.sync="page"
          :search="search"
          class="elevation-1 table table-report justify-self-center"
          @page-count="pageCount = $event"
        >
          <template v-slot:item="{ item }">
            <tr class="intro-x zoom-in">
              <td class="w-2/5">
                <span class="font-medium whitespace-nowrap">{{ item.medicine_name }}</span>
              </td>

              <td class="w-1/5">
                {{ item.time_period }}
              </td>

              <td class="w-1/5">
                <fa v-if="item.status==='active'" :icon="['fas','fa-circle-check']" class="text-success text-xl"/>
                <fa v-else :icon="['fas','fa-circle-xmark']" class="text-danger text-xl"/>
              </td>

              <td class="table-report__action w-56">
                <div class="flex justify-center items-center">
                  <span class="flex items-center">
                    <fa :icon="['fas','fa-eye']" class="text-lg text-primary mx-2" title="view"
                        @click="viewDosageDetail(item.medicine_id)"/>
                    <fa :icon="['fa','fa-pen-to-square']" class="text-lg text-amber-300 mx-2" title="edit"
                        @click="editMedicine(item.medicine_id)"/>
                    <!--<fa :icon="['fas','fa-trash-can']" class="text-danger text-lg mx-2" title="delete"-->
                    <!--@click="editMedicine(item.id)"/>-->
                  </span>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>


        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center pt-2">
          <select
            v-model="itemsPerPage"
            class="w-20 form-select box"
          >
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <v-pagination
            v-model="page"
            :length="pageCount"
            dark
            circle
            class="md:col-span-3 justify-self-center md:justify-self-end"
          ></v-pagination>
        </div>
      </div>
    </div>

    <!--editMedicine modal-->

    <EditModal
      :value="editModalVisible"
      :prescription="prescription"
      @close="closeEditMedicineModal"
      @update_list="updateList"
    />
    <!--    @update-list="updateList"-->

    <!--editMedicine modal-->

    <!-- start view dosage detail modal -->
    <DosageDetail
      :value="showDosageDetailVisible"
      :dosageDetails="dosageDetails"
      @close="closeEditMedicineModal"
      :close-on-backdrop="false"
    />
    <!-- end view dosage detail modal-->
  </section>
</template>

<style scoped>
.v-data-table {
  background-color: #F1F5F9;
}

.v-data-table >>> table {
  text-align: left;
  line-height: 2rem;
  border-collapse: separate;
  border-spacing: 0 12px;
}

.v-data-table >>> tr {
  background-color: #FFFFFF !important;
}

.v-data-table >>> td {
  border-bottom-width: 1px !important;
  padding: .75rem 1.25rem !important;
}

.v-data-table >>> thead tr th {
  font-weight: 700 !important;
  background-color: #F1F5F9 !important;
  border-bottom: thin solid rgb(241 245 249) !important;
}

.table-report:not(.table-report--bordered):not(.table-report--tabulator) td {
  box-shadow: 7px 0 5px 0 #0000000b !important;
}
</style>

