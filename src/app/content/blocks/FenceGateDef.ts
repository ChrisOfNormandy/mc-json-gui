import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import BlockBase from './BlockBase';
import ItemBase from '../items/ItemBase';
import { BlockModel, BlockState, ManagedContentData } from '../types';

export default class FenceGateDef<M extends ModCacher> extends BlockBase<M, ItemBase<M>> {

    getName() {
        return `${this.name}_fence_gate`;
    }

    private _blockState(): ManagedContentData<BlockState> {

        const model = `${this.mod.getName()}:block/${this.name}_fence_gate`;
        const open = `${this.mod.getName()}:block/${this.name}_fence_gate_open`;
        const wall = `${this.mod.getName()}:block/${this.name}_fence_gate_wall`;
        const openWall = `${this.mod.getName()}:block/${this.name}_fence_gate_wall_open`;

        return {
            data: {
                variants: {
                    'facing=east,in_wall=false,open=false': {
                        model: model,
                        uvlock: true,
                        y: 270
                    },
                    'facing=east,in_wall=false,open=true': {
                        model: open,
                        uvlock: true,
                        y: 270
                    },
                    'facing=east,in_wall=true,open=false': {
                        model: wall,
                        uvlock: true,
                        y: 270
                    },
                    'facing=east,in_wall=true,open=true': {
                        model: openWall,
                        uvlock: true,
                        y: 270
                    },
                    'facing=north,in_wall=false,open=false': {
                        model: model,
                        uvlock: true,
                        y: 180
                    },
                    'facing=north,in_wall=false,open=true': {
                        model: open,
                        uvlock: true,
                        y: 180
                    },
                    'facing=north,in_wall=true,open=false': {
                        model: wall,
                        uvlock: true,
                        y: 180
                    },
                    'facing=north,in_wall=true,open=true': {
                        model: openWall,
                        uvlock: true,
                        y: 180
                    },
                    'facing=south,in_wall=false,open=false': {
                        model: model,
                        uvlock: true
                    },
                    'facing=south,in_wall=false,open=true': {
                        model: open,
                        uvlock: true
                    },
                    'facing=south,in_wall=true,open=false': {
                        model: wall,
                        uvlock: true
                    },
                    'facing=south,in_wall=true,open=true': {
                        model: openWall,
                        uvlock: true
                    },
                    'facing=west,in_wall=false,open=false': {
                        model: model,
                        uvlock: true,
                        y: 90
                    },
                    'facing=west,in_wall=false,open=true': {
                        model: open,
                        uvlock: true,
                        y: 90
                    },
                    'facing=west,in_wall=true,open=false': {
                        model: wall,
                        uvlock: true,
                        y: 90
                    },
                    'facing=west,in_wall=true,open=true': {
                        model: openWall,
                        uvlock: true,
                        y: 90
                    }
                }
            }
        };
    }

    private _modelOpen(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_fence_gate_open`),
            data: {
                parent: 'minecraft:block/template_fence_gate_open',
                textures: {
                    texture: `${this.mod.getName()}:block/${this.name}`
                }
            }
        };
    }

    private _modelOpenWall(): ManagedContentData<BlockModel> {
        return {
            path: this.mod.paths.blockModels(`${this.getName()}_fence_gate_wall_open`),
            data: {
                parent: 'minecraft:block/template_fence_gate_wall_open',
                textures: {
                    texture: 'minecraft:block/acacia_planks'
                }
            }
        }
    }

    constructor(mod: M, name: string, id?: string) {
        super(mod, name, 'fence_gate', id || v4());

        this.blockState.set(this._blockState.bind(this));
    }
}