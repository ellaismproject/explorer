<template>
  <section
    class="bg-dark px-5 py-4 rounded mb-4 d-flex justify-content-between"
  >
    <div class="flex-column">
      <div class="text-muted">Address</div>
      <div class="text-truncate font-weight-bold text-light">
        {{ hash }}
      </div>
    </div>
    <div class="flex-column text-right">
      <div class="text-muted">Balance (ELLA)</div>
      <div class="text-truncate font-weight-bold text-light">
        <balance-currency-tooltip :balance="balance" />
      </div>
    </div>
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
