<template>
  <transaction-list-table :items="items" loader :is-loading="isLoading" />
</template>

<script>
import { mapState } from 'vuex'
import {
  TRANSACTION_LIST,
  FETCH_TRANSACTION_LIST,
  TRANSACTION_MODULE_NAMESPACE,
} from '@/store/transaction'
import TransactionListTable from '@/components/transactionListTable'

export default {
  components: { TransactionListTable },
  props: {
    hash: { type: String, required: true },
    type: { type: String, required: true },
    loader: { type: Boolean, default: false },
  },
  async fetch() {
    this.isLoading = true
    await this.$store.dispatch(
      `${TRANSACTION_MODULE_NAMESPACE}/${FETCH_TRANSACTION_LIST}`,
      { hash: this.$props.hash, type: this.$props.type }
    )
    this.isLoading = false
  },
  data() {
    return {
      currentPage: 1,
      isLoading: false,
    }
  },
  computed: {
    ...mapState(TRANSACTION_MODULE_NAMESPACE, {
      items: TRANSACTION_LIST,
    }),
  },
  watch: {
    async page(val) {
      this.currentPage = val
      this.isLoading = true
      await this.$fetch()
      this.isLoading = false
    },
  },
}
</script>
