import { v4 as uuidv4 } from 'uuid'
import { ALL_PROPERTIES, OperationAction, type IOperation } from '~/types'

const DEFAULT_FORMULA_DESCRIPTION = 'Fórmula Padrão'

export const DEFAULT_CHARACTER_FORMULAS: IOperation[] = [
  // MODIFIERS
  ...[
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.ATTRIBUTES_MOD_STRENGTH,
      default: true,
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
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.ATTRIBUTES_MOD_AGILITY,
      default: true,
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
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
      default: true,
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
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.ATTRIBUTES_MOD_VITALITY,
      default: true,
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
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
      default: true,
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
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.ATTRIBUTES_MOD_LUCK,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_LUCK,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    }
  ],
  // STATS
  ...[
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.STATS_INITIATIVE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_AGILITY,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.STATS_DODGE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_AGILITY,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 2
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.STATS_MOVE,
      default: true,
      action: OperationAction.SUM,
      value: 2
    },
    ...[
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.STATS_CRITICAL,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_LUCK,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 5
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.STATS_CRITICAL,
        default: true,
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
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.STATS_PHYSICAL_DEFENSE,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_VITALITY,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.STATS_PHYSICAL_DEFENSE,
        default: true,
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
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.STATS_PHYSICAL_DICE,
      default: true,
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
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.STATS_MAGICAL_DEFENSE,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.STATS_MAGICAL_DEFENSE,
        default: true,
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
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.STATS_MAGICAL_DICE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.STATS_MAGICAL_DEFENSE,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 3
      }
    }
  ],
  // RANGES
  ...[
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.RANGE_UNARMED,
      default: true,
      action: OperationAction.SUM,
      value: 1
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.RANGE_MELEE,
      default: true,
      action: OperationAction.SUM,
      value: 1
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.RANGE_RANGED,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_RANGED_WEAPON,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 25
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.RANGE_FIREARM,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_FIREARM,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 25
      }
    }
  ],
  // HITS
  ...[
    ...[
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.HIT_UNARMED,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.HIT_UNARMED,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.EXPERTISE_UNARMED_COMBAT,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 5
        }
      }
    ],
    ...[
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.HIT_MELEE,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.HIT_MELEE,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.EXPERTISE_MELEE_WEAPONS,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 5
        }
      }
    ],
    ...[
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.HIT_RANGED,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.HIT_RANGED,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.EXPERTISE_RANGED_WEAPON,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 5
        }
      }
    ],
    ...[
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.HIT_FIREARM,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.HIT_FIREARM,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.EXPERTISE_FIREARM,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 5
        }
      }
    ]
  ],
  // PHYSICAL BONUSES
  ...[
    ...[
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.PHYSICIAL_BONUS_UNARMED,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_STRENGTH,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.PHYSICIAL_BONUS_UNARMED,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.EXPERTISE_UNARMED_COMBAT,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 10
        }
      }
    ],
    ...[
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.PHYSICIAL_BONUS_MELEE,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_STRENGTH,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.PHYSICIAL_BONUS_MELEE,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.EXPERTISE_MELEE_WEAPONS,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 10
        }
      }
    ],
    ...[
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.PHYSICIAL_BONUS_RANGED,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.PHYSICIAL_BONUS_RANGED,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.EXPERTISE_RANGED_WEAPON,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 10
        }
      }
    ],
    ...[
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.PHYSICIAL_BONUS_FIREARM,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.PHYSICIAL_BONUS_FIREARM,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.EXPERTISE_FIREARM,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 10
        }
      }
    ]
  ],
  // MAGICAL BONUSES
  ...[
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_WATER,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_WATER_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_ETHEREAL,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_ETHEREAL_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_FIRE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_FIRE_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_ICE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_ICE_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_MOON,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_MOON_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_LIGHT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_LIGHT_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_MAGICK,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_MAGICK_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_NATURE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_NATURE_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_SUN,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_SUN_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_SOUL,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_SOUL_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_EARTH,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_EARTH_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_DARKNESS,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_DARKNESS_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_THUNDER,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_THUNDER_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.MAGICAL_BONUS_WIND,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.EXPERTISE_WIND_ELEMENT,
        modifyProperty: true,
        modifierAction: OperationAction.DIVISION,
        modifierValue: 7
      }
    }
  ],
  // STRENGTH EXPERTISES
  ...[
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_MELEE_WEAPONS,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_STRENGTH,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_MECHANICAL_WEAPONS,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_STRENGTH,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_WILLPOWER,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_STRENGTH,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_FORGE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_STRENGTH,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_IMMOBILIZATION,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_STRENGTH,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_UNARMED_COMBAT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_STRENGTH,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_MINING,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_STRENGTH,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_MOUNT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_STRENGTH,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_TRACK,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_STRENGTH,
        modifyProperty: false
      }
    }

  ],
  // AGILITY EXPERTISES
  ...[
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_MISLEAD,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_AGILITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_DISGUISE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_AGILITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_DUAL_WIELD,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_AGILITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_HIDE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_AGILITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_DODGE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_AGILITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_ESCAPE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_AGILITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_JUMP,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_AGILITY,
        modifyProperty: false
      }
    }
  ],
  // DEXTERITY EXPERTISES
  ...[
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_AGRICULTURE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_RANGED_WEAPON,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_FIREARM,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_MASONRY,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_THROW_OBJECT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_CLIMB,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_BUILD_BOAT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_SWIM,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_PILOTING,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_SET_TRAP,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_FIRST_AID,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
        modifyProperty: false
      }
    }

  ],
  // VITALITY EXPERTISES
  ...[
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_CHARISMA,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_VITALITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_PHYSICAL_DEFENSE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_VITALITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_LEADERSHIP,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_VITALITY,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_SURVIVAL,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_VITALITY,
        modifyProperty: false
      }
    }

  ],
  // SPIRIT EXPERTISES
  ...[
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_AID,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_BLUFF,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_CONJURATION,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_MAGICAL_DEFENSE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_WATER_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_ETHEREAL_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_FIRE_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_ICE_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_MOON_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_LIGHT_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_MAGICK_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_NATURE_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_SUN_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_SOUL_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_EARTH_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_DARKNESS_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_THUNDER_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_WIND_ELEMENT,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_INTERPRET_DREAMS,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_INTERROGATE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_INTIMIDATE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_LANGUAGE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_CURSE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_MYSTICISM,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_NEGOTIATE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_PERCEPTION,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_PREDICT_WEATHER,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_TACTICS,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_SPIRIT,
        modifyProperty: false
      }
    }

  ],
  // LUCK EXPERTISES
  ...[
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_CRITICAL,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_LUCK,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_PLAY_CALCULATE,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_LUCK,
        modifyProperty: false
      }
    },
    {
      id: uuidv4(),
      description: DEFAULT_FORMULA_DESCRIPTION,
      target: ALL_PROPERTIES.EXPERTISE_MAGICK_FIND,
      default: true,
      action: OperationAction.SUM,
      isBasedOnProperty: true,
      basedOnProperty: {
        type: ALL_PROPERTIES.ATTRIBUTES_MOD_LUCK,
        modifyProperty: false
      }
    }
  ],
  // SPECIAL EXPERTISES
  ...[
    ...[
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.EXPERTISE_ACROBATICS,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_AGILITY,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.EXPERTISE_ACROBATICS,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      }
    ],
    ...[
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.EXPERTISE_STEAL,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_AGILITY,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      },
      {
        id: uuidv4(),
        description: DEFAULT_FORMULA_DESCRIPTION,
        target: ALL_PROPERTIES.EXPERTISE_STEAL,
        default: true,
        action: OperationAction.SUM,
        isBasedOnProperty: true,
        basedOnProperty: {
          type: ALL_PROPERTIES.ATTRIBUTES_MOD_DEXTERITY,
          modifyProperty: true,
          modifierAction: OperationAction.DIVISION,
          modifierValue: 2
        }
      }
    ]
  ]
]
