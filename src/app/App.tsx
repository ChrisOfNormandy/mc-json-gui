import './styles/app.scss';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { Heading } from '@chrisofnormandy/confects/decorations';
import { Nav, Page, PageBody, PageFooter, PageHeader } from '@chrisofnormandy/confects/containers';
import { themes } from '@chrisofnormandy/confetti/themes';
import { NavLink, Outlet } from 'react-router';
import { useEffect } from 'react';

export default function App() {

    useEffect(() => { themes.init(undefined, 'navy'); }, []);

    return <Page
        className={getClassName(themes.getStyles({ background: { style: 'body' } }))}
    >
        <PageHeader>
            <Heading>
                Minecraft Data JSON Generation
            </Heading>

            <Nav>
                <NavLink
                    to='/'>
                    Home
                </NavLink>
                <NavLink
                    to='/mods'>
                    Mods
                </NavLink>
            </Nav>
        </PageHeader>

        <PageBody
            className={getClassName(themes.getStyles({ background: { style: 'body' } }))}
        >
            <Outlet />
        </PageBody>

        <PageFooter>

        </PageFooter>
    </Page>;
}
