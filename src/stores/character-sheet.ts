import { v4 as uuidv4 } from 'uuid'
import { ALL_PROPERTIES, Character, OperationAction, DEFAULT_CHARACTER_FORMULAS, ELEMENTS_LIST, JOBS_LIST, type IOperation, type IOperationsGroup } from '~/types'
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
        DEFAULT_CHARACTER_FORMULAS,
        [],
        []
      )
      saveCharacter()
    } catch (error) {
      useAlertsStore().handlerError(error)
    }
  }

  function resetCharacter () {
    try {
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
        DEFAULT_CHARACTER_FORMULAS,
        [],
        []
      )
      saveCharacter()
    } catch (error) {
      useAlertsStore().handlerError(error)
    }
  }

  function createOperation ():string {
    if (!character.value) {
      return ''
    }
    const id = uuidv4()
    const newOperation:IOperation = {
      id,
      target: ALL_PROPERTIES.ATTRIBUTES_AGILITY,
      action: OperationAction.SUM,
      value: 1
    }
    character.value.effects.push(newOperation)
    return newOperation.id
  }

  function deleteOperation (id: string) {
    if (!character.value) {
      return
    }
    const operationIndex = character.value.effects.findIndex(operation => operation.id === id)
    if (operationIndex >= 0) {
      character.value.effects.splice(operationIndex, 1)
      saveCharacter()
    }
  }

  function createEffectsGroup () {
    if (!character.value) {
      return
    }
    const newEffectsGroup: IOperationsGroup = {
      id: uuidv4(),
      label: 'Group',
      operations: [
        {
          id: uuidv4(),
          description: 'Effect',
          target: ALL_PROPERTIES.ATTRIBUTES_AGILITY,
          action: OperationAction.SUM,
          value: 1
        }
      ]
    }
    character.value.effectsGroups.push(newEffectsGroup)
    saveCharacter()
  }

  function deleteEffectsGroup (id: string) {
    if (!character.value) {
      return
    }
    const groupIndex = character.value.effectsGroups.findIndex(group => group.id === id)
    if (groupIndex >= 0) {
      character.value.effectsGroups.splice(groupIndex, 1)
      saveCharacter()
    }
  }

  function effectsGroupNewOperation (id: string) {
    if (!character.value) {
      return
    }
    const effectsGroupIndex = character.value.effectsGroups.findIndex(group => group.id === id)
    if (effectsGroupIndex >= 0) {
      const operation = {
        id: uuidv4(),
        description: 'Effect',
        target: ALL_PROPERTIES.ATTRIBUTES_AGILITY,
        action: OperationAction.SUM,
        value: 1
      }
      character.value.effectsGroups[effectsGroupIndex].operations.push(operation)
    }
  }

  return {
    character,
    saveCharacter,
    loadCharacter,
    resetCharacter,
    createOperation,
    deleteOperation,
    createEffectsGroup,
    deleteEffectsGroup,
    effectsGroupNewOperation
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCharacterSheetStore, import.meta.hot))
}
