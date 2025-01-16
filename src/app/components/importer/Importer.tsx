import './styles/importer.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { Heading, Icon } from '@chrisofnormandy/confects/decorations';
import { Input } from '@chrisofnormandy/confects/inputs';
import { useActionState } from 'react';
import { useAppData } from '../app-data/AppDataProvider';
import { useNavigate } from 'react-router';
import ModDef from '../../content/ModDef';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { themes } from '@chrisofnormandy/confetti/themes';

export default function Importer() {

    const navigate = useNavigate();
    const { addNamespace } = useAppData();

    const [importDbError, importDbSubmitAction, importDbPending] = useActionState<Error | null, FormData>(
        async (_previousState, formData) => {
            const file = formData.get('import_file') as File;

            try {
                const importMod = new ModDef('_temp', () => { console.debug(''); });

                await importMod.importDatabase(file);
                addNamespace(importMod.getName());

                navigate(`/mods/${importMod.getName()}`);
            }
            catch (err) {
                console.error(err);

                if (err instanceof Error)
                    return err;
            }

            return null;
        },
        null
    );

    const [importResourcesError, importResourcesSubmitAction, importResourcesPending] = useActionState<Error | null, FormData>(
        async (_previousState, formData) => {
            const name = formData.get('namespace') as string;
            const file = formData.get('import_file') as File;

            try {
                const importMod = new ModDef('_temp', () => { console.debug(''); });

                await importMod.importResources(file, name);
                addNamespace(importMod.getName());

                navigate(`/mods/${importMod.getName()}`);
            }
            catch (err) {
                console.error(err);

                if (err instanceof Error)
                    return err;
            }

            return null;
        },
        null
    );

    return <div
        className='importer'
    >
        <Heading>
            Importer
        </Heading>

        <form
            id='import_db_form'
            className='importer-form'
            action={importDbSubmitAction}
        >
            <Heading
                level={4}
            >
                Import Database
            </Heading>

            {importDbError && importDbError.message}

            <Input
                type='file'
                name='import_file'
                required
            />

            <Button
                submit='import_db_form'
                disabled={importDbPending}
                theme={{ background: { style: 'success' },
border: { style: 'success' } }}
            >
                <Icon
                    icon='box-arrow-in-right'
                />

                <span>
                    Import
                </span>
            </Button>
        </form>

        <form
            id='import_resources_form'
            className='importer-form'
            action={importResourcesSubmitAction}
        >
            <Heading
                level={4}
            >
                Import Resources
            </Heading>

            {importResourcesError && importResourcesError.message}

            <Input
                name='namespace'
                pattern={/^[a-z0-9_]+$/.source}
                type='text'
                placeholder='Mod Name'
                className={getClassName(themes.getBasicStyling('body'))}
            />

            <Input
                type='file'
                name='import_file'
                required
            />

            <Button
                submit='import_resources_form'
                disabled={importResourcesPending}
                theme={{ background: { style: 'success' },
border: { style: 'success' } }}
            >
                <Icon
                    icon='box-arrow-in-right'
                />

                <span>
                    Import
                </span>
            </Button>
        </form>
    </div>;
}