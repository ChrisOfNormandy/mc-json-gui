import { IItem, ItemModel, ItemType, Recipe } from '../types';
import { ManagedContent } from '../ManagedContent';
import { TextureManager } from '../TextureManager';
import { v4 } from 'uuid';
import ModCacher from '../ModCacher';

export default class ItemBase<M extends ModCacher> implements IItem<M> {
    readonly id: string;

    readonly mod: M;

    readonly name: string;

    readonly type: ItemType;

    getName() {
        return this.name;
    }

    model = new ManagedContent<ItemModel>(
        () => this.mod.paths.itemModels(`${this.name}.json`),
        [
            () => ({
                data: {
                    parent: 'minecraft:item/generated',
                    textures: {
                        all: `${this.mod.getName()}:item/${this.getName()}`
                    }
                }
            })
        ]
    );

    recipe = new ManagedContent<Recipe>(() => this.mod.paths.recipes(`${this.name}.json`));

    textures = new TextureManager(this);

    constructor(mod: M, name: string, type: ItemType, id?: string) {
        this.mod = mod;
        this.name = name;
        this.type = type;
        this.id = id || v4();
    }
}