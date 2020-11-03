<template>
  <footer class="container pt-4 pb-4 text-muted">
    <div class="p-3 pl-3 pr-3 pl-md-5 pr-md-5 text-center text-md-left">
      <ul class="list-inline m-0">
        <li class="list-inline-item">
          <i18n path="footer.copyright">
            <span slot="symbol">&copy;</span>
            <span slot="year">{{ year }}</span>
            <span slot="name">
              <a href="https://ellaism.io">
                {{ $t('ellaism') }}
              </a>
            </span>
          </i18n>
        </li>
        <li class="list-inline-item">
          <b-link
            href="https://blocksentinel.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i18n path="footer.hosted_by_statement" />
          </b-link>
        </li>
      </ul>
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
