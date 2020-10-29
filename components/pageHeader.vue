<template>
  <div class="mb-4 d-flex justify-content-between">
    <div class="d-flex flex">
      <h1 class="h3 font-weight-lighter">{{ $t(titleKey) }}</h1>
    </div>
    <net-info-list class="d-none d-md-flex align-items-center text-muted" />
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
