import { v4 } from 'uuid';
import BlockBase from './IBlock';
import ModCacher from '../ModCacher';

export default class StairsDef<M extends ModCacher> extends BlockBase<M> {

    getName() {
        return `${this.name}_stairs`;
    }

    _blockState() {
        const stairsModel = `${this.mod.getName()}:block/${this.getName()}`;
        const outerModel = `${this.mod.getName()}:block/${this.getName()}_outer`;
        const innerModel = `${this.mod.getName()}:block/${this.getName()}_inner`;

        return {
            variants: {
                'facing=east,half=bottom,shape=straight': {
                    model: stairsModel
                },
                'facing=west,half=bottom,shape=straight': {
                    model: stairsModel,
                    'y': 180,
                    'uvlock': true
                },
                'facing=south,half=bottom,shape=straight': {
                    model: stairsModel,
                    'y': 90,
                    'uvlock': true
                },
                'facing=north,half=bottom,shape=straight': {
                    model: stairsModel,
                    'y': 270,
                    'uvlock': true
                },
                'facing=east,half=bottom,shape=outer_right': {
                    model: outerModel
                },
                'facing=west,half=bottom,shape=outer_right': {
                    model: outerModel,
                    'y': 180,
                    'uvlock': true
                },
                'facing=south,half=bottom,shape=outer_right': {
                    model: outerModel,
                    'y': 90,
                    'uvlock': true
                },
                'facing=north,half=bottom,shape=outer_right': {
                    model: outerModel,
                    'y': 270,
                    'uvlock': true
                },
                'facing=east,half=bottom,shape=outer_left': {
                    model: outerModel,
                    'y': 270,
                    'uvlock': true
                },
                'facing=west,half=bottom,shape=outer_left': {
                    model: outerModel,
                    'y': 90,
                    'uvlock': true
                },
                'facing=south,half=bottom,shape=outer_left': {
                    model: outerModel
                },
                'facing=north,half=bottom,shape=outer_left': {
                    model: outerModel,
                    'y': 180,
                    'uvlock': true
                },
                'facing=east,half=bottom,shape=inner_right': {
                    model: innerModel
                },
                'facing=west,half=bottom,shape=inner_right': {
                    model: innerModel,
                    'y': 180,
                    'uvlock': true
                },
                'facing=south,half=bottom,shape=inner_right': {
                    model: innerModel,
                    'y': 90,
                    'uvlock': true
                },
                'facing=north,half=bottom,shape=inner_right': {
                    model: innerModel,
                    'y': 270,
                    'uvlock': true
                },
                'facing=east,half=bottom,shape=inner_left': {
                    model: innerModel,
                    'y': 270,
                    'uvlock': true
                },
                'facing=west,half=bottom,shape=inner_left': {
                    model: innerModel,
                    'y': 90,
                    'uvlock': true
                },
                'facing=south,half=bottom,shape=inner_left': {
                    model: innerModel
                },
                'facing=north,half=bottom,shape=inner_left': {
                    model: innerModel,
                    'y': 180,
                    'uvlock': true
                },
                'facing=east,half=top,shape=straight': {
                    model: stairsModel,
                    'x': 180,
                    'uvlock': true
                },
                'facing=west,half=top,shape=straight': {
                    model: stairsModel,
                    'x': 180,
                    'y': 180,
                    'uvlock': true
                },
                'facing=south,half=top,shape=straight': {
                    model: stairsModel,
                    'x': 180,
                    'y': 90,
                    'uvlock': true
                },
                'facing=north,half=top,shape=straight': {
                    model: stairsModel,
                    'x': 180,
                    'y': 270,
                    'uvlock': true
                },
                'facing=east,half=top,shape=outer_right': {
                    model: outerModel,
                    'x': 180,
                    'y': 90,
                    'uvlock': true
                },
                'facing=west,half=top,shape=outer_right': {
                    model: outerModel,
                    'x': 180,
                    'y': 270,
                    'uvlock': true
                },
                'facing=south,half=top,shape=outer_right': {
                    model: outerModel,
                    'x': 180,
                    'y': 180,
                    'uvlock': true
                },
                'facing=north,half=top,shape=outer_right': {
                    model: outerModel,
                    'x': 180,
                    'uvlock': true
                },
                'facing=east,half=top,shape=outer_left': {
                    model: outerModel,
                    'x': 180,
                    'uvlock': true
                },
                'facing=west,half=top,shape=outer_left': {
                    model: outerModel,
                    'x': 180,
                    'y': 180,
                    'uvlock': true
                },
                'facing=south,half=top,shape=outer_left': {
                    model: outerModel,
                    'x': 180,
                    'y': 90,
                    'uvlock': true
                },
                'facing=north,half=top,shape=outer_left': {
                    model: outerModel,
                    'x': 180,
                    'y': 270,
                    'uvlock': true
                },
                'facing=east,half=top,shape=inner_right': {
                    model: innerModel,
                    'x': 180,
                    'y': 90,
                    'uvlock': true
                },
                'facing=west,half=top,shape=inner_right': {
                    model: innerModel,
                    'x': 180,
                    'y': 270,
                    'uvlock': true
                },
                'facing=south,half=top,shape=inner_right': {
                    model: innerModel,
                    'x': 180,
                    'y': 180,
                    'uvlock': true
                },
                'facing=north,half=top,shape=inner_right': {
                    model: innerModel,
                    'x': 180,
                    'uvlock': true
                },
                'facing=east,half=top,shape=inner_left': {
                    model: innerModel,
                    'x': 180,
                    'uvlock': true
                },
                'facing=west,half=top,shape=inner_left': {
                    model: innerModel,
                    'x': 180,
                    'y': 180,
                    'uvlock': true
                },
                'facing=south,half=top,shape=inner_left': {
                    model: innerModel,
                    'x': 180,
                    'y': 90,
                    'uvlock': true
                },
                'facing=north,half=top,shape=inner_left': {
                    model: innerModel,
                    'x': 180,
                    'y': 270,
                    'uvlock': true
                }
            }
        };
    }

    _modelInner() {
        return {
            'parent': 'minecraft:block/inner',
            'textures': {
                'bottom': `${this.mod.getName()}:block/${this.name}`,
                'top': `${this.mod.getName()}:block/${this.name}`,
                'side': `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _modelOuter() {
        return {
            'parent': 'minecraft:block/outer',
            'textures': {
                'bottom': `${this.mod.getName()}:block/${this.name}`,
                'top': `${this.mod.getName()}:block/${this.name}`,
                'side': `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _model() {
        return {
            'parent': 'minecraft:block/stairs',
            'textures': {
                'bottom': `${this.mod.getName()}:block/${this.name}`,
                'top': `${this.mod.getName()}:block/${this.name}`,
                'side': `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _modelItem() {
        return {
            parent: `${this.mod.getName()}:block/${this.getName()}`
        };
    }

    _recipe() {
        return {
            type: 'minecraft:crafting_shaped',
            group: 'wooden',
            pattern: [
                '#  ',
                '## ',
                '###'
            ],
            key: {
                '#': {
                    item: `${this.mod.getName()}:${this.name}`
                }
            },
            result: {
                item: `${this.mod.getName()}:${this.getName()}`,
                count: 4
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
            new File([JSON.stringify(this._modelInner(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_inner.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._modelOuter(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_outer.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._model(), null, 4)], this.mod.paths.blockModels(`${this.getName()}.json`), { type: 'application/json' }),
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
     * @param name Do not include "" in the name
     */
    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'stairs', id || v4());
    }
}