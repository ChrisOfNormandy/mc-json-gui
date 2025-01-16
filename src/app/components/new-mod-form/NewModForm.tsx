import './styles/new-mod-form.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { Heading, Icon } from '@chrisofnormandy/confects/decorations';
import { Input } from '@chrisofnormandy/confects/inputs';
import { themes } from '@chrisofnormandy/confetti/themes';
import { useActionState } from 'react';
import { useAppData } from '../app-data/AppDataProvider';
import { useNavigate } from 'react-router';

export default function NewModForm() {

    const navigate = useNavigate();
    const { db, namespaces } = useAppData();

    const [newModError, newModSubmitAction, newModPending] = useActionState<Error | null, FormData>(
        (_previousState, formData) => {
            if (!db)
                return new Error('Database not initialized');

            const modName = formData.get('mod_name') as string;

            if (modName.length === 0)
                return new Error('Mod name cannot be empty');

            if (namespaces.has(modName))
                return new Error('Namespace already exists');

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

    return <form
        className='mod-creation-form'
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
            theme={{ background: { style: 'success' },
border: { style: 'success' } }}
        >
            <span>
                Create
            </span>

            <Icon
                icon='chevron-right'
            />
        </Button>

        {newModError && newModError.message}
    </form>;
}