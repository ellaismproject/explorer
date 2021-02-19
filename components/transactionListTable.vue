<template>
  <div class="transaction-list-table">
    <b-table
      id="transaction-list-table"
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
        <font-awesome-icon
          v-show="row.item.failed"
          :icon="['fas', 'exclamation-circle']"
          class="text-danger"
        />
        <span v-b-tooltip.hover :title="row.item.hash">
          <b-link
            :to="
              localePath({
                name: 'transaction-hash',
                params: { hash: row.item.hash },
              })
            "
            >{{ formatHash(row.item.hash) }}</b-link
          >
        </span>
      </template>
      <template #cell(timestamp)="row">
        {{ $d($moment.unix(row.item.timestamp).toDate(), 'long') }}
      </template>

      <template #cell(addressFrom)="row">
        <span v-b-tooltip.hover :title="row.item.addressFrom">
          <b-link
            :to="
              localePath({
                name: 'address-hash',
                params: { hash: row.item.addressFrom },
              })
            "
            >{{ formatHash(row.item.addressFrom) }}</b-link
          >
        </span>
      </template>
      <template #cell(addressTo)="row">
        <span v-b-tooltip.hover :title="row.item.addressTo">
          <b-link
            :to="
              localePath({
                name: 'address-hash',
                params: { hash: row.item.addressTo },
              })
            "
            >{{ formatHash(row.item.addressTo) }}</b-link
          >
        </span>
      </template>
      <template #cell(value)="row">
        <balance-currency-tooltip :balance="row.item.value" />
      </template>
      <template #table-busy>
        <b-spinner class="d-block m-auto" type="grow" variant="primary" />
      </template>
    </b-table>
    <div
      v-if="paginated && pagination !== null && routeName !== null"
      class="mt-5"
    >
      <b-pagination-nav
        v-model="page"
        :disabled="isBusy"
        :link-gen="linkGen"
        :number-of-pages="pages"
        aria-controls="transaction-list-table"
        align="center"
        use-router
      />
    </div>
  </div>
</template>

<script>
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
    pagination: {
      type: Object,
      default: null,
    },
    routeName: {
      type: String,
      default: null,
    },
    routeParams: {
      type: Object,
      default: () => {},
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
          key: 'timestamp',
          label: 'Timestamp',
          sortable: true,
        },
        {
          key: 'addressFrom',
          label: 'Sender',
          sortable: true,
        },
        {
          key: 'addressTo',
          label: 'Recipient',
          sortable: false,
        },
        {
          key: 'value',
          label: 'Value',
          sortable: false,
          class: 'text-md-right',
        },
      ],
      sortBy: 'rank',
      sortDesc: false,
    }
  },
  computed: {
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
        name: this.routeName,
        params: { ...this.routeParams, page },
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.transaction-list-table /deep/ .b-table-busy-slot {
  padding: 1.5rem;
}
</style>
