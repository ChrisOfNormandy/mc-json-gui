import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import BlockBase from './IBlock';

export default class DoorDef<M extends ModCacher> extends BlockBase<M> {

    getName() {
        return `${this.name}_door`;
    }

    _blockState() {

        const bottom = `${this.mod.getName()}:block/${this.getName()}_bottom`;
        const bottomHinge = `${this.mod.getName()}:block/${this.getName()}_bottom_hinge`;
        const top = `${this.mod.getName()}:block/${this.getName()}_top`;
        const topHinge = `${this.mod.getName()}:block/${this.getName()}_top_hinge`;

        return {
            variants: {
                'facing=east,half=lower,hinge=left,open=false': {
                    model: bottom
                },
                'facing=east,half=lower,hinge=left,open=true': {
                    model: bottomHinge,
                    y: 90
                },
                'facing=east,half=lower,hinge=right,open=false': {
                    model: bottomHinge
                },
                'facing=east,half=lower,hinge=right,open=true': {
                    model: bottom,
                    y: 270
                },
                'facing=east,half=upper,hinge=left,open=false': {
                    model: top
                },
                'facing=east,half=upper,hinge=left,open=true': {
                    model: topHinge,
                    y: 90
                },
                'facing=east,half=upper,hinge=right,open=false': {
                    model: topHinge
                },
                'facing=east,half=upper,hinge=right,open=true': {
                    model: top,
                    y: 270
                },
                'facing=north,half=lower,hinge=left,open=false': {
                    model: bottom,
                    y: 270
                },
                'facing=north,half=lower,hinge=left,open=true': {
                    model: bottomHinge
                },
                'facing=north,half=lower,hinge=right,open=false': {
                    model: bottomHinge,
                    y: 270
                },
                'facing=north,half=lower,hinge=right,open=true': {
                    model: bottom,
                    y: 180
                },
                'facing=north,half=upper,hinge=left,open=false': {
                    model: top,
                    y: 270
                },
                'facing=north,half=upper,hinge=left,open=true': {
                    model: topHinge
                },
                'facing=north,half=upper,hinge=right,open=false': {
                    model: topHinge,
                    y: 270
                },
                'facing=north,half=upper,hinge=right,open=true': {
                    model: top,
                    y: 180
                },
                'facing=south,half=lower,hinge=left,open=false': {
                    model: bottom,
                    y: 90
                },
                'facing=south,half=lower,hinge=left,open=true': {
                    model: bottomHinge,
                    y: 180
                },
                'facing=south,half=lower,hinge=right,open=false': {
                    model: bottomHinge,
                    y: 90
                },
                'facing=south,half=lower,hinge=right,open=true': {
                    model: bottom
                },
                'facing=south,half=upper,hinge=left,open=false': {
                    model: top,
                    y: 90
                },
                'facing=south,half=upper,hinge=left,open=true': {
                    model: topHinge,
                    y: 180
                },
                'facing=south,half=upper,hinge=right,open=false': {
                    model: topHinge,
                    y: 90
                },
                'facing=south,half=upper,hinge=right,open=true': {
                    model: top
                },
                'facing=west,half=lower,hinge=left,open=false': {
                    model: bottom,
                    y: 180
                },
                'facing=west,half=lower,hinge=left,open=true': {
                    model: bottomHinge,
                    y: 270
                },
                'facing=west,half=lower,hinge=right,open=false': {
                    model: bottomHinge,
                    y: 180
                },
                'facing=west,half=lower,hinge=right,open=true': {
                    model: bottom,
                    y: 90
                },
                'facing=west,half=upper,hinge=left,open=false': {
                    model: top,
                    y: 180
                },
                'facing=west,half=upper,hinge=left,open=true': {
                    model: topHinge,
                    y: 270
                },
                'facing=west,half=upper,hinge=right,open=false': {
                    model: topHinge,
                    y: 180
                },
                'facing=west,half=upper,hinge=right,open=true': {
                    model: top,
                    y: 90
                }
            }
        };
    }

    _modelBottom() {
        return {
            parent: 'minecraft:block/door_bottom',
            textures: {
                top: `${this.mod.getName()}:block/${this.getName()}_top`,
                bottom: `${this.mod.getName()}:block/${this.getName()}_bottom`
            }
        };
    }

    _modelBottomHinge() {
        return {
            parent: 'minecraft:block/door_bottom_rh',
            textures: {
                top: `${this.mod.getName()}:block/${this.getName()}_top`,
                bottom: `${this.mod.getName()}:block/${this.getName()}_bottom`
            }
        };
    }

    _modelTop() {
        return {
            parent: 'minecraft:block/door_top',
            textures: {
                top: `${this.mod.getName()}:block/${this.getName()}_top`,
                bottom: `${this.mod.getName()}:block/${this.getName()}_bottom`
            }
        };
    }

    _modelTopHinge() {
        return {
            parent: 'minecraft:block/door_top_rh',
            textures: {
                top: `${this.mod.getName()}:block/${this.getName()}_top`,
                bottom: `${this.mod.getName()}:block/${this.getName()}_bottom`
            }
        };
    }

    _itemModel() {
        return {
            parent: 'minecraft:item/generated',
            textures: {
                layer0: `${this.mod.getName()}:block/${this.getName()}`
            }
        };
    }

    _lootTable() {
        return {
            type: 'minecraft:block',
            pools: [
                {
                    rolls: 1.0,
                    bonus_rolls: 0.0,
                    entries: [
                        {
                            type: 'minecraft:item',
                            conditions: [
                                {
                                    condition: 'minecraft:block_state_property',
                                    block: `${this.mod.getName()}:${this.getName()}`,
                                    properties: {
                                        half: 'lower'
                                    }
                                }
                            ],
                            name: `${this.mod.getName()}:${this.getName()}`
                        }
                    ],
                    conditions: [
                        {
                            condition: 'minecraft:survives_explosion'
                        }
                    ]
                }
            ]
        };
    }

    _recipe() {
        return {
            type: 'minecraft:crafting_shaped',
            group: 'wooden_door',
            pattern: [
                '##',
                '##',
                '##'
            ],
            key: {
                '#': {
                    'item': `${this.mod.getName()}:${this.name}`
                }
            },
            result: {
                item: `${this.mod.getName()}:${this.getName()}`,
                count: 3
            }
        };
    }

    blockState() {
        return [
            new File([JSON.stringify(this._blockState(), null, 4)], this.mod.paths.blockStates(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    model() {
        return [
            new File([JSON.stringify(this._modelBottom(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_bottom.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._modelBottomHinge(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_bottom_hinge.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._modelTop(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_top.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._modelTopHinge(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_top_hinge.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._itemModel(), null, 4)], this.mod.paths.itemModels(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    lootTable() {
        return [
            new File([JSON.stringify(this._lootTable(), null, 4)], this.mod.paths.blocksLootTables(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    recipe() {
        return [
            new File([JSON.stringify(this._recipe(), null, 4)], this.mod.paths.recipes(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'door', id || v4());
    }
}