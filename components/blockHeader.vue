<template>
  <section
    class="bg-dark px-3 px-md-5 py-2 py-4 rounded mb-4 d-flex justify-content-between"
  >
    <div class="flex-column">
      <div class="text-muted">Block ID</div>
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
