import './styles/textures.scss';
import BlockBase from '../../content/blocks/BlockBase';
import ItemBase from '../../content/items/ItemBase';
import ModCacher from '../../content/ModCacher';
import ModDef from '../../content/ModDef';
import TextureSwitch from './TextureSwitch';
import { Input } from '@chrisofnormandy/confects/inputs';
import { useActionState } from 'react';
import { Button } from '@chrisofnormandy/confects/buttons';
import { readImageAsBase64 } from '../../helpers/images';

interface TexturesProps {
    block?: BlockBase<ModCacher, ItemBase<ModCacher>>
    item?: ItemBase<ModCacher>
    mod: ModDef
}

export default function Textures(
    {
        block,
        item,
        mod
    }: TexturesProps
) {

    const content = block || item;

    if (!content)
        return null;

    const [assignTextureError, assignTextureSubmitAction, assignTextureIsPending] = useActionState<Error | null, FormData>(
        async (_previousState, formData) => {
            const key = formData.get('texture_key') as string;
            const texture = formData.get('texture') as File;

            if (!texture)
                return new Error('No texture provided');

            const base64 = await readImageAsBase64(texture);

            content.textures.add([key, base64]);

            return null;
        },
        null
    );

    const textureKeys = content.textures.keys();

    return <div
        className='textures'
    >
        <div
            className='textures-list'
        >
            {
                Array.from(textureKeys).map(([key, value]) => {
                    const stored = mod.textureCache.get(value);

                    return <div
                        key={key}
                    >
                        {
                            stored &&
                            <TextureSwitch
                                base64={stored}
                                block={block}
                                item={item}
                                mod={mod}
                                name={value}
                                label={key}
                            />
                        }

                        {
                            !stored &&
                            <form
                                action={assignTextureSubmitAction}
                                className='missing-texture-form'
                                id={`assign_texture:${content.id}:${key}`}
                            >
                                {assignTextureError && assignTextureError.message}

                                <Input
                                    name='texture_key'
                                    hidden
                                    readOnly
                                    value={value}
                                />

                                <Input
                                    type='file'
                                    name='texture'
                                    required
                                />

                                <Button
                                    submit={`assign_texture:${content.id}:${key}`}
                                    disabled={assignTextureIsPending}
                                >
                                    Assign as '{key}'
                                </Button>
                            </form>
                        }
                    </div>;
                })
            }
        </div>
    </div>;
}