import { Button } from '@chrisofnormandy/confects/buttons';
import { Icon } from '@chrisofnormandy/confects/decorations';
import ModDef from '../../../../content/ModDef';

export default function Exporter(
    {
        mod
    }: { mod: ModDef }
) {
    return <div
        className='db-section export'
    >
        <Button
            onClick={() => mod.exportDatabase()}
            theme={{ background: { style: 'success' },
border: { style: 'success' } }}
        >
            <Icon
                icon='box-arrow-right'
            />

            <span>
                Export Database
            </span>
        </Button>
    </div>;
}