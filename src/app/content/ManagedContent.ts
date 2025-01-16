import { ManagedContentData } from './types';

export class ManagedContent<T extends object> {

    private defaultPath: () => string;

    private data: (() => ManagedContentData<T>)[];

    add(...data: (() => ManagedContentData<T>)[]) {
        this.data.push(...data);

        return this;
    }

    clear() {
        this.data = [];

        return this;
    }

    set(...data: (() => ManagedContentData<T>)[]) {
        return this.clear().add(...data);
    }

    json() {
        return this.data.map((fn) => fn().data);
    }

    file() {
        return this.data.map((fn) => {
            const { path, data } = fn();

            return new File([JSON.stringify(data, null, 4)], path || this.defaultPath(), { type: 'application/json' });
        });
    }

    constructor(defaultPath: () => string, data?: (() => ManagedContentData<T>)[]) {
        this.defaultPath = defaultPath;
        this.data = data || [];
    }
}