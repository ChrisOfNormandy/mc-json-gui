import { BlockType, IBlock } from './blocks/IBlock';
import { IItem, ItemType } from './items/IItem';
import ModCacher from './ModCacher';

export interface BlocksTableSchema { id: string; name: string; type: BlockType, textures: string }
export interface ItemsTableSchema { id: string; name: string; type: ItemType, textures: string }

export interface CachedData {
    blockCache: Map<string, IBlock<ModCacher>>
    itemCache: Map<string, IItem<ModCacher>>
}