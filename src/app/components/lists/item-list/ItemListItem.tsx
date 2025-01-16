import './styles/item-list-item.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { Icon } from '@chrisofnormandy/confects/decorations';
import { Input } from '@chrisofnormandy/confects/inputs';
import { useActionState } from 'react';
import ContentListItem from '../ContentListItem';
import ItemBase from '../../../content/items/ItemBase';
import ModCacher from '../../../content/ModCacher';
import ModDef from '../../../content/ModDef';
import Textures from '../../textures/Textures';

interface ItemListItemProps {
    mod: ModDef
    item: ItemBase<ModCacher>
    downloadFiles: (files: File[]) => Promise<void>
}

export default function ItemListItem(
    {
        mod,
        item,
        downloadFiles
    }: ItemListItemProps
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
            newFormData.append('item_type', item.type);

            mod.addItemFormData(newFormData);

            return null;
        },
        null
    );

    return <ContentListItem
        className='item'
    >
        <Textures
            item={item}
            mod={mod}
        />

        {error && error.message}

        <div
            className='content-name'
        >
            <form
                id={`item_edit_form:${item.id}`}
                action={submitAction}
            >
                <Input
                    name='_item_id'
                    hidden
                    required
                    readOnly
                    value={item.id}
                />

                <Input
                    name='item_name'
                    placeholder='Item Name'
                    defaultValue={item.name}
                    required
                    pattern={/^[a-z0-9_]+$/.source}
                />

                <Button
                    disabled={isPending}
                    submit={`item_edit_form:${item.id}`}
                >
                    Rename
                </Button>
            </form>

            <span
                className='content-type'
            >
                {item.type}
                {':'}
                {item.id.slice(0, 8)}
            </span>
        </div>

        <div
            className='content-downloads'
        >
            <Button
                disabled={isPending}
                onClick={
                    async () => {
                        const files = item.model.file();
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
                        const files = item.recipe.file();
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
                    mod.deleteItem(item.id);
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