import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import BlockBase from './BlockBase';
import { BlockModel, BlockState, ItemModel, ManagedContentData } from '../types';
import ItemBase from '../items/ItemBase';

export default class PillarBlockDef<M extends ModCacher> extends BlockBase<M, ItemBase<M>> {

    private _blockState(): ManagedContentData<BlockState> {
        return {
            data: {
                variants: {
                    'axis=x': {
                        model: `${this.mod.getName()}:block/${this.getName()}_horizontal`,
                        x: 90,
                        y: 90
                    },
                    'axis=y': {
                        model: `${this.mod.getName()}:block/${this.getName()}`
                    },
                    'axis=z': {
                        model: `${this.mod.getName()}:block/${this.getName()}_horizontal`,
                        x: 90
                    }
                }
            }
        };
    }

    private _model(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}.json`),
            data: {
                parent: 'minecraft:block/cube_column',
                textures: {
                    end: `${this.mod.getName()}:block/${this.getName()}_top`,
                    side: `${this.mod.getName()}:block/${this.getName()}`
                }
            }
        };
    }

    private _modelHorizontal(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_horizontal.json`),
            data: {
                parent: 'minecraft:block/cube_column_horizontal',
                textures: {
                    end: `${this.mod.getName()}:block/${this.getName()}_top`,
                    side: `${this.mod.getName()}:block/${this.getName()}`
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

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'pillar', id || v4());

        this.blockState.set(this._blockState.bind(this));
        this.model.set(
            this._model.bind(this),
            this._modelHorizontal.bind(this)
        );
        this.item.model.set(this._itemModel.bind(this));
    }
}