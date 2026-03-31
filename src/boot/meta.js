import { boot } from 'quasar/wrappers'
import useRouteMetaSafe from 'src/composables/useRouteMetaSafe'

export default boot(() => {
  useRouteMetaSafe()
})
