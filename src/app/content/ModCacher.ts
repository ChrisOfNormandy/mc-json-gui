import { BlocksTableSchema, CachedData, ItemsTableSchema } from './types';
import { BlockType, IBlock } from './blocks/IBlock';
import { IItem, ItemType } from './items/IItem';
import ActivatorRailDef from './blocks/ActivatorRailDef';
import AnvilDef from './blocks/AnvilDef';
import BarrelDef from './blocks/BarrelDef';
import BlockDef from './blocks/BlockDef';
import ButtonDef from './blocks/ButtonDef';
import ClusterDef from './blocks/ClusterDef';
import DoorDef from './blocks/DoorDef';
import FenceDef from './blocks/FenceDef';
import FenceGateDef from './blocks/FenceGateDef';
import ItemDef from './items/ItemDef';
import Paths from './Paths';
import PillarBlockDef from './blocks/PillarBlockDef';
import PressurePlateDef from './blocks/PressurePlateDef';
import SaplingDef from './blocks/SaplingDef';
import SignDef from './blocks/SignDef';
import SlabDef from './blocks/SlabDef';
import StairsDef from './blocks/StairsDef';
import StemDef from './blocks/StemDef';
import TrapdoorDef from './blocks/TrapdoorDef';
import WallDef from './blocks/WallDef';
import JSZip from 'jszip';
import { downloadFile } from '@chrisofnormandy/confects/helpers';

export default class ModCacher {
    private name: string;

    private updater: (data: CachedData) => void;

    readonly blockCache = new Map<string, IBlock<ModCacher>>();

    readonly itemCache = new Map<string, IItem<ModCacher>>();

    private db: IDBDatabase | null = null;

    readonly paths = new Paths(this);

    getName() {
        return this.name;
    }

    private async initDb() {
        this.db = await new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open(`ns_${this.name}`, 1);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                db.createObjectStore('blocks', { keyPath: 'id' });
                db.createObjectStore('items', { keyPath: 'id' });
            };

            request.onsuccess = (event) => {
                resolve((event.target as IDBOpenDBRequest).result);
            };

