import { v4 } from 'uuid';
import BlockBase from './IBlock';
import ModCacher from '../ModCacher';

export default class WallDef<M extends ModCacher> extends BlockBase<M> {

    getName() {
        return `${this.name}_wall`;
    }

    _blockState() {
        const postModel = `${this.mod.getName()}:block/${this.getName()}_post`;
        const sideModel = `${this.mod.getName()}:block/${this.getName()}_side`;
        const tallSideModel = `${this.mod.getName()}:block/${this.getName()}_side_tall`;

        return {
            multipart: [
                {
                    when: {
                        up: true
                    },
                    apply: {
                        model: postModel
                    }
                },
                {
                    when: {
                        north: 'low'
                    },
                    apply: {
                        model: sideModel,
                        uvlock: true
                    }
                },
                {
                    when: {
                        east: 'low'
                    },
                    apply: {
                        model: sideModel,
                        y: 90,
                        uvlock: true
                    }
                },
                {
                    when: {
                        south: 'low'
                    },
                    apply: {
                        model: sideModel,
                        y: 180,
                        uvlock: true
                    }
                },
                {
                    when: {
                        west: 'low'
                    },
                    apply: {
                        model: sideModel,
                        y: 270,
                        uvlock: true
                    }
                },
                {
                    when: {
                        north: 'tall'
                    },
                    apply: {
                        model: tallSideModel,
                        uvlock: true
                    }
                },
                {
                    when: {
                        east: 'tall'
                    },
                    apply: {
                        model: tallSideModel,
                        y: 90,
                        uvlock: true
                    }
                },
                {
                    when: {
                        south: 'tall'
                    },
                    apply: {
                        model: tallSideModel,
                        y: 180,
                        uvlock: true
                    }
                },
                {
                    when: {
                        west: 'tall'
                    },
                    apply: {
                        model: tallSideModel,
                        y: 270,
                        uvlock: true
                    }
                }
            ]
        };
    }

    _modelInventory() {
        return {
            'parent': 'minecraft:block/wall_inventory',
            'textures': {
                'wall': `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _modelPost() {
        return {
            'parent': 'minecraft:block/template_post',
            'textures': {
                'wall': `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _modelSideTall() {
        return {
            'parent': 'minecraft:block/template_side_tall',
            'textures': {
                'wall': `${this.mod.getName()}:block/${this.name}`
            }
        };
    }

    _modelSide() {
        return {
            'parent': 'minecraft:block/template_side',
            'textures': {
                'wall': `${this.mod.getName()}:block/${this.name}`
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
            type: 'minecraft:crafting_shaped',
            pattern: [
                '###',
                '###'
            ],
            key: {
                '#': {
                    'item': `${this.mod.getName()}:${this.name}`
                }
            },
            result: {
                item: `${this.mod.getName()}:${this.getName()}`,
                count: 6
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
            new File([JSON.stringify(this._modelInventory(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_inventory.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._modelPost(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_post.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._modelSideTall(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_side_tall.json`), { type: 'application/json' }),
            new File([JSON.stringify(this._modelSide(), null, 4)], this.mod.paths.blockModels(`${this.getName()}_side.json`), { type: 'application/json' }),
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
        super(mod, name, 'wall', id || v4());
    }
}