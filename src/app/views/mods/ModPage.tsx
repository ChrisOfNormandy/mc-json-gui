import './styles/mod-page.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { CachedData } from '../../content/types';
import { downloadFile, getClassName } from '@chrisofnormandy/confects/helpers';
import { IBlock } from '../../content/blocks/IBlock';
import { Icon } from '@chrisofnormandy/confects/decorations';
import { IItem } from '../../content/items/IItem';
import { Input } from '@chrisofnormandy/confects/inputs';
import { themes } from '@chrisofnormandy/confetti/themes';
import { useNavigate, useParams } from 'react-router';
import { useState, useActionState, useEffect } from 'react';
import BlockList from '../../components/lists/block-list/BlockList';
import ItemList from '../../components/lists/item-list/ItemList';
import JSZip from 'jszip';
import ModCacher from '../../content/ModCacher';
import ModDef from '../../content/ModDef';
import NewBlockForm from '../../components/new-block-form/NewBlockForm';
import NewItemForm from '../../components/new-item-form/NewItemForm';

export default function ModPage() {

    const { namespace } = useParams();
    const navigate = useNavigate();

    const [mod, setMod] = useState<ModDef>();
    const [blockList, setBlockList] = useState<IBlock<ModCacher>[]>([]);
    const [itemList, setItemList] = useState<IItem<ModCacher>[]>([]);

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
            return;

        console.debug('Using namespace:', namespace);

        newMod(namespace);

        return () => {
            if (mod)
                mod.destroy();
        }
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
        async () => {
            if (!mod)
                return new Error('No mod selected');

            await mod.delete();

            navigate('/mods');

            return null;
        },
        null
    );

    const [importError, importSubmitAction, importPending] = useActionState<Error | null, FormData>(
        async (_previousState, formData) => {
            if (!mod)
                return new Error('No mod selected');

            const file = formData.get('import_file') as File;

            try {
                const importMod = new ModDef('_temp', () => { console.debug(''); });

                await importMod.importDatabase(file);

                navigate(`/mods/${importMod.getName()}`);
            }
            catch (err) {
                console.error(err);

                if (err instanceof Error)
                    return err;
            }

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
        {getContentError && getContentError.message}
        {importError && importError.message}
        {deleteError && deleteError.message}

        <div
            className={getClassName('database', themes.getStyles({ background: { style: 'secondary' } }))}
        >
            <form
                id='import_form'
                className='db-section import'
                action={importSubmitAction}
            >
                <Input
                    type='file'
                    name='import_file'
                    required
                />

                <Button
                    submit='import_form'
                    disabled={importPending}
                    theme={{ background: { style: 'success' }, border: { style: 'success' } }}
                >
                    <Icon
                        icon='box-arrow-in-right'
                    />

                    <span>
                        Import Database
                    </span>
                </Button>
            </form>

            <div
                className='db-section export'
            >
                <Button
                    onClick={() => mod.exportDatabase()}
                    theme={{ background: { style: 'success' }, border: { style: 'success' } }}
                >
                    <Icon
                        icon='box-arrow-right'
                    />

                    <span>
                        Export Database
                    </span>
                </Button>
            </div>
        </div>

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
                    theme={{ background: { style: 'success' }, border: { style: 'success' } }}
                >
                    Get Content
                </Button>
            </form>

            <form
                action={deleteSubmitAction}
                id='delete_form'
            >
                <Button
                    submit='delete_form'
                    disabled={deletePending}
                    theme={{ background: { style: 'hazard' }, border: { style: 'hazard' } }}
                >
                    Delete
                </Button>
            </form>
        </div>
    </div>;
}