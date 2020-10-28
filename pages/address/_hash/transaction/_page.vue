<template>
  <div>
    <page-header title-key="page.addressTransactions.title" />
    <div v-if="!$fetchState.pending">
      <address-header :hash="hash" :balance="balance" />
    </div>
    <section class="page-section rounded">
      <address-transaction-list
        :hash="hash"
        type="address"
        :page="page"
        loader
        paginated
      />
    </section>
  </div>
</template>

<script>
import PageHeader from '@/components/pageHeader'
import AddressTransactionList from '@/components/addressTransactionList'
import AddressHeader from '@/components/addressHeader'
import {
  ADDRESS,
  ADDRESS_MODULE_NAMESPACE,
  FETCH_ADDRESS,
} from '@/store/address'
import { mapState } from 'vuex'

export default {
  components: { AddressHeader, AddressTransactionList, PageHeader },
  scrollToTop: true,
  async fetch() {
    await this.$store.dispatch(`${ADDRESS_MODULE_NAMESPACE}/${FETCH_ADDRESS}`, {
      hash: this.$route.params.hash,
    })
  },
  computed: {
    ...mapState(ADDRESS_MODULE_NAMESPACE, {
      address: ADDRESS,
    }),
    hash() {
      return this.$route.params.hash
    },
    balance() {
      return this.address.balance
    },
    page() {
      return parseInt(this.$route.params.page)
    },
  },
  head() {
    return {
      title: this.$t('page.addressTransactions.metaTitle'),
    }
  },
}
</script>
