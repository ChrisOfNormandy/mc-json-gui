import ModDef from './ModDef';

export default class Tags {
    private readonly mod: ModDef;

    private buttonsTag() {
        const stairs = {
            replace: false,
            values: Array.from(this.mod.blockCache.values()).filter((block) => block.type === 'button').map((block) => `${this.mod.getName()}:${block.name}_button`)
        };

        if (stairs.values.length === 0)
            return [];

        return [
            new File([JSON.stringify(stairs, null, 4)], this.mod.paths.blocksTags('buttons.json'), { type: 'application/json' }),
            new File([JSON.stringify(stairs, null, 4)], this.mod.paths.itemsTags('buttons.json'), { type: 'application/json' })
        ];

        // wooden_stairs
    }

    private slabsTag() {
        const stairs = {
            replace: false,
            values: Array.from(this.mod.blockCache.values()).filter((block) => block.type === 'slab').map((block) => `${this.mod.getName()}:${block.name}_slab`)
        };

        if (stairs.values.length === 0)
            return [];

        return [
            new File([JSON.stringify(stairs, null, 4)], this.mod.paths.blocksTags('slabs.json'), { type: 'application/json' }),
            new File([JSON.stringify(stairs, null, 4)], this.mod.paths.itemsTags('slabs.json'), { type: 'application/json' })
        ];

        // wooden_slabs
    }

    private stairsTag() {
        const stairs = {
            replace: false,
            values: Array.from(this.mod.blockCache.values()).filter((block) => block.type === 'stairs').map((block) => `${this.mod.getName()}:${block.name}_stairs`)
        };

        if (stairs.values.length === 0)
            return [];

        return [
            new File([JSON.stringify(stairs, null, 4)], this.mod.paths.blocksTags('stairs.json'), { type: 'application/json' }),
            new File([JSON.stringify(stairs, null, 4)], this.mod.paths.itemsTags('stairs.json'), { type: 'application/json' })
        ];

        // wooden_stairs
    }

    private wallsTag() {
        const walls = {
            replace: false,
            values: Array.from(this.mod.blockCache.values()).filter((block) => block.type === 'wall').map((block) => `${this.mod.getName()}:${block.name}_wall`)
        };

        if (walls.values.length === 0)
            return [];

        return [
            new File([JSON.stringify(walls, null, 4)], this.mod.paths.blocksTags('walls.json'), { type: 'application/json' }),
            new File([JSON.stringify(walls, null, 4)], this.mod.paths.itemsTags('walls.json'), { type: 'application/json' })
        ];
    }

    get() {
        return [
            ...this.buttonsTag(),
            ...this.slabsTag(),
            ...this.stairsTag(),
            ...this.wallsTag()
        ];
    }

    constructor(mod: ModDef) {
        this.mod = mod;
    }
}