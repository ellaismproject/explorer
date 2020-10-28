<template>
  <div>
    <page-header title-key="blocks" />
    <section class="page-section rounded">
      <block-list :page="page" paginated loader />
    </section>
  </div>
</template>

<script>
import BlockList from '@/components/blockList'
import PageHeader from '@/components/pageHeader'

export default {
  components: { BlockList, PageHeader },
  scrollToTop: true,
  computed: {
    page() {
      return parseInt(this.$route.params.page)
    },
  },
}
</script>
