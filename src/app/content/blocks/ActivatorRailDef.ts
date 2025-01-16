import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import BlockBase from './BlockBase';
import ItemBase from '../items/ItemBase';

export default class ActivatorRailDef<M extends ModCacher> extends BlockBase<M, ItemBase<M>> {
    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'activator_rail', id || v4());
    }
}