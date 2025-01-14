import { v4 } from 'uuid';
import ModCacher from '../ModCacher';
import { base64ToFile } from '../../helpers/images';

export type ItemType = 'item';

export interface IItem<M extends ModCacher> {
    addTextures(textures: [string, string][]): IItem<M>
    id: string
    mod: M
    model(): File[]
    name: string
    recipe(): File[]
    textureCache: Map<string, string>
    textures(): File[]
    type: ItemType
}

export default class ItemBase<M extends ModCacher> implements IItem<M> {
    readonly id: string;

    readonly mod: M;

    readonly name: string;

    readonly type: ItemType;

    readonly textureCache = new Map<string, string>();

    getName() {
        return this.name;
    }

    model(): File[] {
        return [];
    }

    recipe(): File[] {
        return [];
    }

    textures() {
        return Array.from(this.textureCache).map(([name, base64]) => base64ToFile(this.mod.paths.itemTexture(`${name}.png`), base64));
    }

    addTextures(textures: [string, string][]) {
        textures.forEach(([name, base64]) => this.textureCache.set(name, base64));

        return this;
    }

    constructor(mod: M, name: string, type: ItemType, id?: string) {
        this.mod = mod;
        this.name = name;
        this.type = type;
        this.id = id || v4();
    }
}