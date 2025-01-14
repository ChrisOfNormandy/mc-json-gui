import './styles/content-list-item.scss';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { HTML_ListItemProps } from '@chrisofnormandy/confects/types';
import { themes } from '@chrisofnormandy/confetti/themes';

export default function ContentListItem(
    {
        className,
        children,
        ...props
    }: HTML_ListItemProps
) {
    return <li
        className={getClassName('content-list-item', className, themes.getBasicStyling('secondary'))}
        {...props}
    >
        {children}
    </li>;
}