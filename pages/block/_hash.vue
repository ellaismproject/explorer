<template>
  <div>
    <page-header title-key="page.block.title" />
    <div v-if="!$fetchState.pending">
      <block-header :hash="hash" />
    </div>
    <section class="page-section rounded">
      <div v-if="$fetchState.pending">
        <div class="px-3 px-md-5">
          <b-spinner class="d-block m-auto" type="grow" variant="primary" />
        </div>
      </div>
      <div v-else>
        <b-list-group class="px-3 px-md-5">
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Transactions</div>
              <div class="d-block text-truncate">
                {{ $n(transactionCount) }}
              </div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Confirmations</div>
              <div class="d-block text-truncate">{{ $n(confirmations) }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Height</div>
              <div class="d-block text-truncate">{{ $n(height) }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Timestamp</div>
              <div class="d-block text-truncate">{{ $d(timestamp) }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Miner</div>
              <div class="d-block text-truncate">
                <span v-b-tooltip.hover :title="miner">
                  <b-link
                    :to="{
                      name: 'address-hash',
                      params: { hash: miner },
                    }"
                    >{{ minerDisplay }}
                  </b-link>
                </span>
              </div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Difficulty</div>
              <div class="d-block text-truncate">{{ $n(difficulty) }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Total difficulty</div>
              <div class="d-block text-truncate">
                {{ totalDifficultyFormatted }}
              </div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Size</div>
              <div class="d-block text-truncate">{{ $n(size) }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Gas Used</div>
              <div class="d-block text-truncate">{{ $n(gasUsed) }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Gas Limit</div>
              <div class="d-block text-truncate">{{ $n(gasLimit) }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Extra Data</div>
              <div class="d-block text-truncate">{{ extraData }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Parent ID</div>
              <div class="d-block text-truncate">
                <b-link
                  :to="{
                    name: 'block-hash',
                    params: { hash: parentHash },
                  }"
                >
                  {{ parentHash }}
                </b-link>
              </div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Sha3Uncles</div>
              <div class="d-block text-truncate">{{ sha3Uncles }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <div class="mr-4 text-nowrap">Nonce</div>
              <div class="d-block text-truncate">{{ nonce }}</div>
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
    height() {
      return parseInt(this.block.blockNumber)
    },
    confirmations() {
      let number = parseInt(this.block.blockNumber)
      number = this.netInfo.bestBlock - number
      return number > 0 ? number : 0
    },
    transactionCount() {
      return this.block.transactionCount
    },
    timestamp() {
      return this.$moment.unix(this.block.timestamp).toDate()
    },
    difficulty() {
      return parseInt(this.block.difficulty)
    },
    totalDifficultyFormatted() {
      const number = parseInt(this.block.totalDifficulty)
      if (isNaN(number)) {
        return this.block.totalDifficulty
      }

      return this.$n(number)
    },
    size() {
      return parseInt(this.block.size)
    },
    gasUsed() {
      return parseInt(this.block.gasUsed)
    },
    gasLimit() {
      return parseInt(this.block.gasLimit)
    },
    extraData() {
      return this.block.extraData
    },
    parentHash() {
      return this.block.parentHash
    },
    sha3Uncles() {
      return this.block.sha3Uncles
    },
    nonce() {
      return this.block.nonce
    },
    miner() {
      return this.block.miner
    },
    minerDisplay() {
      return this.block.minerDisplay || this.$t('unknownMiner')
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
