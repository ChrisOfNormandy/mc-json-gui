import './styles/mods.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { Nav, PageMain } from '@chrisofnormandy/confects/containers';
import { NavLink, Outlet, useParams } from 'react-router';
import { themes } from '@chrisofnormandy/confetti/themes';
import { useAppData } from '../../components/app-data/AppDataProvider';
import { Heading } from '@chrisofnormandy/confects/decorations';

export default function Mods() {

    const { namespace } = useParams();
    const { namespaces } = useAppData();

    return <PageMain
        className={getClassName('mods', themes.getStyles({ background: { style: 'body' } }))}
    >
        {
            namespace &&
            <>
                <Nav
                    className={getClassName(themes.getStyles({ background: { style: 'primary' } }))}
                >
                    <span>
                        Mods:
                    </span>

                    {
                        Array.from(namespaces).map((modName) => {
                            return <NavLink
                                key={modName}
                                to={'/mods/' + modName}
                            >
                                <Button
                                    theme={{ background: { style: 'trinary' },
border: { style: 'trinary' } }}
                                >
                                    {modName}
                                </Button>
                            </NavLink>;
                        })
                    }
                </Nav>

                <Outlet />
            </>
        }

        {
            !namespace &&
            <div
                className='mods-panel'
            >
                <Heading>
                    Your Mods
                </Heading>

                <div
                    className='panel'
                >
                    {
                        Array.from(namespaces).map((modName) => {
                            return <NavLink
                                key={modName}
                                to={'/mods/' + modName}
                            >
                                <Button
                                    theme={{ background: { style: 'trinary' },
border: { style: 'trinary' } }}
                                >
                                    {modName}
                                </Button>
                            </NavLink>;
                        })
                    }
                </div>
            </div>
        }

    </PageMain>;
}
