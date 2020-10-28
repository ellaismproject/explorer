<template>
  <span v-b-tooltip.hover.noninteractive :title="$n(currencyValue, 'currency')">
    {{ $n(balance) }}
  </span>
</template>

<script>
import { mapState } from 'vuex'
import { PRICE, STAT_MODULE_NAMESPACE } from '@/store/stat'

export default {
  props: {
    balance: { type: Number, default: 0 },
  },
  computed: {
    ...mapState(STAT_MODULE_NAMESPACE, {
      price: PRICE,
    }),
    currencyValue() {
      return this.balance * this.price.usdPrice
    },
  },
}
</script>
