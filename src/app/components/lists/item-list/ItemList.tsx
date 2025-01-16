import './styles/item-list.scss';
import { useEffect, useState } from 'react';
import ContentList from '../ContentList';
import ItemBase from '../../../content/items/ItemBase';
import ItemListItem from './ItemListItem';
import ModCacher from '../../../content/ModCacher';
import ModDef from '../../../content/ModDef';

interface ItemListProps {
    mod: ModDef
    downloadFiles: (files: File[]) => Promise<void>
    itemList: ItemBase<ModCacher>[]
}

export default function ItemList(
    {
        mod,
        itemList,
        downloadFiles
    }: ItemListProps
) {
    const [ready, isReady] = useState(true);

    useEffect(() => {
        if (!ready)
            isReady(true);
    }, [ready]);

    return <ContentList
        heading={
            <span>
                Items | {itemList.length}
            </span>
        }
        className='items'
    >
        {
            ready &&
            itemList.map((item) => {
                return <ItemListItem
                    key={item.id}
                    mod={mod}
                    item={item}
                    downloadFiles={downloadFiles}
                />;
            })
        }
    </ContentList>;
}