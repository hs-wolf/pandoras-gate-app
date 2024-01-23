export default defineNuxtPlugin(({ hook }) => {
  hook('app:suspense:resolve', () => {
    const pinia = usePinia()
    const localesStore = useLocalesStore(pinia)
    const characterSheetStore = useCharacterSheetStore(pinia)
    localesStore.loadLocale()
    characterSheetStore.loadCharacter()
  })
})
