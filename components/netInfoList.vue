<template>
  <div class="net-info-list">
    <b-list-group horizontal>
      <b-list-group-item class="pt-1 pb-1">
        <i18n path="stats.blockHeight" />
        <i18n-n :value="height" />
      </b-list-group-item>
      <b-list-group-item class="pt-1 pb-1">
        <i18n path="stats.networkHashRate" />
        <i18n path="stats.ghs">
          <span slot="amount">{{ hashRate }}</span>
        </i18n>
      </b-list-group-item>
      <b-list-group-item class="pt-1 pb-1">
        <i18n path="stats.marketCap" />
        <i18n-n :value="marketCap" format="marketCap" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { NET_INFO, PRICE, STAT_MODULE_NAMESPACE } from '@/store/stat'

export default {
  computed: {
    ...mapState(STAT_MODULE_NAMESPACE, {
      netInfo: NET_INFO,
      price: PRICE,
    }),
    hashRate() {
      return this.netInfo.averageNetworkHashRate?.toFixed(2) || 0
    },
    height() {
      return this.netInfo.bestBlock || 0
    },
    marketCap() {
      return this.price.usdMarketCap || 0
    },
  },
}
</script>

<style lang="scss" scoped>
.net-info-list /deep/ .list-group-item {
  border: none;
  font-size: 0.8275rem;
}
</style>
