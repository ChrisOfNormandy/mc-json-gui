import './styles/new-item-form.scss';
import { Button } from '@chrisofnormandy/confects/buttons';
import { Input } from '@chrisofnormandy/confects/inputs';
import { useActionState } from 'react';
import ModDef from '../../content/ModDef';
import { getClassName } from '@chrisofnormandy/confects/helpers';
import { themes } from '@chrisofnormandy/confetti/themes';

const ITEM_TYPES = [
    'item'
];

export default function NewItemForm(
    {
        mod
    }: { mod: ModDef }
) {

    const [error, submitAction, isPending] = useActionState<Error | null, FormData>(
        (_previousState, formData) => {
            if (!mod)
                return new Error('No mod selected');

            return mod.addItemFormData(formData);
        },
        null
    );

    if (error)
        return error.message;

    return <form
        id='new_item_form'
        className='new-item-form'
        action={submitAction}
    >
        <div
            className='form-fields'
        >
            <Input
                className={getClassName(themes.getBasicStyling('primary'))}
                name='item_name'
                pattern={/^[a-z0-9_]+$/.source}
                placeholder='Item Name'
                required
            />

            <div
                className='item-choices'
            >
                <select
                    className={getClassName(themes.getBasicStyling('primary'))}
                    defaultValue={'item'}
                    name='item_type'
                >
                    {
                        ITEM_TYPES.map((itemType) => {
                            return <option
                                key={itemType}
                                value={itemType}
                            >
                                {itemType}
                            </option>;
                        })
                    }
                </select>
            </div>
        </div>

        <Button
            className={getClassName(themes.getBasicStyling('success'))}
            disabled={isPending}
            submit='new_item_form'
        >
            New Item
        </Button>
    </form>;
}