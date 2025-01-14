import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import BlockBase from './IBlock';

export default class PillarBlockDef<M extends ModCacher> extends BlockBase<M> {

    _blockState() {
        return {
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
        };
    }

    _model() {
        return {
            parent: 'minecraft:block/cube_column',
            textures: {
                end: `${this.mod.getName()}:block/${this.getName()}_top`,
                side: `${this.mod.getName()}:block/${this.getName()}`
            }
        };
    }

    _modelHorizontal() {
        return {
            parent: 'minecraft:block/cube_column_horizontal',
            textures: {
                end: `${this.mod.getName()}:block/${this.getName()}_top`,
                side: `${this.mod.getName()}:block/${this.getName()}`
            }
        };
    }

    _itemModel() {
        return {
            parent: `${this.mod.getName()}:block/${this.getName()}`
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
            new File([JSON.stringify(this._modelHorizontal(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_horizontal.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._itemModel(), null, 4)], this.mod.paths.itemModels(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'pillar', id || v4());
    }
}