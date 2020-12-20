<template>
  <div>
    <page-header title-key="page.address.title" />
    <div v-if="!$fetchState.pending">
      <address-header :hash="hash" :balance="balance" />
    </div>
    <section class="page-section rounded">
      <div v-if="$fetchState.pending">
        <div class="px-3 px-md-5">
          <b-spinner class="d-block m-auto" type="grow" variant="primary" />
        </div>
      </div>
      <div v-else>
        <b-list-group class="px-3 px-md-5">
          <title-value-list-group-item title="Name">
            {{ name }}
          </title-value-list-group-item>
          <title-value-list-group-item title="Website">
            <b-link
              :href="website"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {{ website }}
            </b-link>
          </title-value-list-group-item>
          <title-value-list-group-item title="Blocks Mined">
            {{ $n(blocksMined) }}
          </title-value-list-group-item>
          <title-value-list-group-item title="Tags">
            <b-badge
              v-for="tag in tags"
              :key="tag"
              pill
              variant="primary"
              class="ml-2"
            >
              {{ tag }}
            </b-badge>
          </title-value-list-group-item>
          <title-value-list-group-item v-if="ad" title="Sponsored">
            <b-link :href="ad.url" target="_blank" rel="noopener nofollow">
              {{ ad.display }}
              <font-awesome-icon :icon="['fas', 'ad']" />
            </b-link>
          </title-value-list-group-item>
        </b-list-group>
      </div>
    </section>
    <section v-if="!$fetchState.pending" class="page-section rounded mt-4">
      <address-transaction-list :hash="hash" type="address" loader />
      <div class="mt-5 text-center">
        <b-button
          variant="outline-primary"
          :to="
            localePath({
              name: 'address-hash-transaction-page',
              params: { hash: hash, page: 2 },
            })
          "
          >Show More</b-button
        >
      </div>
    </section>
  </div>
</template>

<script>
import PageHeader from '@/components/pageHeader'
import {
  ADDRESS_MODULE_NAMESPACE,
  FETCH_ADDRESS,
  ADDRESS,
} from '@/store/address'
import { NET_INFO, STAT_MODULE_NAMESPACE } from '@/store/stat'
import { mapState } from 'vuex'
import AddressTransactionList from '@/components/addressTransactionList'
import AddressHeader from '@/components/addressHeader'
import TitleValueListGroupItem from '@/components/titleValueListGroupItem'

export default {
  components: {
    TitleValueListGroupItem,
    AddressHeader,
    AddressTransactionList,
    PageHeader,
  },
  async fetch() {
    await this.$store.dispatch(`${ADDRESS_MODULE_NAMESPACE}/${FETCH_ADDRESS}`, {
      hash: this.$route.params.hash,
    })
  },
  computed: {
    ...mapState(ADDRESS_MODULE_NAMESPACE, {
      address: ADDRESS,
    }),
    ...mapState(STAT_MODULE_NAMESPACE, {
      netInfo: NET_INFO,
    }),
    ad() {
      return this.netInfo.promotions?.find((p) => {
        return p.location === 'address'
      })
    },
    hash() {
      return this.address.hash
    },
    balance() {
      return this.address.balance
    },
    name() {
      return this.address.name
    },
    website() {
      return this.address.website
    },
    blocksMined() {
      return this.address.blocksMined || 0
    },
    tags() {
      return this.address.tags
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
