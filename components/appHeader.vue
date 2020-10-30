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
            <b-dropdown-item
              href="https://github.com/ellaismproject/ellaism"
              rel="nofollow"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'github']" class="mr-1" />
              {{ $t('navigation.resources_subnav.github') }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown :text="$t('navigation.social')" rel="nofollow">
            <b-dropdown-item href="https://discord.gg/rndbuSz" target="_blank">
              <font-awesome-icon :icon="['fab', 'discord']" class="mr-1" />
              {{ $t('navigation.social_subnav.discord') }}
            </b-dropdown-item>
            <b-dropdown-item
              href="https://t.me/ellaismproject"
              rel="nofollow"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'telegram']" class="mr-1" />
              {{ $t('navigation.social_subnav.telegram') }}
            </b-dropdown-item>
            <b-dropdown-item
              href="https://www.reddit.com/r/ellaism/"
              rel="nofollow"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'reddit']" class="mr-1" />
              {{ $t('navigation.social_subnav.reddit') }}
            </b-dropdown-item>
            <b-dropdown-item
              href="https://twitter.com/ellacommunity"
              rel="nofollow"
              target="_blank"
            >
              <font-awesome-icon :icon="['fab', 'twitter']" class="mr-1" />
              {{ $t('navigation.social_subnav.twitter') }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <app-header-search />
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import AppHeaderSearch from '@/components/appHeaderSearch'
export default {
  components: { AppHeaderSearch },
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/variables';

/deep/ .navbar {
  background-color: $primary;
  margin-bottom: 1.875rem;
}
</style>
