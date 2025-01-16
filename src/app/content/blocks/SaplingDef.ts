import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import BlockBase from './BlockBase';
import ItemBase from '../items/ItemBase';

export default class SaplingDef<M extends ModCacher> extends BlockBase<M, ItemBase<M>> {

    getName() {
        return `${this.name}_sapling`;
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'sapling', id || v4());
    }
}