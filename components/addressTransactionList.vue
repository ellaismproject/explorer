<template>
  <transaction-list-table
    :items="items"
    loader
    :is-loading="isLoading"
    :paginated="paginated"
    :pagination="pagination"
    route-name="address-hash-transaction-page"
    :route-params="routeParams"
  />
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {
  TRANSACTION_LIST,
  FETCH_TRANSACTION_LIST,
  TRANSACTION_MODULE_NAMESPACE,
  TRANSACTION_LIST_PAGINATION,
} from '@/store/transaction'
import TransactionListTable from '@/components/transactionListTable'

export default {
  components: { TransactionListTable },
  props: {
    hash: { type: String, required: true },
    type: { type: String, required: true },
    page: { type: Number, default: 1 },
    loader: { type: Boolean, default: false },
    paginated: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentPage: 1,
      isLoading: false,
    }
  },
  async fetch() {
    this.isLoading = true
    await this.$store.dispatch(
      `${TRANSACTION_MODULE_NAMESPACE}/${FETCH_TRANSACTION_LIST}`,
      {
        hash: this.$props.hash,
        type: this.$props.type,
        page: this.$props.page,
      }
    )
    this.isLoading = false
  },
  computed: {
    ...mapState(TRANSACTION_MODULE_NAMESPACE, {
      items: TRANSACTION_LIST,
      pagination: TRANSACTION_LIST_PAGINATION,
    }),
    routeParams() {
      return {
        hash: this.hash,
      }
    },
  },
  watch: {
    async page(val) {
      this.currentPage = val
      this.isLoading = true
      await this.fetchList({
        hash: this.hash,
        type: this.type,
        page: this.currentPage,
      })
      this.isLoading = false
    },
  },
  methods: {
    ...mapActions(TRANSACTION_MODULE_NAMESPACE, {
      fetchList: FETCH_TRANSACTION_LIST,
    }),
  },
}
</script>
