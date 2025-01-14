import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import BlockBase from './IBlock';

export default class SignDef<M extends ModCacher> extends BlockBase<M> {

    getName() {
        return `${this.name}_sign`;
    }

    _blockState() {
        return {
            variants: {
                '': {
                    model: `${this.mod.getName()}:block/${this.getName()}`
                }
            }
        };
    }

    _blockStateWall() {
        return {
            variants: {
                '': {
                    model: `${this.mod.getName()}:block/${this.getName()}`
                }
            }
        };
    }

    _model() {
        return {
            textures: {
                particle: `${this.mod.getName()}:block/${this.name}`
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

    blockState() {
        return [
            new File([JSON.stringify(this._blockState(), null, 4)], this.mod.paths.blockStates(`${this.name}.json`), { type: 'application/json' })
        ];
    }

    model() {
        return [
            new File([JSON.stringify(this._model(), null, 4)], this.mod.paths.blockModels(`${this.name}.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._itemModel(), null, 4)], this.mod.paths.itemModels(`${this.name}.json`), { type: 'application/json' })
        ];
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'sign', id || v4());
    }
}