<template>
  <div class="container">
    <page-header title-key="latestBlocks" />
    <section class="page-section rounded">
      <block-list refresh />
      <div class="mt-5 text-center">
        <b-button
          variant="outline-primary"
          size="lg"
          :to="localePath({ name: 'blocks-page', params: { page: 2 } })"
          class="d-none d-md-inline-block"
          >Show More</b-button
        >
        <b-button
          variant="outline-primary"
          :to="localePath({ name: 'blocks-page', params: { page: 2 } })"
          class="d-md-none"
          >Show More</b-button
        >
      </div>
    </section>
  </div>
</template>

<script>
import BlockList from '@/components/blockList'
import PageHeader from '@/components/pageHeader'

export default {
  components: { BlockList, PageHeader },
}
</script>
