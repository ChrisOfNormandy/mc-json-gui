import { v4 } from 'uuid';
import BlockBase from './BlockBase';
import ModCacher from '../ModCacher';
import { BlockModel, BlockState, ItemModel, ManagedContentData, Recipe } from '../types';
import ItemBase from '../items/ItemBase';

export default class WallDef<M extends ModCacher> extends BlockBase<M, ItemBase<M>> {

    getName() {
        return `${this.name}_wall`;
    }

    private _blockState(): ManagedContentData<BlockState> {
        const postModel = `${this.mod.getName()}:block/${this.getName()}_post`;
        const sideModel = `${this.mod.getName()}:block/${this.getName()}_side`;
        const tallSideModel = `${this.mod.getName()}:block/${this.getName()}_side_tall`;

        return {
            data: {
                multipart: [
                    {
                        when: {
                            up: true
                        },
                        apply: {
                            model: postModel
                        }
                    },
                    {
                        when: {
                            north: 'low'
                        },
                        apply: {
                            model: sideModel,
                            uvlock: true
                        }
                    },
                    {
                        when: {
                            east: 'low'
                        },
                        apply: {
                            model: sideModel,
                            y: 90,
                            uvlock: true
                        }
                    },
                    {
                        when: {
                            south: 'low'
                        },
                        apply: {
                            model: sideModel,
                            y: 180,
                            uvlock: true
                        }
                    },
                    {
                        when: {
                            west: 'low'
                        },
                        apply: {
                            model: sideModel,
                            y: 270,
                            uvlock: true
                        }
                    },
                    {
                        when: {
                            north: 'tall'
                        },
                        apply: {
                            model: tallSideModel,
                            uvlock: true
                        }
                    },
                    {
                        when: {
                            east: 'tall'
                        },
                        apply: {
                            model: tallSideModel,
                            y: 90,
                            uvlock: true
                        }
                    },
                    {
                        when: {
                            south: 'tall'
                        },
                        apply: {
                            model: tallSideModel,
                            y: 180,
                            uvlock: true
                        }
                    },
                    {
                        when: {
                            west: 'tall'
                        },
                        apply: {
                            model: tallSideModel,
                            y: 270,
                            uvlock: true
                        }
                    }
                ]
            }
        };
    }

    private _modelInventory(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_inventory.json`),
            data: {
                parent: 'minecraft:block/wall_inventory',
                textures: {
                    wall: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _modelPost(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_post.json`),
            data: {
                parent: 'minecraft:block/template_post',
                textures: {
                    wall: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _modelSideTall(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_side_tall.json`),
            data: {
                parent: 'minecraft:block/template_side_tall',
                textures: {
                    wall: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _modelSide(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_side.json`),
            data: {
                parent: 'minecraft:block/template_side',
                textures: {
                    wall: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _modelItem(): ManagedContentData<ItemModel> {
        return {
            data: {
                parent: `${this.mod.getName()}:block/${this.getName()}_inventory`
            }
        };
    }

    private _recipe(): ManagedContentData<Recipe> {
        return {
            data: {
                type: 'minecraft:crafting_shaped',
                pattern: [
                    '###',
                    '###'
                ],
                key: {
                    '#': {
                        'item': `${this.mod.getName()}:${this.name}`
                    }
                },
                result: {
                    item: `${this.mod.getName()}:${this.getName()}`,
                    count: 6
                }
            }
        };
    }

    /**
     *
     * @param mod
     * @param name Do not include "" in the name
     */
    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'wall', id || v4());

        this.blockState.set(this._blockState.bind(this));
        this.model.set(
            this._modelInventory.bind(this),
            this._modelPost.bind(this),
            this._modelSideTall.bind(this),
            this._modelSide.bind(this)
        );
        this.item.model.set(this._modelItem.bind(this));
        this.recipe.set(this._recipe.bind(this));
    }
}