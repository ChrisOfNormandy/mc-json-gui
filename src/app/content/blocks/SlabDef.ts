import { v4 } from 'uuid';
import BlockBase from './IBlock';
import ModCacher from '../ModCacher';

export default class SlabDef<M extends ModCacher> extends BlockBase<M> {

    getName() {
        return `${this.name}_slab`;
    }

    _blockState() {
        return {
            variants: {
                'type=bottom': {
                    model: `${this.mod.getName()}:block/${this.getName()}`
                },
                'type=top': {
                    model: `${this.mod.getName()}:block/${this.getName()}_top`
                },
                'type=double': {
                    model: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    _model() {
        return {
            'parent': 'minecraft:block/slab',
            'textures': {
                'bottom': `${this.mod.getName()}:block/${this.name}`,
                'top': `${this.mod.getName()}:block/${this.name}`,
                'side': `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _modelTop() {
        return {
            'parent': 'minecraft:block/slab_top',
            'textures': {
                'bottom': `${this.mod.getName()}:block/${this.name}`,
                'top': `${this.mod.getName()}:block/${this.name}`,
                'side': `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _modelItem() {
        return {
            parent: `${this.mod.getName()}:block/${this.getName()}`
        };
    }

    _recipe() {
        return {
            type: 'minecraft:crafting_shaped',
            group: 'wooden',
            pattern: [
                '###'
            ],
            key: {
                '#': {
                    item: `${this.mod.getName()}:${this.name}`
                }
            },
            result: {
                item: `${this.mod.getName()}:${this.getName()}`,
                count: 6
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
                            functions: [
                                {
                                    function: 'minecraft:set_count',
                                    conditions: [
                                        {
                                            condition: 'minecraft:block_state_property',
                                            block: `${this.mod.getName()}:${this.getName()}`,
                                            properties: {
                                                type: 'double'
                                            }
                                        }
                                    ],
                                    count: 2.0,
                                    add: false
                                },
                                {
                                    function: 'minecraft:explosion_decay'
                                }
                            ],
                            name: `${this.mod.getName()}:${this.getName()}`
                        }
                    ]
                }
            ]
        };
    }

    blockState() {
        return [
            new File([JSON.stringify(this._blockState(), null, 4)], this.mod.paths.blockStates(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    model() {
        return [
            new File([JSON.stringify(this._model(), null, 4)], this.mod.paths.blockModels(`${this.getName()}.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._modelTop(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_top.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._modelItem(), null, 4)], this.mod.paths.itemModels(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    recipe() {
        return [
            new File([JSON.stringify(this._recipe(), null, 4)], this.mod.paths.recipes(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    lootTable() {
        return [
            new File([JSON.stringify(this._lootTable(), null, 4)], this.mod.paths.blocksLootTables(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    /**
     *
     * @param mod
     * @param name Do not include "" in the name
     */
    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'slab', id || v4());
    }
}