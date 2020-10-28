<template>
  <div>
    <page-header title-key="page.transaction.title" />
    <div v-if="!$fetchState.pending">
      <transaction-header :hash="hash" />
    </div>
    <section class="page-section rounded">
      <div v-if="$fetchState.pending">
        <div class="px-5">
          <b-spinner class="d-block m-auto" type="grow" variant="primary" />
        </div>
      </div>
      <div v-else>
        <transaction-detail :transaction="transaction" />
      </div>
    </section>
  </div>
</template>

<script>
import PageHeader from '@/components/pageHeader'
import TransactionDetail from '@/components/transactionDetail'
import {
  TRANSACTION,
  FETCH_TRANSACTION,
  TRANSACTION_MODULE_NAMESPACE,
} from '@/store/transaction'
import { mapState } from 'vuex'
import TransactionHeader from '@/components/transactionHeader'

export default {
  components: { TransactionHeader, TransactionDetail, PageHeader },
  async fetch() {
    await this.$store.dispatch(
      `${TRANSACTION_MODULE_NAMESPACE}/${FETCH_TRANSACTION}`,
      {
        hash: this.$route.params.hash,
      }
    )
  },
  computed: {
    ...mapState(TRANSACTION_MODULE_NAMESPACE, {
      transaction: TRANSACTION,
    }),
    hash() {
      return this.transaction.hash
    },
  },
  watch: {
    '$route.query': '$fetch',
  },
}
</script>
