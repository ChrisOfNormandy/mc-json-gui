import { v4 } from 'uuid';
import BlockBase from './IBlock';
import ModCacher from '../ModCacher';

export default class ButtonDef<M extends ModCacher> extends BlockBase<M> {

    getName() {
        return `${this.name}_button`;
    }

    _blockState() {
        const buttonModel = `${this.mod.getName()}:block/${this.getName()}`;
        const pressedModel = buttonModel + '_pressed';

        return {
            variants: {
                'face=ceiling,facing=east,powered=false': {
                    'model': buttonModel,
                    'y': 270,
                    'x': 180
                },
                'face=ceiling,facing=east,powered=true': {
                    'model': pressedModel,
                    'y': 270,
                    'x': 180
                },
                'face=ceiling,facing=north,powered=false': {
                    'model': buttonModel,
                    'y': 180,
                    'x': 180
                },
                'face=ceiling,facing=north,powered=true': {
                    'model': pressedModel,
                    'y': 180,
                    'x': 180
                },
                'face=ceiling,facing=south,powered=false': {
                    'model': buttonModel,
                    'x': 180
                },
                'face=ceiling,facing=south,powered=true': {
                    'model': pressedModel,
                    'x': 180
                },
                'face=ceiling,facing=west,powered=false': {
                    'model': buttonModel,
                    'y': 90,
                    'x': 180
                },
                'face=ceiling,facing=west,powered=true': {
                    'model': pressedModel,
                    'y': 90,
                    'x': 180
                },
                'face=floor,facing=east,powered=false': {
                    'model': buttonModel,
                    'y': 90
                },
                'face=floor,facing=east,powered=true': {
                    'model': pressedModel,
                    'y': 90
                },
                'face=floor,facing=north,powered=false': {
                    'model': buttonModel
                },
                'face=floor,facing=north,powered=true': {
                    'model': pressedModel
                },
                'face=floor,facing=south,powered=false': {
                    'model': buttonModel,
                    'y': 180
                },
                'face=floor,facing=south,powered=true': {
                    'model': pressedModel,
                    'y': 180
                },
                'face=floor,facing=west,powered=false': {
                    'model': buttonModel,
                    'y': 270
                },
                'face=floor,facing=west,powered=true': {
                    'model': pressedModel,
                    'y': 270
                },
                'face=wall,facing=east,powered=false': {
                    'model': buttonModel,
                    'y': 90,
                    'x': 90,
                    'uvlock': true
                },
                'face=wall,facing=east,powered=true': {
                    'model': pressedModel,
                    'y': 90,
                    'x': 90,
                    'uvlock': true
                },
                'face=wall,facing=north,powered=false': {
                    'model': buttonModel,
                    'x': 90,
                    'uvlock': true
                },
                'face=wall,facing=north,powered=true': {
                    'model': pressedModel,
                    'x': 90,
                    'uvlock': true
                },
                'face=wall,facing=south,powered=false': {
                    'model': buttonModel,
                    'y': 180,
                    'x': 90,
                    'uvlock': true
                },
                'face=wall,facing=south,powered=true': {
                    'model': pressedModel,
                    'y': 180,
                    'x': 90,
                    'uvlock': true
                },
                'face=wall,facing=west,powered=false': {
                    'model': buttonModel,
                    'y': 270,
                    'x': 90,
                    'uvlock': true
                },
                'face=wall,facing=west,powered=true': {
                    'model': pressedModel,
                    'y': 270,
                    'x': 90,
                    'uvlock': true
                }
            }
        };
    }

    _model() {
        return {
            parent: 'minecraft:block/button',
            textures: {
                texture: `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _modelInventory() {
        return {
            parent: 'minecraft:block/button_inventory',
            textures: {
                texture: `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _modelPressed() {
        return {
            parent: 'minecraft:block/button_pressed',
            textures: {
                texture: `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _modelItem() {
        return {
            parent: `${this.mod.getName()}:block/${this.getName()}_inventory`
        };
    }

    _recipe() {
        return {
            type: 'minecraft:crafting_shapeless',
            group: 'wooden_button',
            ingredients: [
                {
                    item: `${this.mod.getName()}:${this.name}`
                }
            ],
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
            new File([JSON.stringify(this._modelInventory(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_inventory.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._modelPressed(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_pressed.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._modelItem(), null, 4)], this.mod.paths.itemModels(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    recipe() {
        return [
            new File([JSON.stringify(this._recipe(), null, 4)], this.mod.paths.recipes(`${this.getName()}.json`), { type: 'application/json' })
        ];
    }

    /**
     *
     * @param mod
     * @param name Do not include "_button" in the name
     */
    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'button', id || v4());
    }
}