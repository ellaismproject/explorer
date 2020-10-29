<template>
  <section class="bg-dark px-3 px-md-5 py-2 py-4 mb-4 rounded">
    <b-row cols="1">
      <b-col>
        <div class="text-muted">Transaction ID</div>
        <div class="text-truncate font-weight-bold text-light">
          {{ hash }}
        </div>
      </b-col>
    </b-row>
  </section>
</template>

<script>
export default {
  props: {
    hash: { type: String, required: true },
  },
}
</script>
