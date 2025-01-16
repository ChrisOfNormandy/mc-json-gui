import { BlocksTableSchema, BlockType, ItemsTableSchema, ItemType } from './types';
import JSZip, { JSZipObject } from 'jszip';

interface ExpectedModelSchema {
    parent: string
}

const SUFFIXES_PATTERN = /_((wall)|(button)|(stairs)|(slab)|(fence)|(fence_gate)|(pressure_plate))/g;

async function readBlockModelJson(file: JSZip.JSZipObject): Promise<[string, BlockType] | undefined> {
    if (!file)
        return undefined;

    const [path, ext] = file.name.split('/').slice(-1)[0].split('.');

    if (ext !== 'json')
        return undefined;

    const [name] = path.split(SUFFIXES_PATTERN);
    if (!name)
        return undefined;

    const fileData = await file.async('text');
    if (!fileData)
        return undefined;

    try {
        const modelData = JSON.parse(fileData) as ExpectedModelSchema;
        if (!modelData.parent)
            return undefined;

        const parent = modelData.parent.split('/')[1];

        // console.debug('Found block model:', name, parent);

        switch (parent) {
            case 'button_inventory':
            case 'button_pressed_inventory':
            case 'button': return [name, 'button'];
            case 'pressure_plate_down':
            case 'pressure_plate_up': return [name, 'pressure_plate'];
            case 'slab_top':
            case 'slab': return [name, 'slab'];
            case 'inner':
            case 'outer':
            case 'stairs': return [name, 'stairs'];
            case 'wall_inventory':
            case 'template_post':
            case 'template_side_tall':
            case 'template_side': return [name, 'wall'];
            default: return [name, 'cube'];
        }
    }
    catch (err) {
        console.error(err);
        console.debug(fileData);
    }

    return undefined;
}

async function readItemModelJson(file: JSZip.JSZipObject): Promise<[string, ItemType] | undefined> {
    if (!file)
        return undefined;

    const [path, ext] = file.name.split('/').slice(-1)[0].split('.');

    if (ext !== 'json')
        return undefined;

    const [name] = path.split(SUFFIXES_PATTERN);
    if (!name)
        return undefined;

    const fileData = await file.async('text');
    if (!fileData)
        return undefined;

    try {
        const modelData = JSON.parse(fileData) as ExpectedModelSchema;
        if (!modelData.parent)
            return undefined;

        const parent = modelData.parent.split('/')[1];

        // console.debug('Found item model:', name, parent);

        switch (parent) {
            default: return [name, 'item'];
        }
    }
    catch (err) {
        console.error(err);
        console.debug(fileData);
    }

    return undefined;
}

export function getResourcesNamespaces(folder: JSZip) {
    console.debug('Getting resource folder namespaces');

    const namespaces = new Set<string>();

    folder.forEach((path) => {
        const [namespace] = path.split('/');
        if (namespace !== 'minecraft')
            namespaces.add(namespace);
    });

    console.debug('Returning namespaces:', namespaces);

    return namespaces;
}

async function readTexture(file: JSZipObject): Promise<[string, string] | undefined> {
    if (!file)
        return undefined;

    const [name, ext] = file.name.split('/').slice(-1)[0].split('.');

    if (ext !== 'png')
        return undefined;

    const content = await file.async('base64');
    if (!content)
        return undefined;

    return [name, content];
}

export async function processAssetsResources(namespaceFolder: JSZip) {
    console.debug('Processing assets folder:', namespaceFolder.name);

    // const blockstates = namespaceFolder.folder('blockstates');
    // const lang = namespaceFolder.folder('lang');
    const models = namespaceFolder.folder('models');
    const textures = namespaceFolder.folder('textures');

    const blocks: BlocksTableSchema[] = [];
    const items: ItemsTableSchema[] = [];
    const blockListings = new Set<string>();
    const itemListings = new Set<string>();

    if (models) {
        const blockModels = models.folder('block');
        const itemModels = models.folder('item');

        if (blockModels) {
            const content = await Promise.all(blockModels.filter(Boolean).map((file) => readBlockModelJson(file)));

            console.log('Found', content.length, 'block model registries');

            content.forEach((c) => {
                if (!c)
                    return;

                const [name, type] = c;
                const listing = c.join(':');
                if (!blockListings.has(listing)) {
                    blockListings.add(name + ':' + type);
                    blocks.push({
                        id: '',
                        name,
                        type
                    });
                }
            });
        }

        if (itemModels) {
            const content = await Promise.all(itemModels.filter(Boolean).map((file) => readItemModelJson(file)));

            console.log('Found', content.length, 'item model registries');

            content.forEach((c) => {
                if (!c || blockListings.has(c.join(':')))
                    return;

                const [name, type] = c;
                const listing = c.join(':');
                if (!itemListings.has(listing)) {
                    itemListings.add(name + ':' + type);
                    items.push({
                        id: '',
                        name,
                        type
                    });
                }
            });
        }
    }

    const blockTexturesMap = new Map<string, string>();
    const itemTexturesMap = new Map<string, string>();

    if (textures) {
        const blockTextures = textures.folder('block');
        const itemTextures = textures.folder('item');

        if (blockTextures) {
            const content = await Promise.all(blockTextures.filter(Boolean).map((file) => readTexture(file)));

            console.log('Found', content.length, 'texture files');

            content.forEach((c) => {
                if (!c)
                    return;

                const [name, base64] = c;
                blockTexturesMap.set(name, base64);
            });
        }

        if (itemTextures) {
            const content = await Promise.all(itemTextures.filter(Boolean).map((file) => readTexture(file)));

            console.log('Found', content.length, 'texture files');

            content.forEach((c) => {
                if (!c)
                    return;

                const [name, base64] = c;
                itemTexturesMap.set(name, base64);
            });
        }
    }

    console.log('Gathered', blocks.length, 'blocks and', items.length, 'items with', blockTexturesMap.size, 'block textures and', itemTexturesMap.size, 'item textures');

    return {
        blockListings,
        itemListings,
        blocks,
        items,
        blockTextures: blockTexturesMap,
        itemTextures: itemTexturesMap
    };
}

