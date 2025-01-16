import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import BlockBase from './BlockBase';
import ItemBase from '../items/ItemBase';

export default class FenceGateDef<M extends ModCacher> extends BlockBase<M, ItemBase<M>> {

    getName() {
        return `${this.name}_fence_gate`;
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'fence_gate', id || v4());
    }
}