            request.onerror = (event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };
        });
    }

    loadItemFromSchema({ id, name, type, textures }: ItemsTableSchema) {
        const useTextures = textures
            ? JSON.parse(textures) as [string, string][]
            : [];

        switch (type) {
            case 'item': return this.addItem(new ItemDef(this, name, id).addTextures(useTextures), false);
            default: return console.warn(`Unknown item type: ${type}`, false);
        }
    }

    loadBlockFromSchema({ id, name, type, textures }: BlocksTableSchema) {
        const useTextures = textures
            ? JSON.parse(textures) as [string, string][]
            : [];

        switch (type) {
            case 'activator_rail': return this.addBlock(new ActivatorRailDef(this, name, id).addTextures(useTextures), false);
            case 'anvil': return this.addBlock(new AnvilDef(this, name, id).addTextures(useTextures), false);
            case 'barrel': return this.addBlock(new BarrelDef(this, name, id).addTextures(useTextures), false);
            case 'button': return this.addBlock(new ButtonDef(this, name, id).addTextures(useTextures), false);
            case 'cluster': return this.addBlock(new ClusterDef(this, name, id).addTextures(useTextures), false);
            case 'cube': return this.addBlock(new BlockDef(this, name, id).addTextures(useTextures), false);
            case 'door': return this.addBlock(new DoorDef(this, name, id).addTextures(useTextures), false);
            case 'fence_gate': return this.addBlock(new FenceGateDef(this, name, id).addTextures(useTextures), false);
            case 'fence': return this.addBlock(new FenceDef(this, name, id).addTextures(useTextures), false);
            case 'pillar': return this.addBlock(new PillarBlockDef(this, name, id).addTextures(useTextures), false);
            case 'pressure_plate': return this.addBlock(new PressurePlateDef(this, name, id).addTextures(useTextures), false);
            case 'sapling': return this.addBlock(new SaplingDef(this, name, id).addTextures(useTextures), false);
            case 'sign': return this.addBlock(new SignDef(this, name, id).addTextures(useTextures), false);
            case 'slab': return this.addBlock(new SlabDef(this, name, id).addTextures(useTextures), false);
            case 'stairs': return this.addBlock(new StairsDef(this, name, id).addTextures(useTextures), false);
            case 'stem': return this.addBlock(new StemDef(this, name, id).addTextures(useTextures), false);
            case 'trapdoor': return this.addBlock(new TrapdoorDef(this, name, id).addTextures(useTextures), false);
            case 'wall': return this.addBlock(new WallDef(this, name, id).addTextures(useTextures), false);
            default: return console.warn(`Unknown block type: ${type}`, false);
        }
    }

    private readBlocksFromDatabase() {
        return new Promise<BlocksTableSchema[]>((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));

                return;
            }

            const transaction = this.db.transaction('blocks', 'readonly');
            const store = transaction.objectStore('blocks');
            const request = store.getAll();

            request.onsuccess = (event) => {
                resolve((event.target as IDBRequest).result as BlocksTableSchema[]);
            };

            request.onerror = (event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    }

    private readItemsFromDatabase() {
        return new Promise<ItemsTableSchema[]>((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));

                return;
            }

            const transaction = this.db.transaction('items', 'readonly');
            const store = transaction.objectStore('items');
            const request = store.getAll();

            request.onsuccess = (event) => {
                resolve((event.target as IDBRequest).result as ItemsTableSchema[]);
            };

            request.onerror = (event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    }

    private async loadFromDatabase() {
        const blocks = await this.readBlocksFromDatabase();
        blocks.forEach((schema) => this.loadBlockFromSchema(schema));

        const items = await this.readItemsFromDatabase();
        items.forEach((schema) => this.loadItemFromSchema(schema));
    }

    private storeBlocks() {
        return new Promise<void>((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));

                return;
            }

            const transaction = this.db.transaction('blocks', 'readwrite');
            const store = transaction.objectStore('blocks');
            store.clear();

            this.blockCache.forEach((block) => {
                store.put({
                    id: block.id,
                    name: block.name,
                    type: block.type,
                    textures: JSON.stringify(Array.from(block.textureCache))
                });
            });

            transaction.oncomplete = () => {
                resolve();
            };

            transaction.onerror = (event) => {
                reject((event.target as IDBTransaction).error);
            };
        });
    }

    private storeItems() {
        return new Promise<void>((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));

                return;
            }

            const transaction = this.db.transaction('items', 'readwrite');
            const store = transaction.objectStore('items');
            store.clear();

            this.itemCache.forEach((item) => {
                store.put({
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    textures: JSON.stringify(Array.from(item.textureCache))
                });
            });

            transaction.oncomplete = () => {
                resolve();
            };

            transaction.onerror = (event) => {
                reject((event.target as IDBTransaction).error);
            };
        });
    }

    addItem(content: IItem<ModCacher>, runEvent = true) {
        this.itemCache.set(content.id, content);
        if (runEvent)
            this.storeItems();
    }

    deleteItem(id: string) {
        this.itemCache.delete(id);
        this.storeItems();
    }

    addBlock(content: IBlock<ModCacher>, runEvent = true) {
        this.blockCache.set(content.id, content);
        if (runEvent)
            this.storeBlocks();
    }

    deleteBlock(id: string) {
        this.blockCache.delete(id);
        this.storeBlocks();
    }

    update() {
        this.storeBlocks();
        this.storeItems();

        if (!this.updater)
            return;

        const cacheData: CachedData = {
            blockCache: this.blockCache,
            itemCache: this.itemCache
        };

        this.updater(cacheData);
    }

    getBlock(name: string, type?: BlockType) {
        return Array.from(this.blockCache.values()).filter((block) => block.name === name && (!type || block.type === type));
    }

    getItem(name: string, type?: ItemType) {
        return Array.from(this.itemCache.values()).filter((item) => item.name === name && (!type || item.type === type));
    }

    async exportDatabase() {
        const zip = new JSZip();

        const blocks = await this.readBlocksFromDatabase();
        const items = await this.readItemsFromDatabase();

        zip.file('meta.json', JSON.stringify({ namespace: this.name }));
        zip.file('blocks.json', JSON.stringify(blocks));
        zip.file('items.json', JSON.stringify(items));

        const zipContent = await zip.generateAsync({ type: 'blob' });
        const zipFile = new File([zipContent], `${this.name}_export.zip`);

        downloadFile(zipFile);
    }

    async importDatabase(file: File) {
        const zip = await JSZip.loadAsync(file);

        const meta = JSON.parse(await zip.file('meta.json')?.async('text') || '{}');
        if (!meta.namespace)
            throw new Error('Missing namespace meta data');

        this.name = meta.namespace;

        const blocks = JSON.parse(await zip.file('blocks.json')?.async('text') || '[]') as BlocksTableSchema[];
        const items = JSON.parse(await zip.file('items.json')?.async('text') || '[]') as ItemsTableSchema[];

        blocks.forEach((schema) => this.loadBlockFromSchema(schema));
        items.forEach((schema) => this.loadItemFromSchema(schema));

        this.update(); // This writes the new database using the imported namespace.
    }

    destroy() {
        if (!this.db)
            return;

        this.db.close();
    }

    async delete() {
        this.destroy();

        const dbInstance = await new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open('app-data', 1);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                db.createObjectStore('namespaces', { keyPath: 'id' });
            };

            request.onsuccess = (event) => {
                resolve((event.target as IDBOpenDBRequest).result);
            };

            request.onerror = (event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };
        });

        const transaction = dbInstance.transaction('namespaces', 'readwrite');
        const store = transaction.objectStore('namespaces');
        store.delete(this.name);

        transaction.oncomplete = () => {
            dbInstance.close();

            indexedDB.deleteDatabase(`ns_${this.name}`);
        };
    }

    constructor(name: string, updater: (data: CachedData) => void) {
        this.name = name;

        if (name === '_temp') {
            this.updater = () => { console.debug('Unimplemented'); };
            // Do not init temp mod definitions.
            // This will be loaded from an import.
        }
        else {
            this.updater = updater;
            this.initDb()
                .then(() => this.loadFromDatabase())
                .catch(console.error)
                .finally(() => {
                    localStorage.setItem('mod', name);
                    this.update();
                });
        }
    }
}