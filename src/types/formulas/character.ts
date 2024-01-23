import { v4 as uuidv4 } from 'uuid'
import {
  ALL_PROPERTIES,
  OperationAction,
  type IOperation,
  EXPERTISE_PROPERTIES,
  ATTRIBUTES_PROPERTIES,
  EXPERTISE_LUCK_PROPERTIES,
  EXPERTISE_SPIRIT_PROPERTIES,
  EXPERTISE_VITALITY_PROPERTIES,
  EXPERTISE_DEXTERITY_PROPERTIES,
  EXPERTISE_AGILITY_PROPERTIES,
  EXPERTISE_STRENGTH_PROPERTIES,
  MAGICAL_BONUS_PROPERTIES,
  PHYSICIAL_BONUS_PROPERTIES,
  ATTRIBUTES_MOD_PROPERTIES,
  HIT_PROPERTIES,
  RANGE_PROPERTIES,
  GENERAL_PROPERTIES,
  CONDITIONS_PROPERTIES
} from '~/types'

const BASE_FORMULA_DESCRIPTION = 'Fórmula Padrão'

const BASE_VALUE_DESCRIPTION = 'Valor Base'

const DEFAULT_CHARACTER_MODIFITERS: IOperation[] = [
  {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target: ALL_PROPERTIES.ATTRIBUTES_STRENGTH_MOD,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_STRENGTH,
      modifyProperty: true,
      modifierAction: OperationAction.DIVISION,
      modifierValue: 2
    }
  },
  {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target: ALL_PROPERTIES.ATTRIBUTES_AGILITY_MOD,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_AGILITY,
      modifyProperty: true,
      modifierAction: OperationAction.DIVISION,
      modifierValue: 2
    }
  },
  {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target: ALL_PROPERTIES.ATTRIBUTES_DEXTERITY_MOD,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_DEXTERITY,
      modifyProperty: true,
      modifierAction: OperationAction.DIVISION,
      modifierValue: 2
    }
  },
  {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target: ALL_PROPERTIES.ATTRIBUTES_VITALITY_MOD,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_VITALITY,
      modifyProperty: true,
      modifierAction: OperationAction.DIVISION,
      modifierValue: 2
    }
  },
  {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target: ALL_PROPERTIES.ATTRIBUTES_SPIRIT_MOD,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_SPIRIT,
      modifyProperty: true,
      modifierAction: OperationAction.DIVISION,
      modifierValue: 2
    }
  },
  {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target: ALL_PROPERTIES.ATTRIBUTES_LUCK_MOD,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_LUCK,
      modifyProperty: true,
      modifierAction: OperationAction.DIVISION,
      modifierValue: 2
    }
  }
]

const DEFAULT_CHARACTER_STATS: IOperation[] = [
  {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target: ALL_PROPERTIES.STATS_INITIATIVE,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_AGILITY_MOD,
      modifyProperty: true,
      modifierAction: OperationAction.DIVISION,
      modifierValue: 2
    }
  },
  {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target: ALL_PROPERTIES.STATS_DODGE,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_AGILITY_MOD,
      modifyProperty: true,
      modifierAction: OperationAction.DIVISION,
      modifierValue: 2
    }
  },
  {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target: ALL_PROPERTIES.STATS_MOVE,
    baseFormula: true,
    action: OperationAction.SUM,
    value: 2
  },
  ...[
    {
      id: uuidv4(),
      description: BASE_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.STATS_CRITICAL,
      baseFormula: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_LUCK_MOD,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 5
      }
    },
    {
      id: uuidv4(),
      description: BASE_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.STATS_CRITICAL,
      baseFormula: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_CRITICAL,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 10
      }
    }
  ],
  ...[
    {
      id: uuidv4(),
      description: BASE_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.STATS_PHYSICAL_DEFENSE,
      baseFormula: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_VITALITY_MOD,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    },
    {
      id: uuidv4(),
      description: BASE_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.STATS_PHYSICAL_DEFENSE,
      baseFormula: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_PHYSICAL_DEFENSE,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    }
  ],
  {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target: ALL_PROPERTIES.STATS_PHYSICAL_DICE,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.STATS_PHYSICAL_DEFENSE,
      modifyProperty: true,
      modifierAction: OperationAction.DIVISION,
      modifierValue: 2
    }
  },
  ...[
    {
      id: uuidv4(),
      description: BASE_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.STATS_MAGICAL_DEFENSE,
      baseFormula: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_SPIRIT_MOD,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    },
    {
      id: uuidv4(),
      description: BASE_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.STATS_MAGICAL_DEFENSE,
      baseFormula: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_MAGICAL_DEFENSE,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    }
  ],
  {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target: ALL_PROPERTIES.STATS_MAGICAL_DICE,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.STATS_MAGICAL_DEFENSE,
      modifyProperty: true,
      modifierAction: OperationAction.DIVISION,
      modifierValue: 3
    }
  }
]

