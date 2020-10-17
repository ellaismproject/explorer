<template>
  <div class="mb-4 d-flex justify-content-between">
    <div class="d-flex flex">
      <h1>{{ $t(titleKey) }}</h1>
    </div>
    <net-info-list class="d-flex align-items-center text-muted" />
  </div>
</template>

<script>
import NetInfoList from '@/components/netInfoList'

export default {
  components: { NetInfoList },
  props: {
    titleKey: { type: String, default: null },
  },
}
</script>
