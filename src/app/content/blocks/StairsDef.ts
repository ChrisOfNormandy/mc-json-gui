import { v4 } from 'uuid';
import BlockBase from './BlockBase';
import ModCacher from '../ModCacher';
import { BlockModel, BlockState, ManagedContentData, Recipe } from '../types';
import ItemBase from '../items/ItemBase';

export default class StairsDef<M extends ModCacher> extends BlockBase<M, ItemBase<M>> {

    getName() {
        return `${this.name}_stairs`;
    }

    private _blockState(): ManagedContentData<BlockState> {
        const stairsModel = `${this.mod.getName()}:block/${this.getName()}`;
        const outerModel = `${this.mod.getName()}:block/${this.getName()}_outer`;
        const innerModel = `${this.mod.getName()}:block/${this.getName()}_inner`;

        return {
            data: {
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
            }
        };
    }

    private _modelInner(): ManagedContentData<BlockModel> {
        return {
            data: {
                parent: 'minecraft:block/inner',
                textures: {
                    bottom: `${this.mod.getName()}:block/${this.name}`,
                    top: `${this.mod.getName()}:block/${this.name}`,
                    side: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _modelOuter(): ManagedContentData<BlockModel> {
        return {
            data: {
                parent: 'minecraft:block/outer',
                textures: {
                    bottom: `${this.mod.getName()}:block/${this.name}`,
                    top: `${this.mod.getName()}:block/${this.name}`,
                    side: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _model(): ManagedContentData<BlockModel> {
        return {
            data: {
                parent: 'minecraft:block/stairs',
                textures: {
                    bottom: `${this.mod.getName()}:block/${this.name}`,
                    top: `${this.mod.getName()}:block/${this.name}`,
                    side: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _recipe(): ManagedContentData<Recipe> {
        return {
            data: {
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
            }
        };
    }

    /**
     *
     * @param mod
     * @param name Do not include "" in the name
     */
    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'stairs', id || v4());

        this.blockState.set(this._blockState.bind(this));
        this.model.set(
            this._model.bind(this),
            this._modelInner.bind(this),
            this._modelOuter.bind(this)
        );
        this.recipe.set(this._recipe.bind(this));
    }
}