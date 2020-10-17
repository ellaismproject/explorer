<template>
  <header class="container">
    <b-navbar class="rounded">
      <b-navbar-brand
        :to="localePath({ name: 'index' })"
        class="d-flex justify-content-center align-items-center rounded-left"
      >
        <img
          src="~/assets/ellaism-logo-white.svg"
          width="40"
          :alt="$t('ellaism')"
        />
      </b-navbar-brand>
      <div class="d-flex full-width">
        <b-navbar-nav>
          <b-nav-item :to="localePath({ name: 'richest' })">
            {{ $t('navigation.richest') }}
          </b-nav-item>
        </b-navbar-nav>
      </div>
    </b-navbar>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import 'assets/scss/variables';

header /deep/ .navbar {
  background-color: #ffffff;
  padding: 0;
  margin-bottom: 3.125rem;
  box-shadow: rgba(203, 208, 228, 0.19) 0 1px 9px 0;
}

header /deep/ .navbar-brand {
  background-color: $primary;
  height: 80px;
  width: 80px;
  padding: 0;
  margin: 0;
}

header /deep/ .navbar-brand img {
  max-width: 40px;
}
</style>
