<template>
  <div class="block-list-table">
    <b-table
      id="block-list-table"
      :fields="fields"
      :items="items"
      primary-key="hash"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :busy="isBusy"
      stacked="sm"
      striped
      borderless
      hover
      responsive
    >
      <template #cell(hash)="row">
        <span v-b-tooltip.hover :title="row.item.hash">
          <b-link
            :to="
              localePath({
                name: 'block-hash',
                params: { hash: row.item.hash },
              })
            "
            >{{ formatHash(row.item.hash) }}</b-link
          >
        </span>
      </template>
      <template #cell(blockNumber)="row">
        <i18n-n :value="parseInt(row.item.blockNumber)" />
      </template>
      <template #cell(timestamp)="row">
        {{ $d($moment.unix(row.item.timestamp).toDate(), 'long') }}
      </template>
      <template #cell(minerDisplay)="row">
        <span v-b-tooltip.hover :title="row.item.miner">
          <b-link
            :to="{
              name: 'address-hash',
              params: { hash: row.item.miner },
            }"
            >{{ row.item.minerDisplay || $t('unknownMiner') }}</b-link
          >
        </span>
      </template>
      <template #cell(value)="row">
        <balance-currency-tooltip :balance="row.item.value" />
      </template>
      <template #cell(fees)="row">
        <balance-currency-tooltip :balance="row.item.fees" />
      </template>
      <template #table-busy>
        <b-spinner class="d-block m-auto" type="grow" variant="primary" />
      </template>
    </b-table>
    <div v-if="paginated" class="mt-5">
      <b-pagination-nav
        v-model="page"
        :disabled="isBusy"
        :link-gen="linkGen"
        :number-of-pages="pages"
        aria-controls="block-list-table"
        align="center"
        use-router
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BLOCK_LIST_PAGINATION, BLOCK_MODULE_NAMESPACE } from '@/store/block'
import BalanceCurrencyTooltip from '@/components/balanceCurrencyTooltip'

export default {
  components: { BalanceCurrencyTooltip },
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
    loader: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    paginated: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'hash',
          label: 'ID',
          sortable: true,
        },
        {
          key: 'blockNumber',
          label: 'Height',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'timestamp',
          label: 'Timestamp',
          sortable: true,
        },
        {
          key: 'transactionCount',
          label: 'Transactions',
          sortable: true,
          class: 'text-md-right',
        },
        {
          key: 'minerDisplay',
          label: 'Miner',
          sortable: true,
          class: 'text-md-right',
        },
        {
          key: 'value',
          label: 'Total Mined',
          sortable: true,
          class: 'text-md-right',
        },
        {
          key: 'fees',
          label: 'Fees',
          sortable: true,
          class: 'text-md-right',
        },
      ],
      sortBy: 'blockNumber',
      sortDesc: true,
      fetchBlockTask: null,
    }
  },
  computed: {
    ...mapState(BLOCK_MODULE_NAMESPACE, {
      pagination: BLOCK_LIST_PAGINATION,
    }),
    isBusy() {
      return this.loader && this.isLoading
    },
    page: {
      get() {
        return this.pagination.page
      },
      set() {},
    },
    pages: {
      get() {
        const pages = Math.ceil(this.pagination.total / this.pagination.size)

        return pages > 0 ? pages : 1
      },
    },
  },
  methods: {
    formatHash(hash) {
      const length = hash.length
      if (length <= 10) {
        return hash
      }

      return `${hash.substr(0, 5)}...${hash.substr(length - 5, length - 1)}`
    },
    linkGen(page) {
      return {
        name: 'blocks-page',
        params: { page },
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.block-list-table /deep/ .b-table-busy-slot {
  padding: 1.5rem;
}
</style>
