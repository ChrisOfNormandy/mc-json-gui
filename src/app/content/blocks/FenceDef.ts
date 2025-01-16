import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import BlockBase from './BlockBase';
import ItemBase from '../items/ItemBase';

export default class FenceDef<M extends ModCacher> extends BlockBase<M, ItemBase<M>> {

    getName() {
        return `${this.name}_fence`;
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'fence', id || v4());
    }
}