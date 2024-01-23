import { Character, DEFAULT_CHARACTER_FORMULAS, ELEMENTS_LIST, JOBS_LIST } from '~/types'
import { CHARACTER_SHEET_STORE_ID, CHARACTER_STORAGE_KEY } from '~/utils/constants'

export const useCharacterSheetStore = defineStore(CHARACTER_SHEET_STORE_ID, () => {
  const character = ref<Character>()

  function saveCharacter () {
    try {
      if (character.value) {
        localStorage.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(character.value.toMap()))
      }
    } catch (error) {
      useAlertsStore().handlerError(error)
    }
  }

  function loadCharacter () {
    try {
      const data = localStorage.getItem(CHARACTER_STORAGE_KEY)
      if (data) {
        const parsed = JSON.parse(data) as Character
        if (parsed.version === Character.currentVersion) {
          character.value = Character.fromMap(JSON.parse(data))
          return
        }
      }
      character.value = new Character(
        '1234',
        'Jogador',
        'Personagem',
        'Guilda',
        [
          ELEMENTS_LIST[0]
        ],
        [
          JOBS_LIST[0]
        ],
        DEFAULT_CHARACTER_FORMULAS
      )
      saveCharacter()
    } catch (error) {
      useAlertsStore().handlerError(error)
    }
  }

  return { character, saveCharacter, loadCharacter }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCharacterSheetStore, import.meta.hot))
}
