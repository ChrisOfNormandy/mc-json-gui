import './styles/texture-display.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { Dispatch } from 'react';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { IBlock } from '../../../../../content/blocks/IBlock';
import { Icon } from '@chrisofnormandy/confects/decorations';
import { themes } from '@chrisofnormandy/confetti/themes';
import ModCacher from '../../../../../content/ModCacher';

export default function TextureDisplay(
    {
        base64,
        name,
        setCanEdit,
        disabled,
        block
    }: { block: IBlock<ModCacher>, base64: string, name: string, setCanEdit: Dispatch<boolean>, disabled: boolean }
) {
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
                {name}
            </figcaption>
        </figure>

        <div
            className='controls'
        >
            <Button
                onClick={() => setCanEdit(true)}
                disabled={disabled}
            >
                <Icon
                    icon='pencil'
                />

                <span>
                    Edit
                </span>
            </Button>

            <Button
                disabled={disabled}
                onClick={() => {
                    block.textureCache.delete(name);
                    block.mod.update();
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