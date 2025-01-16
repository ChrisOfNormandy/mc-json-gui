import BlockBase from './blocks/BlockBase';
import ItemBase from './items/ItemBase';
import { ManagedContent } from './ManagedContent';
import ModCacher from './ModCacher';
import { TextureManager } from './TextureManager';

export interface ManagedContentData<T extends object> {
    path?: string
    data: T
}

interface BlockModelTextures_All {
    all: string
}

interface BlockModelTextures_Single {
    texture: string
}

interface BlockModelTextures_Tall {
    top: string
    bottom: string
}

interface BlockModelTexutres_Pillar {
    end: string
    side: string
}

interface BlockModelTextures_Wall {
    wall: string
}

type ItemModelTextures = Record<string, string>;

export interface BlockModel {
    parent: string,
    textures: BlockModelTextures_All
    | BlockModelTextures_Single
    | BlockModelTextures_Tall
    | BlockModelTexutres_Pillar
    | BlockModelTextures_Wall
    | ItemModelTextures
}

export interface ItemModel {
    parent: string
    textures?: ItemModelTextures
}

interface BlockStateVariant {
    model: string
    x?: number
    y?: number
    uvlock?: boolean
}

interface BlockState_Variants {
    variants: Record<string, BlockStateVariant>
}

interface BlockState_MultipartPart {
    when: Record<string, unknown>
    apply: BlockStateVariant
}

interface BlockState_Multipart {
    multipart: BlockState_MultipartPart[]
}

export type BlockState = BlockState_Variants
    | BlockState_Multipart;

interface LootTablePoolConditionProperty {
    half?: string
    type?: string
}

interface LootTablePoolCondition {
    condition: string
    block?: string
    properties?: LootTablePoolConditionProperty
}

interface LootTablePoolFunction {
    function: string
    conditions?: LootTablePoolCondition[]
    count?: number
    add?: boolean
}

interface LootTablePoolEntry {
    type: string
    name: string
    functions?: LootTablePoolFunction[]
    conditions?: LootTablePoolCondition[]
}

interface LootTablePool {
    bonus_rolls?: number
    conditions?: LootTablePoolCondition[]
    entries: LootTablePoolEntry[]
    rolls: number
}

export interface LootTable {
    type: string
    pools: LootTablePool[]
}

export interface Recipe {
    type: string
    group?: string
    pattern?: string[]
    key?: Record<string, { item: string }>
    ingredients?: { item: string, count?: number }[]
    result: { item: string, count?: number }
}

export type ItemType = 'item';
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

export interface IContent<M extends ModCacher, T = ItemType | BlockType> {
    getName(): string
    id: string
    mod: M
    name: string
    type: T
}

export interface ModeledContent<T extends (ItemModel | BlockModel)> {
    model: ManagedContent<T>
}

export type IItem<M extends ModCacher> = {
    recipe: ManagedContent<object>
    textures: TextureManager<M, ItemModel, IItem<M>>
} & IContent<M, ItemType>
    & ModeledContent<ItemModel>;

export type IBlock<M extends ModCacher, I extends IItem<M>> = {
    blockState: ManagedContent<BlockState>
    textures: TextureManager<M, BlockModel, IBlock<M, I>>
    lootTable: ManagedContent<LootTable>
    recipe: ManagedContent<object>

    item: I
} & IContent<M, BlockType>
    & ModeledContent<BlockModel>;

export interface BlocksTableSchema { id: string; name: string; type: BlockType }
export interface ItemsTableSchema { id: string; name: string; type: ItemType }
export interface TexturesTableSchema { name: string, base64: string }

export interface CachedData {
    blockCache: Map<string, BlockBase<ModCacher, ItemBase<ModCacher>>>
    itemCache: Map<string, ItemBase<ModCacher>>
    texturesCache: Map<string, string>
}

export const ItemTypes: ItemType[] = ['item'];
export const BlockTypes: BlockType[] = ['activator_rail', 'anvil', 'barrel', 'button', 'cluster', 'cube', 'door', 'fence_gate', 'fence', 'pillar', 'pressure_plate', 'sapling', 'sign', 'slab', 'stairs', 'stem', 'trapdoor', 'wall'];

export function isItem(content: IContent<ModCacher>): content is IItem<ModCacher> {
    return ItemTypes.includes(content.type as ItemType);
}

export function isBlock(content: IContent<ModCacher>): content is IBlock<ModCacher, IItem<ModCacher>> {
    return BlockTypes.includes(content.type as BlockType);
}