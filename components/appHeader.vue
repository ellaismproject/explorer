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
              {{ $t('navigation.resources_subnav.website') }}
            </b-dropdown-item>
            <b-dropdown-item
              href="https://github.com/ellaism"
              rel="nofollow"
              target="_blank"
            >
              {{ $t('navigation.resources_subnav.github') }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown :text="$t('navigation.social')" rel="nofollow">
            <b-dropdown-item href="https://discord.gg/rndbuSz" target="_blank">
              {{ $t('navigation.social_subnav.discord') }}
            </b-dropdown-item>
            <b-dropdown-item
              href="https://t.me/ellaismproject"
              rel="nofollow"
              target="_blank"
            >
              {{ $t('navigation.social_subnav.telegram') }}
            </b-dropdown-item>
            <b-dropdown-item
              href="https://www.reddit.com/r/ellaism/"
              rel="nofollow"
              target="_blank"
            >
              {{ $t('navigation.social_subnav.reddit') }}
            </b-dropdown-item>
            <b-dropdown-item
              href="https://twitter.com/ellacommunity"
              rel="nofollow"
              target="_blank"
            >
              {{ $t('navigation.social_subnav.twitter') }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <app-header-search />
        </b-navbar-nav>
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

header /deep/ .navbar {
  background-color: $primary;
  margin-bottom: 1.875rem;
}
</style>
