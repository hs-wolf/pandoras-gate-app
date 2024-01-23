import { NAVBAR_STORE_ID } from '~/utils/constants'

export const useNavbarStore = defineStore(NAVBAR_STORE_ID, () => {
  const title = ref('Pandoras Gate App')
  function setTitle (value: string) {
    title.value = value
  }
  return { title, setTitle }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavbarStore, import.meta.hot))
}
