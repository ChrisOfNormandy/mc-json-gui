import './styles/textures.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { IBlock } from '../../../../../content/blocks/IBlock';
import { Input } from '@chrisofnormandy/confects/inputs';
import { readImageAsBase64 } from '../../../../../helpers/images';
import { useActionState } from 'react';
import ModCacher from '../../../../../content/ModCacher';
import ModDef from '../../../../../content/ModDef';
import TextureSwitch from './TextureSwitch';

export default function Textures(
    {
        block,
        mod
    }: { block: IBlock<ModCacher>, mod: ModDef }
) {

    const [textureError, textureSubmitAction, texturePending] = useActionState<Error | null, FormData>(
        async (_previousState, formData) => {
            const textureName = formData.get('texture_name') as string;
            const texture = formData.get('texture_file') as File;

            if (!texture)
                return new Error('Texture file is required');

            let useTextureName = textureName || texture.name;
            useTextureName = useTextureName.split('.')[0]; // Get the name without extension stuff

            try {
                const base64 = await readImageAsBase64(texture);
                block.textureCache.set(useTextureName, base64);

                mod.update();

                return null;
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

    const lockFormSubmits = texturePending;

    return <div
        className='textures'
    >
        {textureError && textureError.message}

        <form
            id={`texture_form:${block.id}`}
            action={textureSubmitAction}
            className='new-texture-form'
        >
            <div
                className='form-fields'
            >
                <Input
                    name='texture_name'
                    placeholder='Texture Name'
                    defaultValue={block.name}
                />

                <Input
                    className='file'
                    name='texture_file'
                    type='file'
                    required
                />
            </div>

            <Button
                submit={`texture_form:${block.id}`}
            >
                Add Texture
            </Button>
        </form>

        <div
            className='textures-list'
        >
            {
                Array.from(block.textureCache).map(([name, base64]) => {
                    return <TextureSwitch
                        base64={base64}
                        block={block}
                        key={name}
                        lockFormSubmits={lockFormSubmits}
                        mod={mod}
                        name={name}
                    />;
                })
            }
        </div>
    </div>;
}