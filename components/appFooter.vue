<template>
  <footer class="container pt-4 pb-4 text-muted">
    <div class="p-3 pl-3 pr-3 pl-md-5 pr-md-5 text-center">
      <i18n tag="p" path="footer.copyright" class="mb-0">
        <span slot="symbol">&copy;</span>
        <span slot="year">{{ year }}</span>
        <span slot="name">{{ $t('ellaism') }}</span>
      </i18n>
      <small
        ><a
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noopener noreferrer"
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
  },
}
</script>
