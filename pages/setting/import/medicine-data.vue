<template>

  <form enctype="multipart/form-data" @submit.prevent="onSubmit">
    <div class="-intro-y box rounded-lg my-8 m-24 p-4 ">
      <div class="px-8 py-4">
        <div
          class="font-medium text-base flex items-center pb-5">
          Import Medicine Data
        </div>

        <div class="my-3">
          <label for="file" class="form-label required ">File</label>
          <input type="file" id="file" accept=".csv,.xlsx,.xls" ref="file" @change="handleFileUpload()"
                 class="form-control" placeholder="upload your file" required>
        </div>

        <button type="submit" class="btn btn-primary mt-5 text-white">
          <fa :icon="['fas','fa-upload']" class="mx-2"/>
          Upload
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Import Medicine Data',
  middleware: 'isAuthorized',

  data() {
    return {
      file: '',
    }
  },

  computed: {},

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


    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    async onSubmit() {
      let formData = new FormData(); // initializing form data
      formData.append('file', this.file); // appending the files which is being uploaded

      await this.$store.dispatch('medicine/importMedicine', formData)

    },
  }
}
</script>
