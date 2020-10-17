<template>
  <div class="container">
    <nuxt-child />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('page.block.metaTitle'),
    }
  },
}
</script>
