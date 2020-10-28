<template>
  <div>
    <page-header title-key="page.top_wallets.title" />
    <section class="page-section rounded">
      <top-wallet-list :page="page" paginated loader />
    </section>
  </div>
</template>

<script>
import PageHeader from '@/components/pageHeader'
import TopWalletList from '@/components/topWalletList'

export default {
  components: { TopWalletList, PageHeader },
  scrollToTop: true,
  computed: {
    page() {
      const page = parseInt(this.$route.params.page)
      return isNaN(page) ? 1 : page
    },
  },
}
</script>
