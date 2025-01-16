import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import ItemBase from './ItemBase';

export default class ItemDef<M extends ModCacher> extends ItemBase<M> {
    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'item', id || v4());
    }
}