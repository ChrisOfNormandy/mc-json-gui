import './styles/home.scss';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { PageMain } from '@chrisofnormandy/confects/containers';
import { themes } from '@chrisofnormandy/confetti/themes';
import Importer from '../../components/importer/Importer';
import NewModForm from '../../components/new-mod-form/NewModForm';

export default function Home() {
    return <PageMain
        className={getClassName('home', themes.getStyles({ background: { style: 'trinary' } }))}
    >
        <div
            className='content-options'
        >
            <Importer />

            <NewModForm />
        </div>
    </PageMain>;
}