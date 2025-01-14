import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import BlockBase from './IBlock';

export default class PressurePlateDef<M extends ModCacher> extends BlockBase<M> {

    getName() {
        return `${this.name}_pressure_plate`;
    }

    _blockState() {
        return {
            variants: {
                'powered=false': {
                    model: `${this.mod.getName()}:block/${this.getName()}`
                },
                'powered=true': {
                    model: `${this.mod.getName()}:block/${this.getName()}_down`
                }
            }
        };
    }

    _model() {
        return {
            parent: 'minecraft:block/pressure_plate_up',
            textures: {
                texture: `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _modelDown() {
        return {
            parent: 'minecraft:block/pressure_plate_down',
            textures: {
                texture: `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _itemModel() {
        return {
            parent: `${this.mod.getName()}:block/${this.getName()}`
        };
    }

    _recipe() {
        return {
            type: 'minecraft:crafting_shaped',
            group: 'wooden_pressure_plate',
            pattern: [
                '##'
            ],
            key: {
                '#': {
                    item: `${this.mod.getName()}:${this.name}`
                }
            },
            result: {
                item: `${this.mod.getName()}:${this.getName()}`
            }
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
            new File([JSON.stringify(this._itemModel(), null, 4)], this.mod.paths.itemModels(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    recipe() {
        return [
            new File([JSON.stringify(this._recipe(), null, 4)], this.mod.paths.recipes(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'pressure_plate', id || v4());
    }
}