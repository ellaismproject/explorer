<template>
  <footer class="container pt-4 pb-4 text-muted">
    <div class="p-3 pl-5 pr-5">
      <ul class="list-inline m-0">
        <li class="list-inline-item">
          <i18n path="footer.copyright">
            <span slot="symbol">&copy;</span>
            <span slot="year">{{ year }}</span>
            <span slot="name"
              ><a href="https://ellaism.io">{{ $t('ellaism') }}</a></span
            >
          </i18n>
        </li>
        <li class="list-inline-item">
          <i18n path="footer.version">
            <span slot="version">{{ version }}</span>
          </i18n>
        </li>
      </ul>
      <small
        ><a href="https://www.coingecko.com/" target="_blank" rel="nofollow"
          ><i18n path="footer.price_statement" /></a
      ></small>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear()
    },
    version() {
      return process.env.version
    },
  },
}
</script>
