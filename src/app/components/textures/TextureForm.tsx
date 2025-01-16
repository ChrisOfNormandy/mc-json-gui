import './styles/texture-form.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { Dispatch, useActionState } from 'react';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { Icon } from '@chrisofnormandy/confects/decorations';
import { Input } from '@chrisofnormandy/confects/inputs';
import { themes } from '@chrisofnormandy/confetti/themes';
import BlockBase from '../../content/blocks/BlockBase';
import ItemBase from '../../content/items/ItemBase';
import ModCacher from '../../content/ModCacher';
import ModDef from '../../content/ModDef';

interface TextureFormProps {
    mod: ModDef
    block?: BlockBase<ModCacher, ItemBase<ModCacher>>
    item?: ItemBase<ModCacher>
    name: string
    label: string
    setCanEdit: Dispatch<boolean>
    base64: string
}

export default function TextureForm(
    {
        mod,
        block,
        item,
        name,
        setCanEdit,
        base64,
        label
    }: TextureFormProps
) {
    const content = block || item;

    const [editTextureError, editTextureSubmitAction, editTexturePending] = useActionState<Error | null, FormData>(
        (_previousState, formData) => {
            if (!content)
                return new Error('Content not found');

            const oldName = formData.get('old_name') as string;
            const newName = formData.get('new_name') as string;
            const useTextureName = newName.split('.')[0]; // Get the name without extension stuff

            try {
                content.textures.delete(oldName);
                content.textures.add([useTextureName, base64]);

                mod.update();

                return null;
            }
            catch (err) {
                console.error(err);

                if (err instanceof Error)
                    return err;
            }
            finally {
                setCanEdit(false);
            }

            return null;
        },
        null
    );

    if (!content)
        return null;

    const lockFormSubmits = editTexturePending;
    const formId = `texture_form:${content.id}:${name}`;

    return <form
        id={formId}
        action={editTextureSubmitAction}
        className={getClassName('texture-form', themes.getBasicStyling('trinary'))}
    >
        {editTextureError && editTextureError.message}

        {label}

        <figure>
            <img
                src={base64}
                alt={name}
                width={64}
                height={64}
            />

            <figcaption>
                <Input
                    name='old_name'
                    value={name}
                    required
                    readOnly
                    hidden
                />

                <Input
                    name='new_name'
                    defaultValue={name}
                    required
                    placeholder='Texture Name'
                />
            </figcaption>
        </figure>

        <div
            className='controls'
        >
            <Button
                submit={formId}
                disabled={lockFormSubmits}
            >
                <Icon
                    icon='save'
                />

                <span>
                    Save
                </span>
            </Button>

            <Button
                onClick={() => setCanEdit(false)}
                disabled={lockFormSubmits}
            >
                <Icon
                    icon='x-lg'
                />

                <span>
                    Cancel
                </span>
            </Button>
        </div>
    </form>;
}