import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import BlockBase from './IBlock';

export default class BlockDef<M extends ModCacher> extends BlockBase<M> {

    _blockState() {
        return {
            variants: {
                '': {
                    model: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    _model() {
        return {
            parent: 'minecraft:block/cube_all',
            textures: {
                all: `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _itemModel() {
        return {
            parent: `${this.mod.getName()}:block/${this.name}`
        };
    }

    _lootTable() {
        return {
            type: 'minecraft:block',
            pools: [
                {
                    rolls: 1.0,
                    bonus_rolls: 0.0,
                    entries: [
                        {
                            type: 'minecraft:item',
                            name: `${this.mod.getName()}:${this.name}`
                        }
                    ],
                    conditions: [
                        {
                            condition: 'minecraft:survives_explosion'
                        }
                    ]
                }
            ]
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

    lootTable() {
        return [
            new File([JSON.stringify(this._lootTable(), null, 4)], this.mod.paths.blocksLootTables(`${this.name}.json`), { type: 'application/json' })
        ];
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'cube', id || v4());
    }
}