import './styles/new-block-form.scss';
import { BlockType } from '../../content/types';
import { Button } from '@chrisofnormandy/confects/buttons';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { Input } from '@chrisofnormandy/confects/inputs';
import { themes } from '@chrisofnormandy/confetti/themes';
import { useActionState } from 'react';
import ModDef from '../../content/ModDef';

const BLOCK_TYPES: BlockType[] = [
    'activator_rail',
    'anvil',
    'barrel',
    'button',
    'cluster',
    'cube',
    'door',
    'fence_gate',
    'fence',
    'pillar',
    'pressure_plate',
    'sapling',
    'sign',
    'slab',
    'stairs',
    'stem',
    'trapdoor',
    'wall'
];

export default function NewBlockForm(
    {
        mod
    }: { mod: ModDef }
) {

    const [error, submitAction, isPending] = useActionState<Error | null, FormData>(
        (_previousState, formData) => {
            if (!mod)
                return new Error('No mod selected');

            return mod.addBlockFormData(formData);
        },
        null
    );

    if (error)
        return error.message;

    return <form
        id='new_block_form'
        className='new-block-form'
        action={submitAction}
    >
        <div
            className='form-fields'
        >
            <Input
                className={getClassName(themes.getBasicStyling('primary'))}
                name='block_name'
                pattern={/^[a-z0-9_]+$/.source}
                placeholder='Block Name'
                required
            />

            <div
                className='block-choices'
            >
                <select
                    className={getClassName(themes.getBasicStyling('primary'))}
                    defaultValue={'cube'}
                    name='block_type'
                >
                    {
                        BLOCK_TYPES.map((blockType) => {
                            return <option
                                key={blockType}
                                value={blockType}
                            >
                                {blockType}
                            </option>;
                        })
                    }
                </select>
            </div>
        </div>

        <Button
            submit='new_block_form'
            disabled={isPending}
            className={getClassName(themes.getBasicStyling('success'))}
        >
            New Block
        </Button>
    </form>;
}