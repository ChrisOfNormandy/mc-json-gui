import './styles/texture-display.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { Dispatch } from 'react';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { Icon } from '@chrisofnormandy/confects/decorations';
import { themes } from '@chrisofnormandy/confetti/themes';
import BlockBase from '../../content/blocks/BlockBase';
import ItemBase from '../../content/items/ItemBase';
import ModCacher from '../../content/ModCacher';

interface TextureDisplayProps<M extends ModCacher> {
    base64: string
    item?: ItemBase<M>
    block?: BlockBase<M, ItemBase<M>>
    name: string
    setCanEdit: Dispatch<boolean>
    label: string
}

export default function TextureDisplay<M extends ModCacher>(
    {
        base64,
        name,
        setCanEdit,
        block,
        item,
        label
    }: TextureDisplayProps<M>
) {
    const content = block || item;

    if (!content)
        return null;

    return <div
        className={getClassName('texture-display', themes.getBasicStyling('trinary'))}
    >
        <figure>
            <img
                src={base64}
                alt={name}
                width={64}
                height={64}
            />

            <figcaption>
                {label}:{name}
            </figcaption>
        </figure>

        <div
            className='controls'
        >
            <Button
                onClick={() => setCanEdit(true)}
            >
                <Icon
                    icon='pencil'
                />

                <span>
                    Edit
                </span>
            </Button>

            <Button
                onClick={() => {
                    content.textures.map.delete(name);
                    content.mod.update();
                }}
            >
                <Icon
                    icon='trash'
                />

                <span>
                    Delete
                </span>
            </Button>
        </div>
    </div>;
}