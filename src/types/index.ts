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
  action: OperationAction
  value: number
}

export interface IOperation {
  id: string
  action: OperationAction
  absoluteValue: number
  basedOnProperty: IBasedOnOperation
  isBasedOnProperty: boolean
  isPercentage: boolean
  isSubstitution: boolean
  priority: number
  [key: string]: unknown
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
    public properties: IProperty[]
  ) {}

  getProperty (propertyType: PropertyType): number {
    const property = this.properties.find(stat => stat.type === propertyType)
    if (property && property.operations.length) {
      // Get list of substitutions operations and sort them.
      const substitutionOperations = property.operations.filter(operation => operation.isSubstitution)

      // Execute substituion operations.
      // If there's no priority set, default It to 0.
      // Get the operation with highest priority.
      // Return the highest priority value or 1, ignore other operations.
      if (substitutionOperations.length) {
        const withMinimumPriority = substitutionOperations.map((operation) => {
          if (typeof operation.priority !== 'number') {
            operation.priority = 0
          }
          return operation
        })
        const highestPriority = withMinimumPriority.reduce((max, current) => {
          return current.priority! > max.priority! ? current : max
        }, substitutionOperations[0])
        return highestPriority.absoluteValue ?? 1
      }

      // Placeholder that will holde the final value to be returned.
      let finalValue = 0

      // Get list of arithmetic operations that are not percentages or substitutions.
      const arithmeticsOperations = property.operations.filter(operation => !operation.isPercentage && !operation.isSubstitution)

      // Make arithmetic operations.
      if (arithmeticsOperations.length) {
        arithmeticsOperations
          .filter(operation => operation.action === OperationAction.SUM)
          .forEach((operation) => {
            let valueToUse = 0
            if (operation.isBasedOnProperty) {
              valueToUse = this.getBasedOnOperationResult(operation.basedOnProperty)
            } else if (typeof operation.absoluteValue === 'number') {
              valueToUse = operation.absoluteValue
            }
            console.log(`${property.type}: [${finalValue}] ${OperationAction.SUM} [${valueToUse}]${`(${operation.basedOnProperty?.type ? operation.basedOnProperty?.type : ''})`} = [${finalValue + valueToUse}]`)
            finalValue += valueToUse
          })
        arithmeticsOperations
          .filter(operation => operation.action === OperationAction.SUBTRACTION)
          .forEach((operation) => {
            let valueToUse = 0
            if (operation.isBasedOnProperty) {
              valueToUse = this.getBasedOnOperationResult(operation.basedOnProperty)
            } else if (typeof operation.absoluteValue === 'number') {
              valueToUse = operation.absoluteValue
            }
            console.log(`${property.type}: [${finalValue}] ${OperationAction.SUBTRACTION} [${valueToUse}]${`(${operation.basedOnProperty?.type ? operation.basedOnProperty?.type : ''})`} = [${finalValue + valueToUse}] ou (1)`)
            finalValue -= valueToUse
            if (finalValue <= 0) {
              finalValue = 1
            }
          })
        arithmeticsOperations
          .filter(operation => operation.action === OperationAction.MULTIPLICATION)
          .forEach((operation) => {
            let valueToUse = 0
            if (operation.isBasedOnProperty) {
              valueToUse = this.getBasedOnOperationResult(operation.basedOnProperty)
            } else if (typeof operation.absoluteValue === 'number') {
              valueToUse = operation.absoluteValue
            }
            if (valueToUse <= 0) {
              valueToUse = 1
            }
            console.log(`${property.type}: [${finalValue}] ${OperationAction.MULTIPLICATION} [${valueToUse}]${`(${operation.basedOnProperty?.type ? operation.basedOnProperty?.type : ''})`} ou (1) = [${finalValue + valueToUse}]`)
            finalValue *= valueToUse
          })
        arithmeticsOperations
          .filter(operation => operation.action === OperationAction.DIVISION)
          .forEach((operation) => {
            let valueToUse = 0
            if (operation.isBasedOnProperty) {
              valueToUse = this.getBasedOnOperationResult(operation.basedOnProperty)
            } else if (typeof operation.absoluteValue === 'number') {
              valueToUse = operation.absoluteValue
            }
            if (valueToUse <= 0) {
              valueToUse = 1
            }
            console.log(`${property.type}: [${finalValue}] ${OperationAction.DIVISION} [${valueToUse}]${`(${operation.basedOnProperty?.type ? operation.basedOnProperty?.type : ''})`} ou (1) = [${finalValue + valueToUse}]`)
            finalValue /= valueToUse
          })
      }

      // Get list of percentage operations and sort them.
      const percentageOperations = property.operations.filter(operation =>
        operation.action &&
        [OperationAction.SUM, OperationAction.SUBTRACTION].includes(operation.action) &&
        operation.isPercentage)

      // Make percentage operations.
      if (percentageOperations.length) {
        const finalPercentage = percentageOperations.reduce((accumulator, operation) => {
          let valueToUse = 0
          if (operation.isBasedOnProperty) {
            valueToUse = this.getBasedOnOperationResult(operation.basedOnProperty)
          } else if (typeof operation.absoluteValue === 'number') {
            valueToUse = operation.absoluteValue
          }
          return operation.action === OperationAction.SUM ? accumulator + valueToUse : accumulator - valueToUse
        }, 0)
        console.log(`${property.type}: [${finalValue}] PERCENTAGE [${finalPercentage}] = ${finalValue + (finalValue * (finalPercentage / 100))}`)
        finalValue += (finalValue * (finalPercentage / 100))
        if (finalValue <= 0) {
          finalValue = 1
        }
      }
      return Math.round(finalValue)
    }
    return 1
  }

  getValueToUse (value: number | PropertyType): number {
    if (typeof value === 'number') {
      return value
    }
    if (Object.values(PropertyType).includes(value as PropertyType)) {
      return this.getProperty(value as PropertyType)
    }
    return 0
  }

  getBasedOnOperationResult (based: IBasedOnOperation) {
    let valueToUse = this.getValueToUse(based.type)
    switch (based.action) {
      case OperationAction.SUM:
        valueToUse += based.value
        break
      case OperationAction.SUBTRACTION:
        valueToUse -= based.value
        break
      case OperationAction.MULTIPLICATION:
        valueToUse *= based.value > 0 ? based.value : 1
        break
      case OperationAction.DIVISION:
        valueToUse /= based.value > 0 ? based.value : 1
        break
      default:
        break
    }
    return valueToUse
  }
}
