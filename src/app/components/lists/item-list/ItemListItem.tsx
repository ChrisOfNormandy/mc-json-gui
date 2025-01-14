import './styles/item-list-item.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { Icon } from '@chrisofnormandy/confects/decorations';
import { IItem } from '../../../content/items/IItem';
import { Input } from '@chrisofnormandy/confects/inputs';
import { useActionState } from 'react';
import ContentListItem from '../ContentListItem';
import ModCacher from '../../../content/ModCacher';
import ModDef from '../../../content/ModDef';
import Textures from './fragments/textures/Textures';

export default function ItemListItem(
    {
        mod,
        itemDef,
        downloadFiles
    }: { mod: ModDef, itemDef: IItem<ModCacher>, downloadFiles: (files: File[]) => Promise<void> }
) {

    const [error, submitAction, isPending] = useActionState<Error | null, FormData>(
        (_previousState, formData) => {
            const itemId = formData.get('_item_id') as string;
            const itemName = formData.get('item_name') as string;

            if (itemName.length === 0)
                return new Error('Item name cannot be empty');

            mod.deleteBlock(itemId);

            const newFormData = new FormData();
            newFormData.append('item_name', itemName);
            newFormData.append('item_type', itemDef.type);

            mod.addItemFormData(newFormData);

            return null;
        },
        null
    );

    return <ContentListItem
        className='item'
    >
        <Textures
            item={itemDef}
            mod={mod}
        />

        {error && error.message}

        <div
            className='content-name'
        >
            <form
                id={`item_edit_form:${itemDef.id}`}
                action={submitAction}
            >
                <Input
                    name='_item_id'
                    hidden
                    required
                    readOnly
                    value={itemDef.id}
                />

                <Input
                    name='item_name'
                    placeholder='Item Name'
                    defaultValue={itemDef.name}
                    required
                    pattern={/^[a-z0-9_]+$/.source}
                />

                <Button
                    disabled={isPending}
                    submit={`item_edit_form:${itemDef.id}`}
                >
                    Rename
                </Button>
            </form>

            <span
                className='content-type'
            >
                {itemDef.type}
                {':'}
                {itemDef.id.slice(0, 8)}
            </span>
        </div>

        <div
            className='content-downloads'
        >
            <Button
                disabled={isPending}
                onClick={
                    async () => {
                        const files = itemDef.model();
                        await downloadFiles(files);
                    }
                }
            >
                <Icon
                    icon='download'
                />

                <span>
                    Models
                </span>
            </Button>

            <Button
                disabled={isPending}
                onClick={
                    async () => {
                        const files = itemDef.recipe();
                        await downloadFiles(files);
                    }
                }
            >
                <Icon
                    icon='download'
                />

                <span>
                    Recipe
                </span>
            </Button>
        </div>

        <div
            className='content-controls'
        >
            <Button
                onClick={() => {
                    mod.deleteItem(itemDef.id);
                    mod.update();
                }}
                disabled={isPending}
            >
                <Icon
                    icon='trash'
                />

                <span>
                    Delete
                </span>
            </Button>
        </div>
    </ContentListItem>;
}