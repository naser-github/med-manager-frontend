<template>
  <nav aria-label="breadcrumb" class="-intro-x h-full mr-auto">
    <ol class="breadcrumb breadcrumb-light">
      <li class="breadcrumb-item">
        Application &nbsp;
      </li>
      <li>
        {{ breadCrumb }}
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  computed: {
    breadCrumb() {
      let path = this.$route.path
      let breadCrumb = ''

      while (path.includes('/')) {
        let index = path.search('/');
        path = path.replace("/", " ⇢ ")
        breadCrumb += path.substring(0, index+3);
        path = path.charAt(index+3).toUpperCase() + path.slice(index+4)
      }

      breadCrumb += path;

      return breadCrumb
    }
  }
}
</script>


