import { AppDataContext } from '../components/app-data/AppDataProvider';
import { BlocksTableSchema, BlockType, CachedData, ItemsTableSchema, ItemType, TexturesTableSchema } from './types';
import { downloadFile } from '@chrisofnormandy/confects/helpers';
import { getResourcesNamespaces, processAssetsResources } from './helpers';
import ActivatorRailDef from './blocks/ActivatorRailDef';
import AnvilDef from './blocks/AnvilDef';
import BarrelDef from './blocks/BarrelDef';
import BlockBase from './blocks/BlockBase';
import BlockDef from './blocks/BlockDef';
import ButtonDef from './blocks/ButtonDef';
import ClusterDef from './blocks/ClusterDef';
import DoorDef from './blocks/DoorDef';
import FenceDef from './blocks/FenceDef';
import FenceGateDef from './blocks/FenceGateDef';
import ItemBase from './items/ItemBase';
import ItemDef from './items/ItemDef';
import JSZip from 'jszip';
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
import { base64ToFile } from '../helpers/images';

export default class ModCacher {
    private name: string;

    private updater: (data: CachedData) => void;

    readonly textureCache = new Map<string, string>();

    readonly blockCache = new Map<string, BlockBase<ModCacher, ItemBase<ModCacher>>>();

    readonly itemCache = new Map<string, ItemBase<ModCacher>>();

    private db: IDBDatabase | null = null;

    readonly paths = new Paths(this);

    getName() {
        return this.name;
    }

    private async initDb() {
        const dbName = `ns_${this.name}`;

        console.debug('Initializing database for', this.name);

        this.db = await new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open(dbName, 1);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                db.createObjectStore('blocks', { keyPath: 'id' });
                db.createObjectStore('items', { keyPath: 'id' });
                db.createObjectStore('textures', { keyPath: 'name' });
            };

            request.onsuccess = (event) => {
                resolve((event.target as IDBOpenDBRequest).result);
            };

