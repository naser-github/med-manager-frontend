<script>
import EditModal from '@/components/prescription/editMedicine'

export default {
  components: {EditModal},
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
        {text: 'Name', value: 'name'},
        {text: 'Expired At', value: 'time_period'},
        {text: 'Status', value: 'status'},
        {text: 'Action', sortable: false}
      ],
      items: [],
      // datatable-->

      medicine: null,

      // <--modal
      editModalVisible: false,
      // modal-->
    }
  },

  created() {
    this.fetchPrescriptionList()
  },

  computed: {
    // get prescription list from vuex
    getPrescriptionList() {
      return this.$store.state.prescription.presentationList
    }
  },

  methods: {

    // common toast body
    toast(type, title, msg) {
      this.$toast.show({
        type: type,
        title: title,
        message: msg,
      })
    },

    // call fetchPrescriptionList (prescription.js) to get the prescription list from DB
    fetchPrescriptionList() {
      this.$store
        .dispatch('prescription/fetchPrescriptionList')
        .then(() => {
          this.items = this.getPrescriptionList
          this.loading = false;
        })
        .catch(() => {
          this.toast('danger', 'Error', 'something went wrong!!')
        })
    },

    viewDosageDetail(id) {
      console.log(id)
    },

    // edit medicine details()
    editMedicine(id) {
      this.medicine = id;
      this.editModalVisible = !this.editModalVisible;
    },

    closeEditMedicineModal() {
      this.editModalVisible = false;
    },

    updateList(){
      console.log('f')
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
      <div v-if="loading" class="box mt-20 p-8">
        <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
          <img class="w-12" src="@/assets/images/svg/ball-triangle.svg"/>
          <!--<div class="text-center text-xs mt-2">Loading...</div>-->
        </div>
      </div>

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
            <tr class="intro-x cursor-pointer">
              <td class="w-2/5" @click="viewDosageDetail(item.id)">
                <span class="font-medium whitespace-nowrap">{{ item.name }}</span>
              </td>

              <td class="w-1/5" @click="viewDosageDetail(item.id)">
                {{ item.time_period }}
              </td>

              <td class="w-1/5" @click="viewDosageDetail(item.id)">
                <div class="text-success">
                  <fa v-if="item.status==='active'" :icon="['fas','fa-circle-check']" class="text-success text-xl"/>
                  <fa v-else :icon="['fas','fa-circle-xmark']" class="text-danger text-xl"/>
                </div>
              </td>
              <td class="table-report__action w-56">
                <div class="flex justify-center items-center">
                  <span class="flex items-center mr-3" @click="editMedicine(item)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         icon-name="check-square" data-lucide="check-square"
                         class="lucide lucide-check-square w-4 h-4 mr-1">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                    </svg>
                    Edit
                  </span>
                  <span class="flex items-center text-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         icon-name="trash-2" data-lucide="trash-2" class="lucide lucide-trash-2 w-4 h-4 mr-1">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Delete
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
      :medicine="medicine"
      @close="closeEditMedicineModal"
      @update-list="updateList"
    />

    <!--    @update-list="updateList"-->

    <!--editMedicine modal-->
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

