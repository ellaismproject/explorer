<template>
  <b-list-group-item class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <div class="mr-4 text-nowrap">{{ title }}</div>
      <div class="d-block text-truncate">
        <slot />
      </div>
    </div>
  </b-list-group-item>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
  },
}
</script>
