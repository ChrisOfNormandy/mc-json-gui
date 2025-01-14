import './styles/content-list.scss';
import { Heading } from '@chrisofnormandy/confects/decorations';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { HTML_UnorderedListProps } from '@chrisofnormandy/confects/types';
import { ReactNode } from 'react';

export default function ContentList(
    {
        className,
        heading,
        children,
        ...props
    }: HTML_UnorderedListProps & { heading: ReactNode }
) {
    return <div
        className='content-list-wrapper'
    >
        <Heading
            level={3}
        >
            {heading}
        </Heading>
        <ul
            className={getClassName('content-list-ul', className)}
            {...props}
        >
            {children}
        </ul>
    </div>;
}