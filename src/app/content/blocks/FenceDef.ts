import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import BlockBase from './IBlock';

export default class FenceDef<M extends ModCacher> extends BlockBase<M> {

    getName() {
        return `${this.name}_fence`;
    }

    _blockState() {
        return {};
    }

    _model() {
        return {};
    }

    _itemModel() {
        return {};
    }

    blockState() {
        return [
            new File([JSON.stringify(this._blockState(), null, 4)], this.mod.paths.blockStates(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    model() {
        return [
            new File([JSON.stringify(this._model(), null, 4)], this.mod.paths.blockModels(`${this.getName()}.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._itemModel(), null, 4)], this.mod.paths.itemModels(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'fence', id || v4());
    }
}