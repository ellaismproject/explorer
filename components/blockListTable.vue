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
      <template v-slot:cell(hash)="row">
        <b-link
          :id="`t-h-${row.item.hash}`"
          :to="
            localePath({
              name: 'block-hash',
              params: { hash: row.item.hash },
            })
          "
          >{{ formatHash(row.item.hash) }}</b-link
        >
        <b-tooltip :target="`t-h-${row.item.hash}`" :title="row.item.hash" />
      </template>
      <template v-slot:cell(blockNumber)="row">
        <i18n-n :value="parseInt(row.item.blockNumber)" />
      </template>
      <template v-slot:cell(timestamp)="row">
        {{ $d($moment.unix(row.item.timestamp).toDate(), 'long') }}
      </template>
      <template v-slot:cell(minerDisplay)="row">
        <b-link
          :id="`t-m-${row.item.hash}`"
          :to="{
            name: 'address-hash',
            params: { hash: row.item.miner },
          }"
          >{{ row.item.minerDisplay || $t('unknownMiner') }}</b-link
        >
        <b-tooltip :target="`t-m-${row.item.hash}`" :title="row.item.miner" />
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-primary">
          <b-spinner class="align-middle" type="grow" />
        </div>
      </template>
    </b-table>
    <div v-if="paginated" class="mt-5">
      <b-pagination-nav
        v-model="page"
        :link-gen="linkGen"
        :number-of-pages="pages"
        aria-controls="block-list-table"
        class="d-none d-md-block"
        align="center"
        size="lg"
        use-router
      />
      <b-pagination-nav
        v-model="page"
        :link-gen="linkGen"
        :number-of-pages="pages"
        aria-controls="block-list-table"
        align="center"
        class="d-md-none"
        limit="1"
        use-router
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BLOCK_LIST_PAGINATION, BLOCK_MODULE_NAMESPACE } from '@/store/block'

export default {
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
          class: 'text-right',
        },
        {
          key: 'minerDisplay',
          label: 'Miner',
          sortable: true,
          class: 'text-right',
        },
        {
          key: 'value',
          label: 'Total Mined',
          sortable: true,
          class: 'text-right',
        },
        {
          key: 'fees',
          label: 'Fees',
          sortable: true,
          class: 'text-right',
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
        return this.pagination.size === 0
          ? 1
          : Math.ceil(this.pagination.total / this.pagination.size)
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
  background-color: #ffffff;
  padding: 1.5rem;
}
</style>
