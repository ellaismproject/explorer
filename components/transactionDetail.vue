<template>
  <b-list-group class="px-3 px-md-5">
    <title-value-list-group-item title="Sender">
      <b-link
        :to="
          localePath({
            name: 'address-hash',
            params: { hash: sender },
          })
        "
        >{{ sender }}</b-link
      >
    </title-value-list-group-item>
    <title-value-list-group-item title="Recipient">
      <b-link
        :to="
          localePath({
            name: 'address-hash',
            params: { hash: recipient },
          })
        "
        >{{ recipient }}</b-link
      >
    </title-value-list-group-item>
    <title-value-list-group-item title="Status">
      <span v-if="status">Failed</span>
      <span v-else>Success</span>
    </title-value-list-group-item>
    <title-value-list-group-item title="Confirmations">
      {{ confirmations }}
    </title-value-list-group-item>
    <title-value-list-group-item title="Height">
      {{ height }}
    </title-value-list-group-item>
    <title-value-list-group-item title="Timestamp">
      {{ timestamp }}
    </title-value-list-group-item>
    <title-value-list-group-item title="Value">
      <balance-currency-tooltip :balance="value" />
    </title-value-list-group-item>
    <title-value-list-group-item title="Nonce">
      {{ nonce }}
    </title-value-list-group-item>
    <title-value-list-group-item title="Block ID">
      <b-link
        :to="
          localePath({
            name: 'block-hash',
            params: { hash: blockHash },
          })
        "
        >{{ blockHash }}</b-link
      >
    </title-value-list-group-item>
    <title-value-list-group-item v-if="ad" title="Sponsored">
      <b-link :href="ad.url" target="_blank" rel="noopener nofollow">
        {{ ad.display }}
        <font-awesome-icon :icon="['fas', 'ad']" />
      </b-link>
    </title-value-list-group-item>
  </b-list-group>
</template>

<script>
import { mapState } from 'vuex'
import { NET_INFO, STAT_MODULE_NAMESPACE } from '@/store/stat'
import BalanceCurrencyTooltip from '@/components/balanceCurrencyTooltip'
import TitleValueListGroupItem from '@/components/titleValueListGroupItem'

export default {
  components: { TitleValueListGroupItem, BalanceCurrencyTooltip },
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(STAT_MODULE_NAMESPACE, {
      netInfo: NET_INFO,
    }),
    ad() {
      return this.netInfo.promotions?.find((p) => {
        return p.location === 'transaction'
      })
    },
    height() {
      return this.$n(parseInt(this.transaction.blockNumber))
    },
    confirmations() {
      let number = parseInt(this.transaction.blockNumber)
      number = this.netInfo.bestBlock - number
      return this.$n(number > 0 ? number : 0)
    },
    sender() {
      return this.transaction.addressFrom
    },
    recipient() {
      return this.transaction.addressTo
    },
    status() {
      return this.transaction.failed
    },
    timestamp() {
      return this.$d(
        this.$moment.unix(this.transaction.timestamp).toDate(),
        'long'
      )
    },
    nonce() {
      return this.transaction.nonce
    },
    blockHash() {
      return this.transaction.blockHash
    },
    value() {
      return parseInt(this.transaction.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.list-group-item {
  border-left: 0;
  border-right: 0;
  padding-left: 0;
  padding-right: 0;

  &:first-child {
    border-top: 0;
  }

  &:last-child {
    border-bottom: 0;
  }
}
</style>
