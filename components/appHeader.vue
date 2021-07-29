<template>
  <header class="container">
    <b-navbar toggleable="lg" type="dark" class="rounded">
      <b-navbar-brand
        :to="localePath({ name: 'index' })"
        class="d-flex justify-content-center align-items-center rounded-left"
      >
        <img
          src="~/assets/ellaism-logo-white.svg"
          width="40"
          height="40"
          :alt="$t('ellaism')"
        />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="localePath({ name: 'index' })">
            {{ $t('navigation.index') }}
          </b-nav-item>
          <b-nav-item :to="localePath({ name: 'top-wallets' })">
            {{ $t('navigation.top_wallets') }}
          </b-nav-item>
          <b-nav-item-dropdown :text="$t('navigation.resources')">
            <b-dropdown-item href="https://ellaism.io">
              <font-awesome-icon :icon="['fas', 'globe']" class="mr-1" />
              {{ $t('navigation.resources_subnav.website') }}
            </b-dropdown-item>
            <b-dropdown-item href="https://forum.ellaism.io">
              <font-awesome-icon :icon="['fas', 'users']" class="mr-1" />
              {{ $t('navigation.resources_subnav.forum') }}
            </b-dropdown-item>
            <b-dropdown-item
              href="https://github.com/ellaismproject/ellaism"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'github']" class="mr-1" />
              {{ $t('navigation.resources_subnav.github') }}
            </b-dropdown-item>
            <div class="dropdown-divider"></div>
            <b-dropdown-item
              href="https://discord.gg/gz9tURY"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <font-awesome-icon :icon="['fab', 'discord']" class="mr-1" />
              {{ $t('navigation.social_subnav.discord') }}
            </b-dropdown-item>
            <b-dropdown-item
              href="https://t.me/ellaismproject"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'telegram']" class="mr-1" />
              {{ $t('navigation.social_subnav.telegram') }}
            </b-dropdown-item>
            <b-dropdown-item
              href="https://www.reddit.com/r/ellaism/"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'reddit']" class="mr-1" />
              {{ $t('navigation.social_subnav.reddit') }}
            </b-dropdown-item>
            <b-dropdown-item
              href="https://twitter.com/ellacommunity"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'twitter']" class="mr-1" />
              {{ $t('navigation.social_subnav.twitter') }}
            </b-dropdown-item>
            <div class="dropdown-divider"></div>
            <b-dropdown-item
              href="https://blocksentinel.dev"
              rel="noopener"
              target="_blank"
            >
              <font-awesome-icon :icon="['fas', 'server']" class="mr-1" />
              {{ $t('vendor.blocksentinel') }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item
            v-if="ad"
            :href="ad.url"
            rel="noopener nofollow"
            target="_blank"
          >
            {{ ad.display }}
            <font-awesome-icon :icon="['fas', 'ad']" />
          </b-nav-item>
        </b-navbar-nav>
        <app-header-search />
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import AppHeaderSearch from '@/components/appHeaderSearch'
import { NET_INFO, STAT_MODULE_NAMESPACE } from '@/store/stat'
import { mapState } from 'vuex'

export default {
  components: { AppHeaderSearch },
  computed: {
    ...mapState(STAT_MODULE_NAMESPACE, {
      netInfo: NET_INFO,
    }),
    ad() {
      return this.netInfo.promotions?.find((p) => {
        return p.location === 'navbar'
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/variables';

/deep/ .navbar {
  background-color: $primary;
  margin-bottom: 1.875rem;
}
</style>
