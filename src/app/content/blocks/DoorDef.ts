import { BlockModel, BlockState, ItemModel, LootTable, ManagedContentData, Recipe } from '../types';
import { v4 } from 'uuid';
import BlockBase from './BlockBase';
import ItemBase from '../items/ItemBase';
import ModCacher from '../ModCacher';

export default class DoorDef<M extends ModCacher> extends BlockBase<M, ItemBase<M>> {

    getName() {
        return `${this.name}_door`;
    }

    private _blockState(): ManagedContentData<BlockState> {
        const bottom = `${this.mod.getName()}:block/${this.getName()}_bottom`;
        const bottomHinge = `${this.mod.getName()}:block/${this.getName()}_bottom_hinge`;
        const top = `${this.mod.getName()}:block/${this.getName()}_top`;
        const topHinge = `${this.mod.getName()}:block/${this.getName()}_top_hinge`;

        return {
            data: {
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
            }
        };
    }

    private _modelBottom(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_bottom.json`),
            data: {
                parent: 'minecraft:block/door_bottom',
                textures: {
                    top: `${this.mod.getName()}:block/${this.getName()}_top`,
                    bottom: `${this.mod.getName()}:block/${this.getName()}_bottom`
                }
            }
        };
    }

    private _modelBottomHinge(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_bottom_hinge.json`),
            data: {
                parent: 'minecraft:block/door_bottom_rh',
                textures: {
                    top: `${this.mod.getName()}:block/${this.getName()}_top`,
                    bottom: `${this.mod.getName()}:block/${this.getName()}_bottom`
                }
            }
        };
    }

    private _modelTop(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_top.json`),
            data: {
                parent: 'minecraft:block/door_top',
                textures: {
                    top: `${this.mod.getName()}:block/${this.getName()}_top`,
                    bottom: `${this.mod.getName()}:block/${this.getName()}_bottom`
                }
            }
        };
    }

    private _modelTopHinge(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_top_hinge.json`),
            data: {
                parent: 'minecraft:block/door_top_rh',
                textures: {
                    top: `${this.mod.getName()}:block/${this.getName()}_top`,
                    bottom: `${this.mod.getName()}:block/${this.getName()}_bottom`
                }
            }
        };
    }

    private _itemModel(): ManagedContentData<ItemModel> {
        return {
            data: {
                parent: 'minecraft:item/generated',
                textures: {
                    layer0: `${this.mod.getName()}:block/${this.getName()}`
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
            }
        };
    }

    private _recipe(): ManagedContentData<Recipe> {
        return {
            data: {
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
            }
        };
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'door', id || v4());

        this.blockState.set(this._blockState.bind(this));
        this.model.set(
            this._modelBottom.bind(this),
            this._modelBottomHinge.bind(this),
            this._modelTop.bind(this),
            this._modelTopHinge.bind(this)
        );
        this.item.model.set(this._itemModel.bind(this));
        this.lootTable.set(this._lootTable.bind(this));
        this.recipe.set(this._recipe.bind(this));
    }
}