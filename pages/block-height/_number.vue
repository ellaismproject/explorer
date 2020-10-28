<script>
import { SEARCH_MODULE_NAMESPACE, FETCH_SEARCH } from '@/store/search'

export default {
  async middleware({ redirect, app, store, route, error }) {
    await store.dispatch(`${SEARCH_MODULE_NAMESPACE}/${FETCH_SEARCH}`, {
      term: route.params.number,
    })

    const state = store.state.search.search
    if (state.type !== 2) {
      return error({
        message: 'This page could not be found',
        statusCode: 404,
      })
    }

    return redirect(
      301,
      app.localePath({
        name: 'block-hash',
        params: {
          hash: state.id,
        },
      })
    )
  },
}
</script>
