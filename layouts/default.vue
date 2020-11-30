<template>
  <main>
    <app-header />
    <Nuxt />
    <app-footer />
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import {
  FETCH_NET_INFO,
  FETCH_PRICE,
  STAT_MODULE_NAMESPACE,
} from '@/store/stat'
import AppHeader from '~/components/appHeader'
import AppFooter from '~/components/appFooter'

export default {
  components: { AppHeader, AppFooter },
  data() {
    return {
      fetchNetInfoTask: null,
      fetchPriceTask: null,
    }
  },
  async fetch() {
    await this.$store.dispatch(`${STAT_MODULE_NAMESPACE}/${FETCH_NET_INFO}`)
    await this.$store.dispatch(`${STAT_MODULE_NAMESPACE}/${FETCH_PRICE}`)
  },
  mounted() {
    this.fetchNetInfoTask = setInterval(() => {
      this.fetchNetInfo()
    }, 15000)
    this.fetchPriceTask = setInterval(() => {
      this.fetchPrice()
    }, 30000)
  },
  beforeDestroy() {
    if (this.fetchNetInfoTask !== null) {
      clearInterval(this.fetchNetInfoTask)
    }
    if (this.fetchPriceTask !== null) {
      clearInterval(this.fetchPriceTask)
    }
  },
  methods: {
    ...mapActions(STAT_MODULE_NAMESPACE, {
      fetchNetInfo: FETCH_NET_INFO,
      fetchPrice: FETCH_PRICE,
    }),
  },
  head() {
    return {
      meta: [
        {
          hid: 'generator',
          name: 'generator',
          content: `${process.env.npm_package_name} ${process.env.version}`,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
main {
  padding-top: 1.875rem;
  min-height: 100vh;
}
</style>