const DEFAULT_CHARACTER_RANGES: IOperation[] = [
  ...[RANGE_PROPERTIES.RANGE_UNARMED, RANGE_PROPERTIES.RANGE_MELEE].map((target) => {
    return {
      id: uuidv4(),
      description: BASE_FORMULA_DESCRIPTION,
      target,
      baseFormula: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      value: 1
    }
  }),
  ...[RANGE_PROPERTIES.RANGE_RANGED, RANGE_PROPERTIES.RANGE_FIREARM].map((target) => {
    const strippedRange = target.split('_').pop() ?? ''
    const expertiseToUse = Object.values(EXPERTISE_DEXTERITY_PROPERTIES).find(expertise => expertise.includes(strippedRange)) as keyof typeof EXPERTISE_DEXTERITY_PROPERTIES
    return {
      id: uuidv4(),
      description: BASE_FORMULA_DESCRIPTION,
      target,
      baseFormula: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: EXPERTISE_DEXTERITY_PROPERTIES[expertiseToUse],
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 25
      }
    }
  })
]

const DEFAULT_CHARACTER_HITS: IOperation[] = [
  ...[HIT_PROPERTIES.HIT_UNARMED, HIT_PROPERTIES.HIT_MELEE].map((target) => {
    const strippedHit = target.split('_').pop() ?? ''
    const expertiseToUse = Object.values(EXPERTISE_STRENGTH_PROPERTIES).find(expertise => expertise.includes(strippedHit)) as keyof typeof EXPERTISE_STRENGTH_PROPERTIES
    return [
      {
        id: uuidv4(),
        description: BASE_FORMULA_DESCRIPTION,
        target,
        baseFormula: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ATTRIBUTES_MOD_PROPERTIES.ATTRIBUTES_STRENGTH_MOD,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: BASE_FORMULA_DESCRIPTION,
        target,
        baseFormula: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: EXPERTISE_STRENGTH_PROPERTIES[expertiseToUse],
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 5
        }
      }
    ]
  }).flat(),
  ...[HIT_PROPERTIES.HIT_RANGED, HIT_PROPERTIES.HIT_FIREARM].map((target) => {
    const strippedBonus = target.split('_').pop() ?? ''
    const expertiseToUse = Object.values(EXPERTISE_DEXTERITY_PROPERTIES).find(expertise => expertise.includes(strippedBonus)) as keyof typeof EXPERTISE_DEXTERITY_PROPERTIES
    return [
      {
        id: uuidv4(),
        description: BASE_FORMULA_DESCRIPTION,
        target,
        baseFormula: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ATTRIBUTES_MOD_PROPERTIES.ATTRIBUTES_DEXTERITY_MOD,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: BASE_FORMULA_DESCRIPTION,
        target,
        baseFormula: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: EXPERTISE_DEXTERITY_PROPERTIES[expertiseToUse],
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 5
        }
      }
    ]
  }).flat()
]

