<template>
  <div>
    <b-list-group class="px-5">
      <b-list-group-item class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <div class="mr-4">Sender</div>
          <div>
            <b-link
              :to="
                localePath({
                  name: 'address-hash',
                  params: { hash: sender },
                })
              "
              >{{ sender }}</b-link
            >
          </div>
        </div>
      </b-list-group-item>
      <b-list-group-item class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <div class="mr-4">Recipient</div>
          <div>
            <b-link
              :to="
                localePath({
                  name: 'address-hash',
                  params: { hash: recipient },
                })
              "
              >{{ recipient }}</b-link
            >
          </div>
        </div>
      </b-list-group-item>
      <b-list-group-item class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <div class="mr-4">Confirmations</div>
          <div>{{ confirmations }}</div>
        </div>
      </b-list-group-item>
      <b-list-group-item class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <div class="mr-4">Height</div>
          <div>{{ height }}</div>
        </div>
      </b-list-group-item>
      <b-list-group-item class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <div class="mr-4">Timestamp</div>
          <div>{{ timestamp }}</div>
        </div>
      </b-list-group-item>
      <b-list-group-item class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <div class="mr-4">Value</div>
          <div><balance-currency-tooltip :balance="value" /></div>
        </div>
      </b-list-group-item>
      <b-list-group-item class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <div class="mr-4">Nonce</div>
          <div>{{ nonce }}</div>
        </div>
      </b-list-group-item>
      <b-list-group-item class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <div class="mr-4">Block ID</div>
          <div>
            <b-link
              :to="
                localePath({
                  name: 'block-hash',
                  params: { hash: blockHash },
                })
              "
              >{{ blockHash }}</b-link
            >
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { NET_INFO, STAT_MODULE_NAMESPACE } from '@/store/stat'
import BalanceCurrencyTooltip from '@/components/balanceCurrencyTooltip'

export default {
  components: { BalanceCurrencyTooltip },
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
