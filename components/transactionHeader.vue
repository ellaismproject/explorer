<template>
  <section
    class="bg-dark px-5 py-4 rounded mb-4 d-flex justify-content-between"
  >
    <div class="flex-column">
      <div class="text-muted">Transaction ID</div>
      <div class="text-truncate font-weight-bold text-light">
        {{ hash }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    hash: { type: String, required: true },
  },
}
</script>