            request.onerror = (event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };
        });
    }

    loadItemFromSchema({ id, name, type }: ItemsTableSchema) {
        switch (type) {
            case 'item': return this.addItem(new ItemDef(this, name, id), false);
            default: return console.warn(`Unknown item type: ${type}`, false);
        }
    }

    loadBlockFromSchema({ id, name, type }: BlocksTableSchema) {
        switch (type) {
            case 'activator_rail': return this.addBlock(new ActivatorRailDef(this, name, id), false);
            case 'anvil': return this.addBlock(new AnvilDef(this, name, id), false);
            case 'barrel': return this.addBlock(new BarrelDef(this, name, id), false);
            case 'button': return this.addBlock(new ButtonDef(this, name, id), false);
            case 'cluster': return this.addBlock(new ClusterDef(this, name, id), false);
            case 'cube': return this.addBlock(new BlockDef(this, name, id), false);
            case 'door': return this.addBlock(new DoorDef(this, name, id), false);
            case 'fence_gate': return this.addBlock(new FenceGateDef(this, name, id), false);
            case 'fence': return this.addBlock(new FenceDef(this, name, id), false);
            case 'pillar': return this.addBlock(new PillarBlockDef(this, name, id), false);
            case 'pressure_plate': return this.addBlock(new PressurePlateDef(this, name, id), false);
            case 'sapling': return this.addBlock(new SaplingDef(this, name, id), false);
            case 'sign': return this.addBlock(new SignDef(this, name, id), false);
            case 'slab': return this.addBlock(new SlabDef(this, name, id), false);
            case 'stairs': return this.addBlock(new StairsDef(this, name, id), false);
            case 'stem': return this.addBlock(new StemDef(this, name, id), false);
            case 'trapdoor': return this.addBlock(new TrapdoorDef(this, name, id), false);
            case 'wall': return this.addBlock(new WallDef(this, name, id), false);
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

    private readTexturesFromDatabase() {
        return new Promise<TexturesTableSchema[]>((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));

                return;
            }

            const transaction = this.db.transaction('textures', 'readonly');
            const store = transaction.objectStore('textures');
            const request = store.getAll();

            request.onsuccess = (event) => {
                resolve((event.target as IDBRequest).result as TexturesTableSchema[]);
            };

            request.onerror = (event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    }

    private async loadFromDatabase() {
        const textures = await this.readTexturesFromDatabase();
        textures.forEach(({ name, base64 }) => this.addTexture(name, base64, false));

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
                    type: block.type
                });
            });

            transaction.oncomplete = () => {
                console.debug('Wrote', this.blockCache.size, 'blocks to database');
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
                    type: item.type
                });
            });

            transaction.oncomplete = () => {
                console.debug('Wrote', this.itemCache.size, 'items to database');
                resolve();
            };

            transaction.onerror = (event) => {
                reject((event.target as IDBTransaction).error);
            };
        });
    }

    private storeTextures() {
        return new Promise<void>((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));

                return;
            }

            const transaction = this.db.transaction('textures', 'readwrite');
            const store = transaction.objectStore('textures');
            store.clear();

            this.textureCache.forEach((base64, name) => {
                store.put({
                    name,
                    base64
                });
            });

            transaction.oncomplete = () => {
                console.debug('Wrote', this.textureCache.size, 'textures to database');
                resolve();
            };

            transaction.onerror = (event) => {
                reject((event.target as IDBTransaction).error);
            };
        });
    }

    addItem(content: ItemBase<ModCacher>, runEvent = true) {
        this.itemCache.set(content.id, content);
        if (runEvent)
            this.storeItems();
    }

    deleteItem(id: string) {
        this.itemCache.delete(id);
        this.storeItems();
    }

    addBlock(content: BlockBase<ModCacher, ItemBase<ModCacher>>, runEvent = true) {
        this.blockCache.set(content.id, content);
        if (runEvent)
            this.storeBlocks();
    }

    deleteBlock(id: string) {
        this.blockCache.delete(id);
        this.storeBlocks();
    }

    addTexture(name: string, base64: string, runEvent = true) {
        this.textureCache.set(name, base64);
        if (runEvent)
            this.storeTextures();
    }

    deleteTexture(name: string) {
        this.textureCache.delete(name);
        this.storeTextures();
    }

    async update() {
        console.debug('Updating database values for', this.name);

        await this.storeBlocks();
        await this.storeItems();
        await this.storeTextures();

        if (!this.updater)
            return;

        const cacheData: CachedData = {
            blockCache: this.blockCache,
            itemCache: this.itemCache,
            texturesCache: this.textureCache
        };

        this.updater(cacheData);
    }

    getBlock(name: string, type?: BlockType) {
        return Array.from(this.blockCache.values()).filter((block) => block.name === name && (!type || block.type === type));
    }

    getItem(name: string, type?: ItemType) {
        return Array.from(this.itemCache.values()).filter((item) => item.name === name && (!type || item.type === type));
    }

    getTexture(name: string) {
        return this.textureCache.get(name);
    }

    async exportDatabase() {
        const zip = new JSZip();

        const blocks = await this.readBlocksFromDatabase();
        const items = await this.readItemsFromDatabase();

        zip.file('meta.json', JSON.stringify({ namespace: this.name }));
        zip.file('blocks.json', JSON.stringify(blocks));
        zip.file('items.json', JSON.stringify(items));

        this.textureCache.forEach((base64, name) => {
            const file = base64ToFile(name, base64);
            zip.file(`textures/${name}.png`, file);
        });

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

        const textures = zip.folder('textures');
        if (textures) {
            await Promise.all(textures.filter(Boolean).map(async (texture) => {
                const name = texture.name.split('.')[0];
                const base64 = await texture.async('base64');

                this.textureCache.set(name, base64);
            }));
        }

        await this.initDb();

        this.update(); // This writes the new database using the imported namespace.
    }

    async importResources(file: File, name?: string) {
        const zip = await JSZip.loadAsync(file);

        let assets: JSZip | null = null;
        let data: JSZip | null = null;

        const resources = zip.folder('resources');
        if (resources) {
            assets = resources.folder('assets');
            data = resources.folder('data');
        }
        else {
            assets = zip.folder('assets');
            data = zip.folder('data');
        }

        if (!assets && !data)
            throw new Error('Invalid resources');

        let namespaces: Set<string> | undefined = undefined;

        if (assets) {
            namespaces = getResourcesNamespaces(assets);

            if (namespaces.size === 0)
                return;

            if (namespaces.size === 1) {
                const useName = name || namespaces.values().next().value;
                if (!useName)
                    return;

                this.name = useName;
            }

            await this.initDb();

            await Promise.all(Array.from(namespaces).map(async (namespace) => {
                const namespaceFolder = assets.folder(namespace);
                if (namespaceFolder) {
                    const content = await processAssetsResources(namespaceFolder);
                    if (!content)
                        return;

                    const { blocks, items } = content;

                    blocks.forEach((block) => this.loadBlockFromSchema(block));
                    items.forEach((item) => this.loadItemFromSchema(item));
                }
            }));
        }

        if (data) {
            if (!namespaces) {
                namespaces = getResourcesNamespaces(data);

                if (namespaces.size === 0)
                    return;

                if (namespaces.size === 1) {
                    const useName = name || namespaces.values().next().value;
                    if (!useName)
                        return;

                    this.name = useName;
                }

                await this.initDb();
            }

            const namespaceFolder = data.folder(this.name);
            if (!namespaceFolder)
                throw new Error('Invalid data - missing namespace folder');

            // const lootTables = namespaceFolder.folder('loot_tables');
            // const recipes = namespaceFolder.folder('recipes');
            // const tags = namespaceFolder.folder('tags');
        }

        this.update(); // This writes the new database using the imported namespace.
    }

    destroy() {
        if (!this.db)
            return;

        this.db.close();
    }

    delete(ctx: AppDataContext) {
        this.destroy();

        ctx.removeNamespace(this.name);

        indexedDB.deleteDatabase(`ns_${this.name}`);
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