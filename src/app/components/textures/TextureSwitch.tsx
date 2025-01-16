import { useState } from 'react';
import ModCacher from '../../content/ModCacher';
import ModDef from '../../content/ModDef';
import TextureDisplay from './TextureDisplay';
import TextureForm from './TextureForm';
import BlockBase from '../../content/blocks/BlockBase';
import ItemBase from '../../content/items/ItemBase';

interface TextureSwitchProps {
    base64: string,
    block?: BlockBase<ModCacher, ItemBase<ModCacher>>,
    item?: ItemBase<ModCacher>,
    mod: ModDef,
    name: string
    label: string
}

export default function TextureSwitch(
    {
        base64,
        block,
        item,
        mod,
        label,
        name
    }: TextureSwitchProps
) {
    const [canEdit, setCanEdit] = useState(false);

    if (canEdit)
        return <TextureForm
            mod={mod}
            block={block}
            item={item}
            label={label}
            name={name}
            setCanEdit={setCanEdit}
            base64={base64}
        />;

    return <TextureDisplay
        base64={base64}
        label={label}
        block={block}
        item={item}
        key={name}
        name={name}
        setCanEdit={setCanEdit}
    />;
}