import './styles/mods.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { Input } from '@chrisofnormandy/confects/inputs';
import { Nav, PageMain } from '@chrisofnormandy/confects/containers';
import { themes } from '@chrisofnormandy/confetti/themes';
import { useState, useActionState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router';
import { Heading, Icon } from '@chrisofnormandy/confects/decorations';

export default function Mods() {

    const { namespace } = useParams();
    const navigate = useNavigate();

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

        return () => {
            dbInstance.close();
            setDb(undefined);
        }
    };

    useEffect(() => {
        init().catch(console.error);
    }, []);

    useEffect(() => {
        if (!db)
            return;

        const transaction = db.transaction('namespaces', 'readonly');
        const store = transaction.objectStore('namespaces');
        const request = store.getAll();

        request.onsuccess = (event) => {
            const nsFromDb = (event.target as IDBRequest).result as { id: string }[];
            setNamespaces(new Set(nsFromDb.map(({ id }) => id)));
        };
    }, [db, namespace]);

    const [newModError, newModSubmitAction, newModPending] = useActionState<Error | null, FormData>(
        (_previousState, formData) => {
            if (!db)
                return new Error('Database not initialized');

            const modName = formData.get('mod_name') as string;

            if (modName.length === 0)
                return new Error('Mod name cannot be empty');

            if (namespaces.has(modName))
                return new Error('Mod name already exists');

            namespaces.add(modName);
            setNamespaces(namespaces);

            const transaction = db.transaction('namespaces', 'readwrite');
            const store = transaction.objectStore('namespaces');
            store.add({
                id: modName
            });

            navigate('/mods/' + modName);

            return null;
        },
        null
    );

    return <PageMain
        className={getClassName('mods', !namespace && 'landing', themes.getStyles({ background: { style: 'body' } }))}
    >
        {newModError && newModError.message}

        <Nav
            className={getClassName(themes.getStyles({ background: { style: 'primary' } }))}
        >
            <span>
                Mods:
            </span>

            {
                Array.from(namespaces).map((modName) => {
                    return <NavLink
                        key={modName}
                        to={'/mods/' + modName}
                    >
                        <Button
                            theme={{ background: { style: 'trinary' }, border: { style: 'trinary' } }}
                        >
                            {modName}
                        </Button>
                    </NavLink>;
                })
            }
        </Nav>

        {
            !namespace &&
            <form
                className={getClassName('mod-creation-form', themes.getStyles({ background: { style: 'secondary' } }))}
                id='new_mod_form'
                action={newModSubmitAction}
            >
                <Heading>
                    New Mod
                </Heading>

                <div
                    className='fields'
                >
                    <Input
                        className={themes.getBasicStyling('primary')}
                        name='mod_name'
                        pattern={/^[a-z0-9_]+$/.source}
                        placeholder='Mod Name'
                        required
                    />
                </div>

                <Button
                    submit='new_mod_form'
                    disabled={newModPending}
                    theme={{ background: { style: 'success' }, border: { style: 'success' } }}
                >
                    <span>
                        Create
                    </span>

                    <Icon
                        icon='chevron-right'
                    />
                </Button>
            </form>
        }

        <Outlet />
    </PageMain>;
}
