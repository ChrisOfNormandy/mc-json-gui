import './styles/block-list-item.scss';
import { BlockType } from '../../../content/types';
import { Button } from '@chrisofnormandy/confects/buttons';
import { Icon } from '@chrisofnormandy/confects/decorations';
import { Input } from '@chrisofnormandy/confects/inputs';
import { useActionState } from 'react';
import ContentListItem from '../ContentListItem';
import ModCacher from '../../../content/ModCacher';
import ModDef from '../../../content/ModDef';
import Textures from '../../textures/Textures';
import BlockBase from '../../../content/blocks/BlockBase';
import ItemBase from '../../../content/items/ItemBase';

export default function BlockListItem(
    {
        mod,
        blockDef,
        downloadFiles
    }: { mod: ModDef, blockDef: BlockBase<ModCacher, ItemBase<ModCacher>>, downloadFiles: (files: File[]) => Promise<void> }
) {

    const [renameError, renameSubmitAction, renamePending] = useActionState<Error | null, FormData>(
        (_previousState, formData) => {
            const blockId = formData.get('_block_id') as string;
            const blockName = formData.get('block_name') as string;

            if (blockName.length === 0)
                return new Error('Block name cannot be empty');

            mod.deleteBlock(blockId);

            const newFormData = new FormData();
            newFormData.append('block_name', blockName);
            newFormData.append('block_type', blockDef.type);

            mod.addBlockFormData(newFormData);

            return null;
        },
        null
    );

    const lockFormSubmits = renamePending;

    return <ContentListItem
        className='block'
    >
        <Textures
            block={blockDef}
            mod={mod}
        />

        {renameError && renameError.message}

        <div
            className='content-name'
        >
            <form
                id={`block_edit_form:${blockDef.id}`}
                action={renameSubmitAction}
            >
                {mod.getBlock(blockDef.name, blockDef.type).length > 1 && 'DUPLICATE'}

                <Input
                    name='_block_id'
                    hidden
                    required
                    readOnly
                    value={blockDef.id}
                />

                <Input
                    name='block_name'
                    placeholder='Block Name'
                    defaultValue={blockDef.name}
                    required
                    pattern={/^[a-z0-9_]+$/.source}
                />

                <Button
                    disabled={lockFormSubmits}
                    submit={`block_edit_form:${blockDef.id}`}
                >
                    Rename
                </Button>
            </form>

            <span
                className='content-type'
            >
                {blockDef.type}
                {':'}
                {blockDef.id.slice(0, 8)}
            </span>
        </div>

        <div
            className='content-downloads'
        >
            <Button
                disabled={lockFormSubmits}
                onClick={
                    async () => {
                        const files = blockDef.blockState.file();
                        await downloadFiles(files);
                    }
                }
            >
                <Icon
                    icon='download'
                />

                <span>
                    BlockState
                </span>
            </Button>

            <Button
                disabled={lockFormSubmits}
                onClick={
                    async () => {
                        const files = blockDef.model.file();
                        await downloadFiles(files);
                    }
                }
            >
                <Icon
                    icon='download'
                />

                <span>
                    Block Models
                </span>
            </Button>

            <Button
                disabled={lockFormSubmits}
                onClick={
                    async () => {
                        const files = blockDef.item.model.file();
                        await downloadFiles(files);
                    }
                }
            >
                <Icon
                    icon='download'
                />

                <span>
                    Item Models
                </span>
            </Button>

            <Button
                disabled={lockFormSubmits}
                onClick={
                    async () => {
                        const files = blockDef.recipe.file();
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

            <Button
                disabled={lockFormSubmits}
                onClick={
                    async () => {
                        const files = blockDef.lootTable.file();
                        await downloadFiles(files);
                    }
                }
            >
                <Icon
                    icon='download'
                />

                <span>
                    Loot Table
                </span>
            </Button>
        </div>

        <div
            className='content-controls'
        >
            {
                (
                    blockDef.type === 'cube' ||
                    blockDef.type === 'pillar'
                ) &&
                <Button
                    onClick={() => {
                        const set: BlockType[] = ['button', 'fence', 'fence_gate', 'pressure_plate', 'sign', 'slab', 'stairs', 'trapdoor'];
                        set.forEach((type) => {
                            const exists = mod.getBlock(blockDef.name, type).length > 0;
                            if (exists)
                                return;

                            mod.loadBlockFromSchema({
                                id: '',
                                name: blockDef.name,
                                type
                            });
                        });
                        mod.update();
                    }}
                >
                    Create Wood Set
                </Button>
            }

            {
                (
                    blockDef.type === 'cube' ||
                    blockDef.type === 'pillar'
                ) &&
                <Button
                    onClick={() => {
                        const set: BlockType[] = ['button', 'pressure_plate', 'slab', 'stairs', 'wall'];
                        set.forEach((type) => {
                            const exists = mod.getBlock(blockDef.name, type).length > 0;
                            if (exists)
                                return;

                            mod.loadBlockFromSchema({
                                id: '',
                                name: blockDef.name,
                                type
                            });
                        });
                        mod.update();
                    }}
                >
                    Create Stone Set
                </Button>
            }

            <Button
                onClick={() => {
                    mod.deleteBlock(blockDef.id);
                    mod.update();
                }}
                disabled={lockFormSubmits}
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