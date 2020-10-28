<template>
  <div>
    <b-nav-form @submit="onSearch">
      <b-form-input
        v-model="term"
        size="sm"
        class="mr-sm-2"
        :placeholder="$t('navigation.search.placeholder')"
      />
      <b-overlay
        :show="isBusy"
        rounded
        opacity="0.6"
        spinner-small
        spinner-variant="primary"
        class="d-inline-block"
      >
        <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="light">
          {{ $t('navigation.search.button') }}
        </b-button>
      </b-overlay>
    </b-nav-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { FETCH_SEARCH, SEARCH, SEARCH_MODULE_NAMESPACE } from '@/store/search'

export default {
  data() {
    return {
      term: '',
      isBusy: false,
    }
  },
  computed: {
    ...mapState(SEARCH_MODULE_NAMESPACE, {
      result: SEARCH,
    }),
  },
  methods: {
    async onSearch(evt) {
      evt.preventDefault()
      if (this.term.length < 1) {
        return
      }

      this.isBusy = true
      await this.search({ term: this.term })

      /*
        Error,
        AddressHash,
        BlockHash,
        BlockNumber,
        TransactionHash
       */
      const route = { name: '', params: { hash: this.result.id } }
      switch (this.result.type) {
        case 1:
          route.name = 'address-hash'
          break
        case 2:
          route.name = 'block-hash'
          break
        case 4:
          route.name = 'transaction-hash'
          break
        default:
          return
      }

      await this.$router.push(this.localePath(route))
      this.term = ''
      this.isBusy = false
    },
    ...mapActions(SEARCH_MODULE_NAMESPACE, {
      search: FETCH_SEARCH,
    }),
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/variables';

header /deep/ .navbar {
  background-color: $primary;
  margin-bottom: 1.875rem;
}
</style>
