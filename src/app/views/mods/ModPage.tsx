import './styles/mod-page.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { CachedData } from '../../content/types';
import { downloadFile, getClassName } from '@chrisofnormandy/confects/helpers';
import { themes } from '@chrisofnormandy/confetti/themes';
import { useAppData } from '../../components/app-data/AppDataProvider';
import { useNavigate, useParams } from 'react-router';
import { useState, useActionState, useEffect } from 'react';
import BlockList from '../../components/lists/block-list/BlockList';
import Exporter from './fragments/exporter/Exporter';
import ItemList from '../../components/lists/item-list/ItemList';
import JSZip from 'jszip';
import ModCacher from '../../content/ModCacher';
import ModDef from '../../content/ModDef';
import NewBlockForm from '../../components/new-block-form/NewBlockForm';
import NewItemForm from '../../components/new-item-form/NewItemForm';
import ItemBase from '../../content/items/ItemBase';
import BlockBase from '../../content/blocks/BlockBase';

export default function ModPage() {

    const { namespace } = useParams();
    const appDataCtx = useAppData();
    const navigate = useNavigate();

    const [mod, setMod] = useState<ModDef>();
    const [blockList, setBlockList] = useState<BlockBase<ModCacher, ItemBase<ModCacher>>[]>([]);
    const [itemList, setItemList] = useState<ItemBase<ModCacher>[]>([]);

    const downloadFiles = async (files: File[]) => {
        if (!mod) return;

        const zip = new JSZip();

        const readFile = (file: File) => {
            return new Promise<string | ArrayBuffer>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string | ArrayBuffer);
                reader.onerror = () => reject(reader.error);
                reader.readAsArrayBuffer(file);
            });
        };

        await Promise.all(files.map(async (file) => {
            const content = await readFile(file);
            zip.file(file.name, content);
        }));

        const zipContent = await zip.generateAsync({ type: 'blob' });
        const zipFile = new File([zipContent], `${mod.getName()}.zip`);
        downloadFile(zipFile);
    };

    const newMod = (modName: string) => {
        const updater = (data: CachedData) => {
            const blocks = Array.from(data.blockCache.values());
            setBlockList(blocks);
            const items = Array.from(data.itemCache.values());
            setItemList(items);
        };

        setMod(new ModDef(modName, updater));
    };

    useEffect(() => {
        if (!namespace || mod && mod.getName() === namespace)
            return () => undefined;

        console.debug('Using namespace:', namespace);

        newMod(namespace);

        return () => {
            if (mod)
                mod.delete(appDataCtx);
        };
    }, [namespace]);

    const [getContentError, getContentSubmitAction, getContentPending] = useActionState<Error | null, FormData>(
        async () => {
            if (!mod)
                return new Error('No mod selected');

            const files = [
                ...mod.blockStates(),
                ...mod.models(),
                ...mod.tags(),
                ...mod.recipes(),
                ...mod.lootTables(),
                ...mod.textures(),
                mod.lang()
            ];
            await downloadFiles(files);

            return null;
        },
        null
    );

    const [deleteError, deleteSubmitAction, deletePending] = useActionState<Error | null, FormData>(
        () => {
            if (!mod)
                return new Error('No mod selected');

            mod.delete(appDataCtx);

            navigate('/mods');

            return null;
        },
        null
    );

    if (!mod)
        return null;

    return <div
        id={`mod_page:${namespace}`}
        className='mod-page'
    >
        <title>
            {`MC JSON GUI | ${mod.getName()}`}
        </title>

        {getContentError && getContentError.message}
        {deleteError && deleteError.message}

        <div
            className={getClassName('forms', themes.getStyles({ background: { style: 'content' } }))}
        >
            <NewBlockForm
                mod={mod}
            />

            <NewItemForm
                mod={mod}
            />
        </div>

        <div
            className='lists'
        >
            <BlockList
                blockList={blockList}
                downloadFiles={downloadFiles}
                mod={mod}
            />

            <ItemList
                downloadFiles={downloadFiles}
                itemList={itemList}
                mod={mod}
            />
        </div>

        <div
            className='downloaders'
        >
            <form
                action={getContentSubmitAction}
                id='get_content_form'
            >
                <Button
                    disabled={getContentPending}
                    submit='get_content_form'
                    theme={{
                        background: { style: 'success' },
                        border: { style: 'success' }
                    }}
                >
                    Download Resources
                </Button>
            </form>

            <Exporter
                mod={mod}
            />

            <form
                action={deleteSubmitAction}
                id='delete_form'
            >
                <Button
                    submit='delete_form'
                    disabled={deletePending}
                    theme={{
                        background: { style: 'hazard' },
                        border: { style: 'hazard' }
                    }}
                >
                    Delete
                </Button>
            </form>
        </div>
    </div>;
}