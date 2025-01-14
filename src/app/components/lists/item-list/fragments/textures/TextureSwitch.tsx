import { IItem } from '../../../../../content/items/IItem';
import { useState } from 'react';
import ModCacher from '../../../../../content/ModCacher';
import ModDef from '../../../../../content/ModDef';
import TextureDisplay from './TextureDisplay';
import TextureForm from './TextureForm';

export default function TextureSwitch(
    {
        item,
        mod,
        name,
        base64,
        lockFormSubmits
    }: { item: IItem<ModCacher>, mod: ModDef, name: string, base64: string, lockFormSubmits: boolean }
) {
    const [canEdit, setCanEdit] = useState(false);

    if (canEdit)
        return <TextureForm
            mod={mod}
            item={item}
            name={name}
            setCanEdit={setCanEdit}
            base64={base64}
            disabled={lockFormSubmits}
        />;

    return <TextureDisplay
        base64={base64}
        disabled={lockFormSubmits}
        item={item}
        key={name}
        name={name}
        setCanEdit={setCanEdit}
    />;
}