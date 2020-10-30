<template>
  <b-navbar-nav class="ml-auto rounded">
    <b-nav-form @submit="onSearch">
      <b-form-input
        v-model="term"
        size="sm"
        class="border-0 not-rounded"
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
        <b-button size="sm" type="submit" variant="light" class="not-rounded">
          <font-awesome-icon :icon="['fas', 'search']" />
        </b-button>
      </b-overlay>
    </b-nav-form>
  </b-navbar-nav>
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
          this.$bvToast.toast('No results found, please try again.', {
            title: 'Search Error',
            toaster: 'b-toaster-bottom-center',
            variant: 'danger',
            solid: true,
          })
          this.term = ''
          this.isBusy = false
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
@import 'node_modules/bootstrap/scss/functions';
@import 'node_modules/bootstrap/scss/variables';
@import 'node_modules/bootstrap/scss/mixins/_breakpoints';

.navbar-nav {
  background-color: #fff;
}

@include media-breakpoint-up(md) {
  .navbar-nav input {
    width: 350px;
  }
}
</style>
