import ModCacher from './ModCacher';

export default class Paths<M extends ModCacher> {
    private readonly mod: M;

    blockStates(path?: string) {
        return `resources/assets/${this.mod.getName()}/blockstates/${path || ''}`;
    }

    langs(path?: string) {
        return `resources/assets/${this.mod.getName()}/lang/${path || ''}`;
    }

    blockModels(path?: string) {
        return `resources/assets/${this.mod.getName()}/models/block/${path || ''}`;
    }

    itemModels(path?: string) {
        return `resources/assets/${this.mod.getName()}/models/item/${path || ''}`;
    }

    blocksLootTables(path?: string) {
        return `resources/data/${this.mod.getName()}/loot_tables/blocks/${path || ''}`;
    }

    chestsLootTables(path?: string) {
        return `resources/data/${this.mod.getName()}/loot_tables/chests/${path || ''}`;
    }

    entityLootTables(path?: string) {
        return `resources/data/${this.mod.getName()}/loot_tables/entities/${path || ''}`;
    }

    gameplayLootTables(path?: string) {
        return `resources/data/${this.mod.getName()}/loot_tables/gameplay/${path || ''}`;
    }

    recipes(path?: string) {
        return `resources/data/${this.mod.getName()}/recipes/${path || ''}`;
    }

    blocksTags(path?: string) {
        return `resources/data/${this.mod.getName()}/tags/blocks/${path || ''}`;
    }

    itemsTags(path?: string) {
        return `resources/data/${this.mod.getName()}/tags/blocks/${path || ''}`;
    }

    blockTexture(path?: string) {
        return `resources/assets/${this.mod.getName()}/textures/block/${path || ''}`;
    }

    itemTexture(path?: string) {
        return `resources/assets/${this.mod.getName()}/textures/item/${path || ''}`;
    }

    constructor(mod: M) {
        this.mod = mod;
    }
}