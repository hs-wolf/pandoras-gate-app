/* eslint-disable no-console */
export enum PropertyType {
  GENERAL_GRADE = 'GENERAL_GRADE',
  GENERAL_LEVEL = 'GENERAL_LEVEL',
  GENERAL_EXP = 'GENERAL_EXP',
  GENERAL_NEXT = 'GENERAL_NEXT',
  GENERAL_ENCHANCEMENTS = 'GENERAL_ENCHANCEMENTS',
  GENERAL_ATUAL_SKILL_REGEN = 'GENERAL_ATUAL_SKILL_REGEN',
  GENERAL_MAX_SKILL_REGEN = 'GENERAL_MAX_SKILL_REGEN',
  GENERAL_JP = 'GENERAL_JP',
  GENERAL_GOLD = 'GENERAL_GOLD',
  CONDITIONS_ATUAL_HP = 'CONDITIONS_ATUAL_HP',
  CONDITIONS_ATUAL_MP = 'CONDITIONS_ATUAL_MP',
  CONDITIONS_ATUAL_SP = 'CONDITIONS_ATUAL_SP',
  CONDITIONS_ATUAL_HUNGER = 'CONDITIONS_ATUAL_HUNGER',
  CONDITIONS_MAX_HP = 'CONDITIONS_MAX_HP',
  CONDITIONS_MAX_MP = 'CONDITIONS_MAX_MP',
  CONDITIONS_MAX_SP = 'CONDITIONS_MAX_SP',
  CONDITIONS_MAX_HUNGER = 'CONDITIONS_MAX_HUNGER',
  ATTRIBUTES_STRENGTH = 'ATTRIBUTES_STRENGTH',
  ATTRIBUTES_AGILITY = 'ATTRIBUTES_AGILITY',
  ATTRIBUTES_DEXTERITY = 'ATTRIBUTES_DEXTERITY',
  ATTRIBUTES_VITALITY = 'ATTRIBUTES_VITALITY',
  ATTRIBUTES_SPIRIT = 'ATTRIBUTES_SPIRIT',
  ATTRIBUTES_LUCK = 'ATTRIBUTES_LUCK',
  ATTRIBUTES_MOD_STRENGTH = 'ATTRIBUTES_MOD_STRENGTH',
  ATTRIBUTES_MOD_AGILITY = 'ATTRIBUTES_MOD_AGILITY',
  ATTRIBUTES_MOD_DEXTERITY = 'ATTRIBUTES_MOD_DEXTERITY',
  ATTRIBUTES_MOD_VITALITY = 'ATTRIBUTES_MOD_VITALITY',
  ATTRIBUTES_MOD_SPIRIT = 'ATTRIBUTES_MOD_SPIRIT',
  ATTRIBUTES_MOD_LUCK = 'ATTRIBUTES_MOD_LUCK',
  STATS_INITIATIVE = 'STATS_INITIATIVE',
  STATS_DODGE = 'STATS_DODGE',
  STATS_MOVE = 'STATS_MOVE',
  STATS_CRITICAL = 'STATS_CRITICAL',
  STATS_PHYSICAL_DEFENSE = 'STATS_PHYSICAL_DEFENSE',
  STATS_PHYSICAL_DICE = 'STATS_PHYSICAL_DICE',
  STATS_MAGICAL_DEFENSE = 'STATS_MAGICAL_DEFENSE',
  STATS_MAGICAL_DICE = 'STATS_MAGICAL_DICE',
  RANGE_UNARMED = 'RANGE_UNARMED',
  RANGE_MELEE = 'RANGE_MELEE',
  RANGE_RANGED = 'RANGE_RANGED',
  RANGE_FIREARM = 'RANGE_FIREARM',
  HIT_UNARMED = 'HIT_UNARMED',
  HIT_MELEE = 'HIT_MELEE',
  HIT_RANGED = 'HIT_RANGED',
  HIT_FIREARM = 'HIT_FIREARM',
  PHYSICIAL_BONUS_UNARMED = 'PHYSICIAL_BONUS_UNARMED',
  PHYSICIAL_BONUS_MELEE = 'PHYSICIAL_BONUS_MELEE',
  PHYSICIAL_BONUS_RANGED = 'PHYSICIAL_BONUS_RANGED',
  PHYSICIAL_BONUS_FIREARM = 'PHYSICIAL_BONUS_FIREARM',
}

export enum OperationAction {
  SUM = 'SUM',
  SUBTRACTION = 'SUBTRACTION',
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION',
}

export interface IBasedOnOperation {
  type: PropertyType
  modifyProperty: boolean
  modifierAction?: OperationAction
  modifierValue?: number
}

export interface IOperation {
  id: string
  target: PropertyType
  action: OperationAction
  description?: string
  isBasedOnProperty?: boolean
  isPercentage?: boolean
  isSubstitution?: boolean
  value?: number
  basedOnProperty?: IBasedOnOperation
  substitutionPriority?: number
}

export interface IProperty {
  type: PropertyType
  operations: IOperation[]
}

export interface IElement {
  type: string,
  advantage?: {
    element: string
    value: string
  },
  description: string
}

export interface IJob {
  name: string,
  tier: string,
  description: string
}

