import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import { base64ToFile } from '../../helpers/images';

export type BlockType = 'button'
    | 'activator_rail'
    | 'anvil'
    | 'barrel'
    | 'cluster'
    | 'cube'
    | 'door'
    | 'fence_gate'
    | 'fence'
    | 'pillar'
    | 'pressure_plate'
    | 'sapling'
    | 'sign'
    | 'slab'
    | 'stairs'
    | 'stem'
    | 'trapdoor'
    | 'wall';

export interface IBlock<M extends ModCacher> {
    addTextures(textures: [string, string][]): IBlock<M>
    blockState(): File[]
    id: string
    lootTable(): File[]
    mod: M
    model(): File[]
    name: string
    recipe(): File[]
    textureCache: Map<string, string>
    textures(): File[]
    type: BlockType
}

export default class BlockBase<M extends ModCacher> implements IBlock<M> {
    readonly id: string;

    readonly mod: M;

    readonly name: string;

    readonly type: BlockType;

    readonly textureCache = new Map<string, string>();

    getName() {
        return this.name;
    }

    blockState(): File[] {
        return [];
    }

    lootTable(): File[] {
        const json = {
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

        return [
            new File([JSON.stringify(json, null, 4)], this.mod.paths.blocksLootTables(`${this.name}.json`), { type: 'application/json' })
        ];
    }

    model(): File[] {
        return [];
    }

    recipe(): File[] {
        return [];
    }

    textures() {
        return Array.from(this.textureCache).map(([name, base64]) => base64ToFile(this.mod.paths.blockTexture(`${name}.png`), base64));
    }

    addTextures(textures: [string, string][]) {
        textures.forEach(([name, base64]) => this.textureCache.set(name, base64));

        return this;
    }

    constructor(mod: M, name: string, type: BlockType, id?: string) {
        this.mod = mod;
        this.name = name;
        this.type = type;
        this.id = id || v4();
    }
}