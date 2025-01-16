import { BlockModel, BlockState, ItemModel, ManagedContentData, Recipe } from '../types';
import { v4 } from 'uuid';
import BlockBase from './BlockBase';
import ModCacher from '../ModCacher';
import ItemBase from '../items/ItemBase';

export default class PressurePlateDef<M extends ModCacher> extends BlockBase<M, ItemBase<M>> {

    getName() {
        return `${this.name}_pressure_plate`;
    }

    private _blockState(): ManagedContentData<BlockState> {
        return {
            data: {
                variants: {
                    'powered=false': {
                        model: `${this.mod.getName()}:block/${this.getName()}`
                    },
                    'powered=true': {
                        model: `${this.mod.getName()}:block/${this.getName()}_down`
                    }
                }
            }
        };
    }

    private _model(): ManagedContentData<BlockModel> {
        return {
            data: {
                parent: 'minecraft:block/pressure_plate_up',
                textures: {
                    texture: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _modelDown(): ManagedContentData<BlockModel> {
        return {
            data: {
                parent: 'minecraft:block/pressure_plate_down',
                textures: {
                    texture: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _itemModel(): ManagedContentData<ItemModel> {
        return {
            data: {
                parent: `${this.mod.getName()}:block/${this.getName()}`
            }
        };
    }

    private _recipe(): ManagedContentData<Recipe> {
        return {
            data: {
                type: 'minecraft:crafting_shaped',
                group: 'wooden_pressure_plate',
                pattern: [
                    '##'
                ],
                key: {
                    '#': {
                        item: `${this.mod.getName()}:${this.name}`
                    }
                },
                result: {
                    item: `${this.mod.getName()}:${this.getName()}`
                }
            }
        };
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'pressure_plate', id || v4());

        this.blockState.set(this._blockState.bind(this));
        this.model.set(
            this._model.bind(this),
            this._modelDown.bind(this)
        );
        this.item.model.set(this._itemModel.bind(this));
        this.recipe.set(this._recipe.bind(this));
    }
}