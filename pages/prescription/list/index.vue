<script>
export default {
  name: 'PrescriptionList',
  middleware: 'isAuthorized',
  data() {
    return {
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
  }
}
</script>

<template>
  <section>
    <div class="m-5">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center pt-2">

        <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <button class="btn btn-primary shadow-md mr-2">Add New Product</button>
            <div class="dropdown" style="position: relative;">
                <button class="dropdown-toggle btn px-2 box" aria-expanded="false" data-tw-toggle="dropdown">
                    <span class="w-5 h-5 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" icon-name="plus" class="lucide lucide-plus w-4 h-4" data-lucide="plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </span>
                </button>
                <div class="dropdown-menu w-40" id="_meygsd29r" data-popper-placement="bottom-end" style="position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate3d(0px, 38px, 0px);">
                    <ul class="dropdown-content">
                        <li>
                            <a href="" class="dropdown-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" icon-name="printer" data-lucide="printer" class="lucide lucide-printer w-4 h-4 mr-2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg> Print
                            </a>
                        </li>
                        <li>
                            <a href="" class="dropdown-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" icon-name="file-text" data-lucide="file-text" class="lucide lucide-file-text w-4 h-4 mr-2"><path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg> Export to Excel
                            </a>
                        </li>
                        <li>
                            <a href="" class="dropdown-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" icon-name="file-text" data-lucide="file-text" class="lucide lucide-file-text w-4 h-4 mr-2"><path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg> Export to PDF
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="hidden md:block mx-auto text-slate-500">Showing 1 to 10 of 150 entries</div>
            <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                <div class="w-56 relative text-slate-500">
                    <input type="text" class="form-control w-56 box pr-10" placeholder="Search...">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" icon-name="search" class="lucide lucide-search w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" data-lucide="search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
            </div>
        </div>

        <v-toolbar-title class="text-lg font-medium truncate mr-5">
          Prescription List
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-card class="col-span-2 rounded">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card>
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
            <tr class="intro-x">
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
                  <a class="flex items-center mr-3" href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         icon-name="check-square" data-lucide="check-square"
                         class="lucide lucide-check-square w-4 h-4 mr-1">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                    </svg>
                    Edit
                  </a>
                  <a class="flex items-center text-danger" href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         icon-name="trash-2" data-lucide="trash-2" class="lucide lucide-trash-2 w-4 h-4 mr-1">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Delete
                  </a>
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

