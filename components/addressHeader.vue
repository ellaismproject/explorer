<template>
  <section class="bg-dark px-3 px-md-5 py-2 py-4 mb-4 rounded">
    <b-row cols="1" cols-md="2">
      <b-col>
        <div class="text-muted">Address</div>
        <div class="font-weight-bold text-light text-truncate">
          {{ hash }}
        </div>
      </b-col>
      <b-col class="text-md-right mt-2 mt-md-0">
        <div class="text-muted">Balance (ELLA)</div>
        <div class="font-weight-bold text-light">
          <balance-currency-tooltip :balance="balance" />
        </div>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import BalanceCurrencyTooltip from '@/components/balanceCurrencyTooltip'
export default {
  components: { BalanceCurrencyTooltip },
  props: {
    hash: { type: String, required: true },
    balance: { type: Number, required: true },
  },
}
</script>
