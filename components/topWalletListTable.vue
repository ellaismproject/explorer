<template>
  <div class="wallet-list-table">
    <b-table
      id="wallet-list-table"
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
        <div class="text-truncate">
          <span
            v-b-tooltip.hover
            :title="row.item.hash"
            :disabled="!row.item.name"
          >
            <b-link
              :to="
                localePath({
                  name: 'address-hash',
                  params: { hash: row.item.hash },
                })
              "
            >
              <span v-if="row.item.name">{{ row.item.name }}</span>
              <span v-else>{{ row.item.hash }}</span>
            </b-link>
          </span>
        </div>
        <div v-if="row.item.tags.length > 0" class="d-inline-block">
          <b-badge
            v-for="tag in row.item.tags"
            :key="tag"
            pill
            variant="primary"
            class="mr-2"
          >
            {{ tag }}
          </b-badge>
        </div>
      </template>
      <template #cell(balance)="row">
        <balance-currency-tooltip :balance="row.item.balance" />
      </template>
      <template #cell(percent)="row">
        {{ `${$n(row.item.percent)}%` }}
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
        aria-controls="wallet-list-table"
        align="center"
        use-router
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { TOP_WALLET_LIST_PAGINATION, STAT_MODULE_NAMESPACE } from '@/store/stat'
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
          key: 'rank',
          label: 'Rank',
          sortable: true,
        },
        {
          key: 'hash',
          label: 'Address',
          sortable: true,
        },
        {
          key: 'balance',
          label: 'Balance',
          sortable: true,
          class: 'text-md-right',
        },
        {
          key: 'percent',
          label: 'Supply',
          sortable: false,
          class: 'text-md-right',
        },
      ],
      sortBy: 'rank',
      sortDesc: false,
    }
  },
  computed: {
    ...mapState(STAT_MODULE_NAMESPACE, {
      pagination: TOP_WALLET_LIST_PAGINATION,
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
    linkGen(page) {
      return {
        name: 'top-wallets-page',
        params: { page },
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wallet-list-table /deep/ .b-table-busy-slot {
  padding: 1.5rem;
}
</style>
