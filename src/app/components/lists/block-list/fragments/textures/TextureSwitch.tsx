import { IBlock } from '../../../../../content/blocks/IBlock';
import { useState } from 'react';
import ModCacher from '../../../../../content/ModCacher';
import ModDef from '../../../../../content/ModDef';
import TextureDisplay from './TextureDisplay';
import TextureForm from './TextureForm';

export default function TextureSwitch(
    {
        block,
        mod,
        name,
        base64,
        lockFormSubmits
    }: { block: IBlock<ModCacher>, mod: ModDef, name: string, base64: string, lockFormSubmits: boolean }
) {
    const [canEdit, setCanEdit] = useState(false);

    if (canEdit)
        return <TextureForm
            mod={mod}
            block={block}
            name={name}
            setCanEdit={setCanEdit}
            base64={base64}
            disabled={lockFormSubmits}
        />;

    return <TextureDisplay
        base64={base64}
        disabled={lockFormSubmits}
        block={block}
        key={name}
        name={name}
        setCanEdit={setCanEdit}
    />;
}