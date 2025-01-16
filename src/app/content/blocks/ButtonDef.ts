import { v4 } from 'uuid';
import BlockBase from './BlockBase';
import ModCacher from '../ModCacher';
import { BlockModel, BlockState, ItemModel, ManagedContentData, Recipe } from '../types';
import ItemBase from '../items/ItemBase';

export default class ButtonDef<M extends ModCacher> extends BlockBase<M, ItemBase<M>> {

    getName() {
        return `${this.name}_button`;
    }

    private _blockState(): ManagedContentData<BlockState> {
        const buttonModel = `${this.mod.getName()}:block/${this.getName()}`;
        const pressedModel = buttonModel + '_pressed';

        return {
            data: {
                variants: {
                    'face=ceiling,facing=east,powered=false': {
                        'model': buttonModel,
                        'y': 270,
                        'x': 180
                    },
                    'face=ceiling,facing=east,powered=true': {
                        'model': pressedModel,
                        'y': 270,
                        'x': 180
                    },
                    'face=ceiling,facing=north,powered=false': {
                        'model': buttonModel,
                        'y': 180,
                        'x': 180
                    },
                    'face=ceiling,facing=north,powered=true': {
                        'model': pressedModel,
                        'y': 180,
                        'x': 180
                    },
                    'face=ceiling,facing=south,powered=false': {
                        'model': buttonModel,
                        'x': 180
                    },
                    'face=ceiling,facing=south,powered=true': {
                        'model': pressedModel,
                        'x': 180
                    },
                    'face=ceiling,facing=west,powered=false': {
                        'model': buttonModel,
                        'y': 90,
                        'x': 180
                    },
                    'face=ceiling,facing=west,powered=true': {
                        'model': pressedModel,
                        'y': 90,
                        'x': 180
                    },
                    'face=floor,facing=east,powered=false': {
                        'model': buttonModel,
                        'y': 90
                    },
                    'face=floor,facing=east,powered=true': {
                        'model': pressedModel,
                        'y': 90
                    },
                    'face=floor,facing=north,powered=false': {
                        'model': buttonModel
                    },
                    'face=floor,facing=north,powered=true': {
                        'model': pressedModel
                    },
                    'face=floor,facing=south,powered=false': {
                        'model': buttonModel,
                        'y': 180
                    },
                    'face=floor,facing=south,powered=true': {
                        'model': pressedModel,
                        'y': 180
                    },
                    'face=floor,facing=west,powered=false': {
                        'model': buttonModel,
                        'y': 270
                    },
                    'face=floor,facing=west,powered=true': {
                        'model': pressedModel,
                        'y': 270
                    },
                    'face=wall,facing=east,powered=false': {
                        'model': buttonModel,
                        'y': 90,
                        'x': 90,
                        'uvlock': true
                    },
                    'face=wall,facing=east,powered=true': {
                        'model': pressedModel,
                        'y': 90,
                        'x': 90,
                        'uvlock': true
                    },
                    'face=wall,facing=north,powered=false': {
                        'model': buttonModel,
                        'x': 90,
                        'uvlock': true
                    },
                    'face=wall,facing=north,powered=true': {
                        'model': pressedModel,
                        'x': 90,
                        'uvlock': true
                    },
                    'face=wall,facing=south,powered=false': {
                        'model': buttonModel,
                        'y': 180,
                        'x': 90,
                        'uvlock': true
                    },
                    'face=wall,facing=south,powered=true': {
                        'model': pressedModel,
                        'y': 180,
                        'x': 90,
                        'uvlock': true
                    },
                    'face=wall,facing=west,powered=false': {
                        'model': buttonModel,
                        'y': 270,
                        'x': 90,
                        'uvlock': true
                    },
                    'face=wall,facing=west,powered=true': {
                        'model': pressedModel,
                        'y': 270,
                        'x': 90,
                        'uvlock': true
                    }
                }
            }
        };
    }

    private _model(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}.json`),
            data: {
                parent: 'minecraft:block/button',
                textures: {
                    texture: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _modelInventory(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_inventory.json`),
            data: {
                parent: 'minecraft:block/button_inventory',
                textures: {
                    texture: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _modelPressed(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_pressed.json`),
            data: {
                parent: 'minecraft:block/button_pressed',
                textures: {
                    texture: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _modelItem(): ManagedContentData<ItemModel> {
        return {
            path: this.mod.paths.itemModels(`${this.getName()}.json`),
            data: {
                parent: `${this.mod.getName()}:block/${this.getName()}_inventory`
            }
        };
    }

    private _recipe(): ManagedContentData<Recipe> {
        return {
            data: {
                type: 'minecraft:crafting_shapeless',
                group: 'wooden_button',
                ingredients: [
                    {
                        item: `${this.mod.getName()}:${this.name}`
                    }
                ],
                result: {
                    item: `${this.mod.getName()}:${this.getName()}`
                }
            }
        };
    }

    /**
     *
     * @param mod
     * @param name Do not include "_button" in the name
     */
    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'button', id || v4());

        this.blockState.set(this._blockState.bind(this));
        this.model.set(
            this._model.bind(this),
            this._modelPressed.bind(this),
            this._modelInventory.bind(this)
        );
        this.item.model.set(this._modelItem.bind(this));
        this.recipe.set(this._recipe.bind(this));
    }
}