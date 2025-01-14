import './styles/texture-form.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { Dispatch, useActionState } from 'react';
import { IBlock } from '../../../../../content/blocks/IBlock';
import { Input } from '@chrisofnormandy/confects/inputs';
import ModCacher from '../../../../../content/ModCacher';
import ModDef from '../../../../../content/ModDef';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { themes } from '@chrisofnormandy/confetti/themes';
import { Icon } from '@chrisofnormandy/confects/decorations';

export default function TextureForm(
    {
        mod,
        block,
        name,
        setCanEdit,
        base64,
        disabled
    }: { mod: ModDef, block: IBlock<ModCacher>, name: string, setCanEdit: Dispatch<boolean>, base64: string, disabled: boolean }
) {
    const formId = `texture_form:${block.id}:${name}`;

    const [editTextureError, editTextureSubmitAction, editTexturePending] = useActionState<Error | null, FormData>(
        (_previousState, formData) => {
            const _textureName = formData.get('_texture_name') as string;
            const textureName = formData.get('texture_name') as string;
            const useTextureName = textureName.split('.')[0]; // Get the name without extension stuff

            try {
                const base64 = block.textureCache.get(_textureName);
                if (!base64)
                    return new Error('Texture not found');

                block.textureCache.delete(_textureName);
                block.textureCache.set(useTextureName, base64);

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

    const lockFormSubmits = disabled || editTexturePending;

    return <form
        id={formId}
        action={editTextureSubmitAction}
        className={getClassName('texture-form', themes.getBasicStyling('trinary'))}
    >
        {editTextureError && editTextureError.message}

        <figure>
            <img
                src={base64}
                alt={name}
                width={64}
                height={64}
            />

            <figcaption>
                <Input
                    name='_texture_name'
                    value={name}
                    required
                    readOnly
                    hidden
                />

                <Input
                    name='texture_name'
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