import { BlockType, ItemType } from './types';
import ModCacher from './ModCacher';
import Tags from './Tags';

export default class ModDef extends ModCacher {

    private readonly tagCreator = new Tags(this);

    addBlockFormData(formData: FormData): Error | null {
        const blockName = formData.get('block_name') as string;
        const blockType = formData.get('block_type') as BlockType;

        if (blockName.length === 0)
            return new Error('Block name cannot be empty');

        if (blockType.length === 0)
            return new Error('Block type cannot be empty');

        this.loadBlockFromSchema({
            id: '',
            name: blockName,
            type: blockType
        });

        this.update();

        return null;
    }

    addItemFormData(formData: FormData): Error | null {
        const itemName = formData.get('item_name') as string;
        const itemType = formData.get('item_type') as ItemType;

        if (itemName.length === 0)
            return new Error('Item name cannot be empty');

        if (itemType.length === 0)
            return new Error('Item type cannot be empty');

        this.loadItemFromSchema({
            id: '',
            name: itemName,
            type: itemType
        });

        this.update();

        return null;
    }

    blockStates() {
        return Array.from(this.blockCache.values()).map((block) => block.blockState.file()).flat(1);
    }

    models() {
        return [
            ...Array.from(this.blockCache.values()).map((block) => block.model.file()).flat(1),
            ...Array.from(this.blockCache.values()).map((block) => block.item.model.file()).flat(1),
            ...Array.from(this.itemCache.values()).map((item) => item.model.file()).flat(1)
        ];
    }

    lang() {
        const obj: Record<string, string> = {};

        this.blockCache.forEach((_value, name) => {
            obj[`block.${this.getName()}.${name}`] = name;
        });

        this.itemCache.forEach((_value, name) => {
            obj[`item.${this.getName()}.${name}`] = name;
        });

        return new File([JSON.stringify(obj, null, 4)], this.paths.langs('en_us.json'), { type: 'application/json' });
    }

    tags() {
        return this.tagCreator.get();
    }

    recipes() {
        return [
            ...Array.from(this.blockCache.values()).map((block) => block.recipe.file()).flat(1),
            ...Array.from(this.itemCache.values()).map((item) => item.recipe.file()).flat(1)
        ];
    }

    lootTables() {
        return Array.from(this.blockCache.values()).map((block) => block.lootTable.file()).flat(1);
    }

    textures() {
        return [
            ...Array.from(this.blockCache.values()).map((block) => block.textures.file()).flat(1),
            ...Array.from(this.itemCache.values()).map((item) => item.textures.file()).flat(1)
        ];
    }
}