export class Character {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public player: string,
    public character: string,
    public guild: string,
    public elements: IElement[],
    public jobs: IJob[],
    public operations: IOperation[]
  ) {}

  getProperty (propertyType: PropertyType, propertyTypesStack?: PropertyType[]): number {
    try {
      // Check for circular dependencies between types.
      const updatedTypesStack = this.checkForCircularDependency(propertyType, propertyTypesStack)
      // Get the list of operations that have the given propertyType as Its target.
      const operations = this.operations.filter(operation => operation.target === propertyType)
      if (operations.length) {
        // Get list of substitutions operations and sort them based on priority.
        // If no priority is present on a given operation, set It as 0.
        // Return the highes priority operation as the returning value.
        const substitutionOperations = operations.filter(operation => operation.isSubstitution)
        if (substitutionOperations.length) {
          const withMinimumPriority = substitutionOperations.map((operation) => {
            if (typeof operation.substitutionPriority !== 'number') {
              operation.substitutionPriority = 0
            }
            return operation
          })
          const highestPriority = withMinimumPriority.reduce((max, current) => {
            return current.substitutionPriority! > max.substitutionPriority! ? current : max
          }, substitutionOperations[0])
          return highestPriority.value ?? 1
        }
        // Placeholder that will holde the final value to be returned.
        let finalValue = 0
        // Get list of arithmetic operations that are not percentages or substitutions and execute them in order.
        const arithmeticsOperations = operations.filter(operation => !operation.isPercentage && !operation.isSubstitution)
        if (arithmeticsOperations.length) {
          arithmeticsOperations
            .filter(operation => operation.action === OperationAction.SUM)
            .forEach((operation) => {
              const valueToUse = this.checkIfOperationIsBasedOnProperty(operation, updatedTypesStack)
              finalValue += valueToUse
            })
          arithmeticsOperations
            .filter(operation => operation.action === OperationAction.SUBTRACTION)
            .forEach((operation) => {
              const valueToUse = this.checkIfOperationIsBasedOnProperty(operation, updatedTypesStack)
              finalValue -= valueToUse
              if (finalValue <= 0) {
                finalValue = 1
              }
            })
          arithmeticsOperations
            .filter(operation => operation.action === OperationAction.MULTIPLICATION)
            .forEach((operation) => {
              const valueToUse = this.checkIfOperationIsBasedOnProperty(operation, updatedTypesStack)
              finalValue *= valueToUse > 0 ? valueToUse : 1
            })
          arithmeticsOperations
            .filter(operation => operation.action === OperationAction.DIVISION)
            .forEach((operation) => {
              const valueToUse = this.checkIfOperationIsBasedOnProperty(operation, updatedTypesStack)
              finalValue /= valueToUse > 0 ? valueToUse : 1
            })
        }
        // Get list of percentage operations and execute them.
        const percentageOperations = operations.filter(operation => operation.isPercentage && operation.action && [OperationAction.SUM, OperationAction.SUBTRACTION].includes(operation.action))
        if (percentageOperations.length) {
          const finalPercentage = percentageOperations.reduce((accumulator, operation) => {
            const valueToUse = this.checkIfOperationIsBasedOnProperty(operation, updatedTypesStack)
            return operation.action === OperationAction.SUM ? accumulator + valueToUse : accumulator - valueToUse
          }, 0)
          const percentageValue = finalValue * (finalPercentage / 100)
          finalValue += percentageValue
          if (finalValue <= 0) {
            finalValue = 1
          }
        }
        return Math.floor(finalValue)
      }
      // Return 1 if there are no operation for the propertyType.
      return 1
    } catch (error) {
      console.log(error)
      // Return 1 if an error occured (like a circular dependency).
      return 1
    }
  }

  // Given a propertyType and a propertytypesStack, check if the type already exists in the stack.
  // If it exists, throw an error.
  // Else, return an updated stack with the provided type included.
  checkForCircularDependency (propertyType: PropertyType, propertyTypesStack?: PropertyType[]) {
    if (propertyTypesStack?.length && propertyTypesStack.includes(propertyType)) {
      alert('oof')
      throw new Error(`${propertyType} was already in the operation stack, circular operations not permitted.`)
    }
    return propertyTypesStack?.length ? [...propertyTypesStack, propertyType] : [propertyType]
  }

  // Check if an operation is based on another property, and retrive Its valu if so.
  // Else, just return the absolute value or 0.
  checkIfOperationIsBasedOnProperty (operation: IOperation, propertyTypesStack?: PropertyType[]) {
    let valueToUse = 0
    if (operation.isBasedOnProperty && operation.basedOnProperty) {
      valueToUse = this.checkIfPropertyBasedOperationHasModifiers(operation.basedOnProperty, propertyTypesStack)
    } else if (typeof operation.value === 'number') {
      valueToUse = operation.value
    }
    return valueToUse
  }

  // Check if an operations which is based on another property has modifiers, if so, execute them before returning the value.
  checkIfPropertyBasedOperationHasModifiers (based: IBasedOnOperation, recursingTypes?: PropertyType[]) {
    let valueToUse = this.getProperty(based.type, recursingTypes)
    if (based.modifyProperty && typeof based.modifierValue === 'number') {
      switch (based.modifierAction) {
        case OperationAction.SUM:
          valueToUse += based.modifierValue
          break
        case OperationAction.SUBTRACTION:
          valueToUse -= based.modifierValue
          break
        case OperationAction.MULTIPLICATION:
          valueToUse *= based.modifierValue > 0 ? based.modifierValue : 1
          break
        case OperationAction.DIVISION:
          valueToUse /= based.modifierValue > 0 ? based.modifierValue : 1
          break
        default:
          break
      }
    }
    return valueToUse >= 0 ? valueToUse : 0
  }
}
