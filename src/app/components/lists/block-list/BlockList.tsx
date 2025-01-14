import './styles/block-list.scss';
import { IBlock } from '../../../content/blocks/IBlock';
import { useEffect, useState } from 'react';
import BlockListItem from './BlockListItem';
import ContentList from '../ContentList';
import ModCacher from '../../../content/ModCacher';
import ModDef from '../../../content/ModDef';
import { Heading } from '@chrisofnormandy/confects/decorations';

export default function BlockList(
    {
        mod,
        blockList,
        downloadFiles
    }: { mod: ModDef, downloadFiles: (files: File[]) => Promise<void>, blockList: IBlock<ModCacher>[] }
) {
    const [ready, isReady] = useState(true);

    useEffect(() => {
        if (!ready)
            isReady(true);
    }, [ready]);

    const blockNames = Array.from(new Set(blockList.map((block) => block.name))).sort();

    return <ContentList
        heading={
            <span>
                Blocks | {blockList.length}
            </span>
        }
        className='blocks'
    >
        {
            blockNames.map((blockName) => {
                return <div
                    key={blockName}
                >
                    <Heading
                        level={3}
                    >
                        {blockName}
                    </Heading>

                    {
                        mod.getBlock(blockName).map((block) => {
                            return <BlockListItem
                                key={block.id}
                                mod={mod}
                                blockDef={block}
                                downloadFiles={downloadFiles}
                            />;
                        })
                    }
                </div>;
            })
        }
    </ContentList>;
}