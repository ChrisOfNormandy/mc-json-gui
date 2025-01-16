import { HTMLElementProps } from '@chrisofnormandy/confects/types';
import { createContext, useContext, useEffect, useState } from 'react';

export interface AppDataContext {
    db: IDBDatabase | undefined;
    namespaces: Set<string>;
    addNamespace: (namespace: string) => void;
    removeNamespace: (namespace: string) => void;
}

const AppDataContext = createContext<AppDataContext | undefined>(undefined);

export function useAppData() {
    const context = useContext(AppDataContext);
    if (!context)
        throw new Error('useDatabase must be used within a DatabaseProvider');

    return context;
}

export function AppDataProvider({ children }: HTMLElementProps) {

    const [db, setDb] = useState<IDBDatabase>();
    const [namespaces, setNamespaces] = useState<Set<string>>(new Set());

    const init = async () => {
        const dbInstance = await new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open('app-data', 1);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                db.createObjectStore('namespaces', { keyPath: 'id' });
            };

            request.onsuccess = (event) => {
                resolve((event.target as IDBOpenDBRequest).result);
            };

            request.onerror = (event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };
        });

        setDb(dbInstance);
    };

    useEffect(() => {
        init().catch(console.error);

        return () => {
            if (db) {
                console.debug('Closing app data database');

                db.close();
                setDb(undefined);
            }
        };
    }, []);

    useEffect(() => {
        if (!db)
            return;

        console.debug('Loading app data database');

        const transaction = db.transaction('namespaces', 'readonly');
        const store = transaction.objectStore('namespaces');
        const request = store.getAll();

        request.onsuccess = (event) => {
            const nsFromDb = (event.target as IDBRequest).result as { id: string }[];
            setNamespaces(new Set(nsFromDb.map(({ id }) => id)));
        };
    }, [db]);

    useEffect(() => {
        console.debug('Namespaces:', namespaces);
    }, [namespaces]);

    const addNamespace = (namespace: string) => {
        if (!db)
            return;

        const transaction = db.transaction('namespaces', 'readwrite');
        const store = transaction.objectStore('namespaces');
        const request = store.add({ id: namespace });

        request.onsuccess = () => {
            setNamespaces(new Set(namespaces).add(namespace));
        };
    };

    const removeNamespace = (namespace: string) => {
        if (!db)
            return;

        const transaction = db.transaction('namespaces', 'readwrite');
        const store = transaction.objectStore('namespaces');
        const request = store.delete(namespace);

        request.onsuccess = () => {
            namespaces.delete(namespace);
            setNamespaces(namespaces);
        };
    };

    return (
        <AppDataContext.Provider
            value={
                {
                    db,
                    namespaces,
                    addNamespace,
                    removeNamespace
                }
            }
        >
            {children}
        </AppDataContext.Provider>
    );
}