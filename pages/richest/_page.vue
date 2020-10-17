<template>
  <div>
    <page-header title-key="page.richest.title" />
    <section class="page-section rounded">
      <!-- todo -->
    </section>
  </div>
</template>

<script>
import PageHeader from '@/components/pageHeader'

export default {
  components: { PageHeader },
  scrollToTop: true,
  computed: {
    page() {
      return parseInt(this.$route.params.page)
    },
  },
}
</script>