const DEFAULT_CHARACTER_PHYSICAL_BONUSES: IOperation[] = [
  ...[PHYSICIAL_BONUS_PROPERTIES.PHYSICIAL_BONUS_UNARMED, PHYSICIAL_BONUS_PROPERTIES.PHYSICIAL_BONUS_MELEE].map((target) => {
    const strippedBonus = target.split('_').pop() ?? ''
    const expertiseToUse = Object.values(EXPERTISE_STRENGTH_PROPERTIES).find(expertise => expertise.includes(strippedBonus)) as keyof typeof EXPERTISE_STRENGTH_PROPERTIES
    return [
      {
        id: uuidv4(),
        description: BASE_FORMULA_DESCRIPTION,
        target,
        baseFormula: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ATTRIBUTES_MOD_PROPERTIES.ATTRIBUTES_STRENGTH_MOD,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: BASE_FORMULA_DESCRIPTION,
        target,
        baseFormula: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: EXPERTISE_STRENGTH_PROPERTIES[expertiseToUse],
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 10
        }
      }
    ]
  }).flat(),
  ...[PHYSICIAL_BONUS_PROPERTIES.PHYSICIAL_BONUS_RANGED, PHYSICIAL_BONUS_PROPERTIES.PHYSICIAL_BONUS_FIREARM].map((target) => {
    const strippedBonus = target.split('_').pop() ?? ''
    const expertiseToUse = Object.values(EXPERTISE_DEXTERITY_PROPERTIES).find(expertise => expertise.includes(strippedBonus)) as keyof typeof EXPERTISE_DEXTERITY_PROPERTIES
    return [
      {
        id: uuidv4(),
        description: BASE_FORMULA_DESCRIPTION,
        target,
        baseFormula: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ATTRIBUTES_MOD_PROPERTIES.ATTRIBUTES_DEXTERITY_MOD,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: BASE_FORMULA_DESCRIPTION,
        target,
        baseFormula: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: EXPERTISE_DEXTERITY_PROPERTIES[expertiseToUse],
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 10
        }
      }
    ]
  }).flat()
]

const DEFAULT_CHARACTER_MAGICAL_BONUSES: IOperation[] = Object.values(MAGICAL_BONUS_PROPERTIES).map((target) => {
  const strippedBonus = target.split('_').pop() ?? ''
  const expertiseToUse = Object.values(EXPERTISE_SPIRIT_PROPERTIES).find(expertise => expertise.includes(strippedBonus)) as keyof typeof EXPERTISE_SPIRIT_PROPERTIES
  return {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: EXPERTISE_SPIRIT_PROPERTIES[expertiseToUse],
      modifyProperty: true,
      modifierAction: OperationAction.DIVISION,
      modifierValue: 7
    }
  }
})

const DEFAULT_CHARACTER_STRENGTH_EXPERTISES: IOperation[] = Object.values(EXPERTISE_STRENGTH_PROPERTIES).map((target) => {
  return {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_STRENGTH_MOD,
      modifyProperty: false
    }
  }
})

const DEFAULT_CHARACTER_AGILITY_EXPERTISES: IOperation[] = Object.values(EXPERTISE_AGILITY_PROPERTIES).map((target) => {
  return {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_AGILITY_MOD,
      modifyProperty: false
    }
  }
})

const DEFAULT_CHARACTER_DEXTERITY_EXPERTISES: IOperation[] = Object.values(EXPERTISE_DEXTERITY_PROPERTIES).map((target) => {
  return {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_DEXTERITY_MOD,
      modifyProperty: false
    }
  }
})

const DEFAULT_CHARACTER_VITALITY_EXPERTISES: IOperation[] = Object.values(EXPERTISE_VITALITY_PROPERTIES).map((target) => {
  return {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_VITALITY_MOD,
      modifyProperty: false
    }
  }
})

const DEFAULT_CHARACTER_SPIRIT_EXPERTISES: IOperation[] = Object.values(EXPERTISE_SPIRIT_PROPERTIES).map((target) => {
  return {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_SPIRIT_MOD,
      modifyProperty: false
    }
  }
})

const DEFAULT_CHARACTER_LUCK_EXPERTISES: IOperation[] = Object.values(EXPERTISE_LUCK_PROPERTIES).map((target) => {
  return {
    id: uuidv4(),
    description: BASE_FORMULA_DESCRIPTION,
    target,
    baseFormula: true,
    action: OperationAction.SUM,
    isBasedOnProperty: true,
    basedOnProperty: {
      type: ALL_PROPERTIES.ATTRIBUTES_LUCK_MOD,
      modifyProperty: false
    }
  }
})

const DEFAULT_CHARACTER_SPECIAL_EXPERTISES: IOperation[] = [
  ...[
    {
      id: uuidv4(),
      description: BASE_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_ACROBATICS,
      baseFormula: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_AGILITY_MOD,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    },
    {
      id: uuidv4(),
      description: BASE_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_ACROBATICS,
      baseFormula: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_DEXTERITY_MOD,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    }
  ],
  ...[
    {
      id: uuidv4(),
      description: BASE_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_STEAL,
      baseFormula: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_AGILITY_MOD,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    },
    {
      id: uuidv4(),
      description: BASE_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_STEAL,
      baseFormula: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_DEXTERITY_MOD,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    }
  ]
]

