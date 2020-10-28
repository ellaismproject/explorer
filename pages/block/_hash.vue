<template>
  <div>
    <page-header title-key="page.block.title" />
    <div v-if="!$fetchState.pending">
      <block-header :hash="hash" />
    </div>
    <section class="page-section rounded">
      <div v-if="$fetchState.pending">
        <div class="px-5">
          <b-spinner class="d-block m-auto" type="grow" variant="primary" />
        </div>
      </div>
      <div v-else>
        <b-list-group class="px-5">
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Transactions</div>
              <div>{{ $n(transactionCount) }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Confirmations</div>
              <div>{{ $n(confirmations) }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Height</div>
              <div>{{ $n(block.blockNumber) }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Timestamp</div>
              <div>
                {{ $d($moment.unix(block.timestamp).toDate(), 'long') }}
              </div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Miner</div>
              <div>
                <span v-b-tooltip.hover :title="block.miner">
                  <b-link
                    :to="{
                      name: 'address-hash',
                      params: { hash: block.miner },
                    }"
                    >{{ block.minerDisplay || $t('unknownMiner') }}
                  </b-link>
                </span>
              </div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Difficulty</div>
              <div>{{ block.difficulty }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Total difficulty</div>
              <div>{{ block.totalDifficulty }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Size</div>
              <div>{{ block.size }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Gas Used</div>
              <div>{{ block.gasUsed }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Gas Limit</div>
              <div>{{ block.gasLimit }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Extra Data</div>
              <div>{{ block.extraData }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Parent ID</div>
              <div>
                <b-link
                  :to="{
                    name: 'block-hash',
                    params: { hash: block.parentHash },
                  }"
                >
                  {{ block.parentHash }}
                </b-link>
              </div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Sha3Uncles</div>
              <div>{{ block.sha3Uncles }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4">Nonce</div>
              <div>{{ block.nonce }}</div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </section>
    <section
      v-if="!$fetchState.pending && transactionCount"
      class="page-section rounded mt-4"
    >
      <block-transaction-list :hash="hash" type="block" loader />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BLOCK, BLOCK_MODULE_NAMESPACE, FETCH_BLOCK } from '@/store/block'
import { STAT_MODULE_NAMESPACE, NET_INFO } from '@/store/stat'
import PageHeader from '@/components/pageHeader'
import BlockTransactionList from '@/components/blockTransactionList'
import BlockHeader from '@/components/blockHeader'

export default {
  components: { BlockHeader, BlockTransactionList, PageHeader },
  async fetch() {
    await this.$store.dispatch(`${BLOCK_MODULE_NAMESPACE}/${FETCH_BLOCK}`, {
      hash: this.$route.params.hash,
    })
  },
  computed: {
    ...mapState(BLOCK_MODULE_NAMESPACE, {
      block: BLOCK,
    }),
    ...mapState(STAT_MODULE_NAMESPACE, {
      netInfo: NET_INFO,
    }),
    hash() {
      return this.block.hash
    },
    confirmations() {
      let number = parseInt(this.transaction.blockNumber)
      number = this.netInfo.bestBlock - number
      return this.$n(number > 0 ? number : 0)
    },
    transactionCount() {
      return this.block.transactionCount
    },
  },
  watch: {
    '$route.query': '$fetch',
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
