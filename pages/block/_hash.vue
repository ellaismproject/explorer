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
          <title-value-list-group-item title="Transactions">
            {{ $n(transactionCount) }}
          </title-value-list-group-item>
          <title-value-list-group-item title="Confirmations">
            {{ $n(confirmations) }}
          </title-value-list-group-item>
          <title-value-list-group-item title="Height">
            {{ $n(height) }}
          </title-value-list-group-item>
          <title-value-list-group-item title="Timestamp">
            {{ $d(timestamp, 'long') }}
          </title-value-list-group-item>
          <title-value-list-group-item title="Miner">
            <span v-b-tooltip.hover :title="miner">
              <b-link
                :to="{
                  name: 'address-hash',
                  params: { hash: miner },
                }"
                >{{ minerDisplay }}
              </b-link>
            </span>
          </title-value-list-group-item>
          <title-value-list-group-item title="Difficulty">
            {{ $n(difficulty) }}
          </title-value-list-group-item>
          <title-value-list-group-item title="Total difficulty">
            {{ totalDifficultyFormatted }}
          </title-value-list-group-item>
          <title-value-list-group-item title="Size">
            {{ $n(size) }} bytes
          </title-value-list-group-item>
          <title-value-list-group-item title="Gas Used">
            {{ $n(gasUsed) }}
          </title-value-list-group-item>
          <title-value-list-group-item title="Gas Limit">
            {{ $n(gasLimit) }}
          </title-value-list-group-item>
          <title-value-list-group-item title="Extra Data">
            {{ extraData }}
          </title-value-list-group-item>
          <title-value-list-group-item title="Parent ID">
            <b-link
              :to="{
                name: 'block-hash',
                params: { hash: parentHash },
              }"
            >
              {{ parentHash }}
            </b-link>
          </title-value-list-group-item>
          <title-value-list-group-item title="Sha3Uncles">
            {{ sha3Uncles }}
          </title-value-list-group-item>
          <title-value-list-group-item title="Nonce">
            {{ nonce }}
          </title-value-list-group-item>
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
import TitleValueListGroupItem from '@/components/titleValueListGroupItem'

export default {
  components: {
    TitleValueListGroupItem,
    BlockHeader,
    BlockTransactionList,
    PageHeader,
  },
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
