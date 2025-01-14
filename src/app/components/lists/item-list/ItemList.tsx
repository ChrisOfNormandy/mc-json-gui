import './styles/item-list.scss';
import { IItem } from '../../../content/items/IItem';
import { useEffect, useState } from 'react';
import ContentList from '../ContentList';
import ItemListItem from './ItemListItem';
import ModCacher from '../../../content/ModCacher';
import ModDef from '../../../content/ModDef';

export default function ItemList(
    {
        mod,
        itemList,
        downloadFiles
    }: { mod: ModDef, downloadFiles: (files: File[]) => Promise<void>, itemList: IItem<ModCacher>[] }
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
            itemList.map((itemDef) => {
                return <ItemListItem
                    key={itemDef.id}
                    mod={mod}
                    itemDef={itemDef}
                    downloadFiles={downloadFiles}
                />;
            })
        }
    </ContentList>;
}