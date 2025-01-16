import { BlockModel, BlockState, BlockType, IBlock, LootTable, Recipe } from '../types';
import { ManagedContent } from '../ManagedContent';
import { TextureManager } from '../TextureManager';
import { v4 } from 'uuid';
import ItemBase from '../items/ItemBase';
import ItemDef from '../items/ItemDef';
import ModCacher from '../ModCacher';

export default class BlockBase<M extends ModCacher, I extends ItemBase<M>> implements IBlock<M, I> {
    readonly id: string;

    readonly mod: M;

    readonly name: string;

    readonly type: BlockType;

    getName() {
        return this.name;
    }

    blockState = new ManagedContent<BlockState>(
        () => this.mod.paths.blockStates(`${this.name}.json`),
        [
            () => ({
                data: {
                    variants: {
                        '': {
                            model: `${this.mod.getName()}:block/${this.name}`
                        }
                    }
                }
            })
        ]
    );

    lootTable = new ManagedContent<LootTable>(
        () => this.mod.paths.blocksLootTables(`${this.name}.json`),
        [
            () => ({
                data: {
                    type: 'minecraft:block',
                    pools: [
                        {
                            rolls: 1,
                            entries: [
                                {
                                    type: 'minecraft:item',
                                    name: `${this.mod.getName()}:${this.name}`
                                }
                            ]
                        }
                    ]
                }
            })
        ]
    );

    model = new ManagedContent<BlockModel>(
        () => this.mod.paths.blockModels(`${this.name}.json`),
        [
            () => ({
                data: {
                    parent: 'minecraft:block/cube_all',
                    textures: {
                        all: `${this.mod.getName()}:block/${this.name}`
                    }
                }
            })
        ]
    );

    recipe = new ManagedContent<Recipe>(() => this.mod.paths.recipes(`${this.name}.json`));

    textures = new TextureManager(this);

    readonly item: I;

    constructor(mod: M, name: string, type: BlockType, id?: string) {
        this.mod = mod;
        this.name = name;
        this.type = type;
        this.id = id || v4();

        this.item = new ItemDef<M>(mod, name) as I;
    }
}