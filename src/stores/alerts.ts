/* eslint-disable no-console */
import { ALERTS_STORE_ID } from '~/utils/constants'

export const useAlertsStore = defineStore(ALERTS_STORE_ID, () => {
  function handlerError (error: any) {
    if (error.message) {
      console.log(error.message)
      return
    }
    console.log(error)
  }

  return { handlerError }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAlertsStore, import.meta.hot))
}
