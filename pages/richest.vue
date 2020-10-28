<script>
export default {
  middleware({ redirect, app }) {
    return redirect(301, app.localePath('top-wallets'))
  },
}
</script>
