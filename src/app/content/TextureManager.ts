import { base64ToFile } from '../helpers/images';
import { BlockModel, IContent, isItem, ItemModel, ModeledContent } from './types';
import ModCacher from './ModCacher';

export class TextureManager<M extends ModCacher, K extends (ItemModel | BlockModel), T extends ModeledContent<K> & IContent<M>> {

    private readonly parent: T;

    private readonly defaultTexture: string;

    add(...textures: [string, string][]) {
        textures.forEach(([key, value]) => {
            this.parent.mod.addTexture(key, value);
        });

        return this;
    }

    delete(name: string) {
        this.parent.mod.deleteTexture(name);

        return this;
    }

    file(): File[] {
        return Array.from(this.keys()).map(([, value]) => {
            const mapping = this.parent.mod.getTexture(value);
            if (mapping) {
                const path = isItem(this.parent)
                    ? this.parent.mod.paths.itemTexture(value + '.png')
                    : this.parent.mod.paths.blockTexture(value + '.png');

                return base64ToFile(path, mapping);
            }

            return null;
        }).filter(Boolean) as File[];
    }

    /**
     *
     * @returns A Map of texture names and the model texture key it's assigned to.
     */
    entries(): Map<string, string> {
        const models = this.parent.model.json();
        const mappedTextures = models.map((json) => Object.entries(json.textures || { default: this.defaultTexture })).flat(1) as [string, string][];

        const list = mappedTextures
            .filter(([, path]) => path.split(':')[0] === this.parent.mod.getName())
            .map(([key, path]) => [path.split('/')[1], key]) as [string, string][];// REFACTOR

        return new Map<string, string>(list);
    }

    /**
     *
     * @returns A Map of model texture keys and the texture name being used.
     */
    keys() {
        const models = this.parent.model.json();
        const mappedTextures = models.map((json) => Object.entries(json.textures || { default: this.defaultTexture })).flat(1) as [string, string][];

        const list = mappedTextures
            .filter(([, path]) => path.split(':')[0] === this.parent.mod.getName())
            .map(([key, path]) => [key, path.split('/')[1]]) as [string, string][];// REFACTOR

        return new Map<string, string>(list);
    }

    /**
     * Model texture key : Texture name with namespace
     */
    private textureMapping = new Map<string, string>();

    generateMappings() {
        const models = this.parent.model.json();
        const mappedTextures = models.map((json) => Object.entries(json.textures || { default: this.defaultTexture })).flat(1) as [string, string][];

        const list = mappedTextures
            .filter(([, path]) => path.split(':')[0] === this.parent.mod.getName())
            .map(([key, path]) => [key, path]) as [string, string][];// REFACTOR

        this.textureMapping = new Map(list);
    }

    constructor(parent: T, defaultTexture: string) {
        this.parent = parent;
        this.defaultTexture = defaultTexture;
    }
}