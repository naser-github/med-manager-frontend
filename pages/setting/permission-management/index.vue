<script>
// BEGIN::base components
import LazyLoader from "@/components/base/components/LazyLoader"
// END::base-component


export default {
  components: {LazyLoader},
  name: 'PermissionList',
  middleware: 'isAuthorized',

  data() {
    return {
      loading: true,
      permissionList: [], // variable that holds permission list data

      // BEGIN::datatable
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,

      headers: [
        {text: 'Name', value: 'name'},
        {text: 'Action', sortable: false}
      ],
      // END::datatable
    }
  },

  created() {
    this.fetchPermissionList().then(() => this.loading = false)
  },

  computed: {
    // get user list
    getPermissionList() {
      return JSON.parse(JSON.stringify(this.$store.getters["setting /permission/getPermissionList"]))
    },
  },

  methods: {
    // Begin::general functions
    toast(type, title, msg) {
      this.$toast.show({
        type: type,
        title: title,
        message: msg,
      })
    },
    // END::general functions

    // call fetchPermissionList (user.js) to get the user list from DB
    async fetchPermissionList() {
      await this.$store.dispatch('setting /permission/fetchPermissionList').then(() => {
        this.permissionList.splice(0, this.permissionList.length, ...this.getPermissionList);
      })
    },

    redirectToEditPage(payload) {
      this.$router.push('/setting/permission-management/' + payload + '/edit')
    }
  }
}
</script>

<template>
  <section>
    <div class="m-5">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center pt-2">
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <span class="text-lg font-medium truncate">Permission List</span>
          <NuxtLink to="/setting/permission-management/create" class="btn btn-primary font-medium truncate mx-2">
            Create Permission
          </NuxtLink>

          <div class="hidden md:block mx-auto text-slate-500"></div>
          <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div class="w-56 relative text-slate-500">
              <input
                type="text"
                v-model="search"
                placeholder="Search..."
                class="form-control w-56 box pr-10"
              />
              <fa :icon="['fas', 'fa-magnifying-glass']"
                  class="lucide lucide-search w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"/>
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
          :items="permissionList"
          :items-per-page="itemsPerPage"
          :page.sync="page"
          :search="search"
          class="elevation-1 table table-report justify-self-center"
          @page-count="pageCount = $event"
        >
          <template v-slot:item="{ item }">
            <tr class="intro-x zoom-in">
              <td class="w-2/6">
                <span class="font-medium whitespace-nowrap">{{ item.name }}</span>
              </td>
              <td class="table-report__action w-56">
                <div class="flex justify-center items-center">
                  <span class="flex items-center" @click="redirectToEditPage(item.id)">
                    <fa :icon="['fa','fa-pen-to-square']" class="text-lg text-amber-300 mx-2" title="edit"/>
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
