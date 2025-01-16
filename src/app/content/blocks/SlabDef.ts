import { v4 } from 'uuid';
import BlockBase from './BlockBase';
import ModCacher from '../ModCacher';
import { BlockModel, BlockState, LootTable, ManagedContentData, Recipe } from '../types';
import ItemBase from '../items/ItemBase';

export default class SlabDef<M extends ModCacher> extends BlockBase<M, ItemBase<M>> {

    getName() {
        return `${this.name}_slab`;
    }

    private _blockState(): ManagedContentData<BlockState> {
        return {
            data: {
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
            }
        };
    }

    private _model(): ManagedContentData<BlockModel> {
        return {
            data: {
                parent: 'minecraft:block/slab',
                textures: {
                    bottom: `${this.mod.getName()}:block/${this.name}`,
                    top: `${this.mod.getName()}:block/${this.name}`,
                    side: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _modelTop(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_top.json`),
            data: {
                parent: 'minecraft:block/slab_top',
                textures: {
                    bottom: `${this.mod.getName()}:block/${this.name}`,
                    top: `${this.mod.getName()}:block/${this.name}`,
                    side: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _recipe(): ManagedContentData<Recipe> {
        return {
            data: {
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
            }
        };
    }

    private _lootTable(): ManagedContentData<LootTable> {
        return {
            data: {
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
            }
        };
    }

    /**
     *
     * @param mod
     * @param name Do not include "" in the name
     */
    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'slab', id || v4());

        this.blockState.add(this._blockState.bind(this));
        this.model.set(
            this._model.bind(this),
            this._modelTop.bind(this)
        );
        this.lootTable.set(this._lootTable.bind(this));
        this.recipe.set(this._recipe.bind(this));
    }
}