const DEFAULT_CHARACTER_BASE_VALUES: IOperation[] = [
  /// GENERAL PROPERTIES
  ...[
    ...[GENERAL_PROPERTIES.GENERAL_GRADE, GENERAL_PROPERTIES.GENERAL_LEVEL].map((target) => {
      return {
        id: uuidv4(),
        description: BASE_VALUE_DESCRIPTION,
        target,
        baseValue: true,
        action: OperationAction.SUM,
        value: 1
      }
    }),
    ...[
      GENERAL_PROPERTIES.GENERAL_EXP,
      GENERAL_PROPERTIES.GENERAL_NEXT,
      GENERAL_PROPERTIES.GENERAL_ENCHANCEMENTS,
      GENERAL_PROPERTIES.GENERAL_JP,
      GENERAL_PROPERTIES.GENERAL_GOLD
    ].map((target) => {
      return {
        id: uuidv4(),
        description: BASE_VALUE_DESCRIPTION,
        target,
        baseValue: true,
        action: OperationAction.SUM,
        value: 0
      }
    }),
    ...[GENERAL_PROPERTIES.GENERAL_ATUAL_SKILL_REGEN, GENERAL_PROPERTIES.GENERAL_MAX_SKILL_REGEN].map((target) => {
      return {
        id: uuidv4(),
        description: BASE_VALUE_DESCRIPTION,
        target,
        baseValue: true,
        action: OperationAction.SUM,
        value: 36
      }
    })
  ],
  // CONDITIONS PROPERTIES
  ...[
    ...[
      CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HP,
      CONDITIONS_PROPERTIES.CONDITIONS_MAX_HP,
      CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_SP,
      CONDITIONS_PROPERTIES.CONDITIONS_MAX_SP
    ].map((target) => {
      return {
        id: uuidv4(),
        description: BASE_VALUE_DESCRIPTION,
        target,
        baseValue: true,
        action: OperationAction.SUM,
        value: 1
      }
    }),
    ...[
      CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_MP,
      CONDITIONS_PROPERTIES.CONDITIONS_MAX_MP
    ].map((target) => {
      return {
        id: uuidv4(),
        description: BASE_VALUE_DESCRIPTION,
        target,
        baseValue: true,
        action: OperationAction.SUM,
        value: 0
      }
    }),
    ...[
      CONDITIONS_PROPERTIES.CONDITIONS_ATUAL_HUNGER,
      CONDITIONS_PROPERTIES.CONDITIONS_MAX_HUNGER
    ].map((target) => {
      return {
        id: uuidv4(),
        description: BASE_VALUE_DESCRIPTION,
        target,
        baseValue: true,
        action: OperationAction.SUM,
        value: 10
      }
    })
  ],
  ...Object.values(ATTRIBUTES_PROPERTIES).map((target) => {
    return {
      id: uuidv4(),
      description: BASE_VALUE_DESCRIPTION,
      target,
      baseValue: true,
      action: OperationAction.SUM,
      value: 0
    }
  }),
  ...Object.values(EXPERTISE_PROPERTIES).map((target) => {
    return {
      id: uuidv4(),
      description: BASE_VALUE_DESCRIPTION,
      target,
      baseValue: true,
      action: OperationAction.SUM,
      value: 0
    }
  })
]

export const DEFAULT_CHARACTER_FORMULAS: IOperation[] = [
  ...DEFAULT_CHARACTER_MODIFITERS,
  ...DEFAULT_CHARACTER_STATS,
  ...DEFAULT_CHARACTER_RANGES,
  ...DEFAULT_CHARACTER_HITS,
  ...DEFAULT_CHARACTER_PHYSICAL_BONUSES,
  ...DEFAULT_CHARACTER_MAGICAL_BONUSES,
  ...DEFAULT_CHARACTER_STRENGTH_EXPERTISES,
  ...DEFAULT_CHARACTER_AGILITY_EXPERTISES,
  ...DEFAULT_CHARACTER_DEXTERITY_EXPERTISES,
  ...DEFAULT_CHARACTER_VITALITY_EXPERTISES,
  ...DEFAULT_CHARACTER_SPIRIT_EXPERTISES,
  ...DEFAULT_CHARACTER_LUCK_EXPERTISES,
  ...DEFAULT_CHARACTER_SPECIAL_EXPERTISES,
  ...DEFAULT_CHARACTER_BASE_VALUES
]
