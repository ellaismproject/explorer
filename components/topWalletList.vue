<template>
  <top-wallet-list-table
    :items="items"
    :paginated="paginated"
    loader
    :is-loading="isLoading"
  />
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {
  FETCH_TOP_WALLET_LIST,
  STAT_MODULE_NAMESPACE,
  TOP_WALLET_LIST,
} from '@/store/stat'
import TopWalletListTable from '@/components/topWalletListTable'

export default {
  components: { TopWalletListTable },
  props: {
    page: { type: Number, default: 1 },
    paginated: { type: Boolean, default: false },
    loader: { type: Boolean, default: false },
  },
  async fetch() {
    this.isLoading = true
    await this.$store.dispatch(
      `${STAT_MODULE_NAMESPACE}/${FETCH_TOP_WALLET_LIST}`,
      { page: this.$props.page }
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
    ...mapState(STAT_MODULE_NAMESPACE, {
      items: TOP_WALLET_LIST,
    }),
  },
  watch: {
    async page(val) {
      this.currentPage = val
      this.isLoading = true
      await this.fetchList({ page: this.currentPage })
      this.isLoading = false
    },
  },
  methods: {
    ...mapActions(STAT_MODULE_NAMESPACE, {
      fetchList: FETCH_TOP_WALLET_LIST,
    }),
  },
}
</script>
