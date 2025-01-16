import { base64ToFile } from '../helpers/images';
import ModCacher from './ModCacher';
import { BlockModel, IContent, isItem, ItemModel, ModeledContent } from './types';

export class TextureManager<M extends ModCacher, K extends (ItemModel | BlockModel), T extends ModeledContent<K> & IContent<M>> {

    private readonly parent: T;

    add(...textures: [string, string][]) {
        textures.forEach(([key, value]) => {
            console.debug('Assign texture', key, 'to', this.parent.getName());

            this.parent.mod.addTexture(key, value);
        });

        return this;
    }

    delete(name: string) {
        this.parent.mod.deleteTexture(name);

        return this;
    }

    file(): File[] {
        return Array.from(this.keys()).map(([key, value]) => {
            console.debug('Get texture', key, 'for', this.parent.getName(), 'as', value);

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

    entries(): Map<string, string> {
        const models = this.parent.model.json();
        const defaultTexture = isItem(this.parent)
            ? `${this.parent.mod.getName()}:item/${this.parent.name}`
            : `${this.parent.mod.getName()}:block/${this.parent.name}`;

        const mappedTextures = models.map((json) => Object.entries(json.textures || { default: defaultTexture })).flat(1) as [string, string][];

        const list = mappedTextures
            .filter(([, path]) => path.split(':')[0] === this.parent.mod.getName())
            .map(([key, path]) => [path.split('/')[1], key]) as [string, string][];// REFACTOR

        return new Map<string, string>(list);
    }

    keys() {
        const models = this.parent.model.json();
        const defaultTexture = isItem(this.parent)
            ? `${this.parent.mod.getName()}:item/${this.parent.name}`
            : `${this.parent.mod.getName()}:block/${this.parent.name}`;

        const mappedTextures = models.map((json) => Object.entries(json.textures || { default: defaultTexture })).flat(1) as [string, string][];

        const list = mappedTextures
            .filter(([, path]) => path.split(':')[0] === this.parent.mod.getName())
            .map(([key, path]) => [key, path.split('/')[1]]) as [string, string][];// REFACTOR

        return new Map<string, string>(list);
    }

    constructor(parent: T) {
        this.parent = parent;
    }
}