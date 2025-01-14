import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import ItemBase from './IItem';

export default class ItemDef<M extends ModCacher> extends ItemBase<M> {

    _model() {
        return {
            parent: 'minecraft:item/generated',
            textures: {
                all: `${this.mod.getName()}:item/${this.getName()}`
            }
        };
    }

    model() {
        return [
            new File([JSON.stringify(this._model(), null, 4)], this.mod.paths.itemModels(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'item', id || v4());
    }
}