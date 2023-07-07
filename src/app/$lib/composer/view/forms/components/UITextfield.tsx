import React, { PropsWithChildren, useCallback, useState } from 'react'
import { AbstractUIField } from '../../../domain/form';

type ComponentWrapperProps = {
    field: AbstractUIField;
    composerAPI: any;
} & PropsWithChildren

const UITextfield: React.FC<ComponentWrapperProps> = ({ field }) => {
    const [ value, setValue ] = useState(field.editorValue);
    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        field.setEditorValue(event.target.value);
    }, []);

    return (
        <div className="UIFormField py-2">
            <label className="block text-xm font-semibold">{field.label}</label>
            <input type="text" name={field.name} value={value} onChange={onChange} className={"border border-solid py-1 px-3 " + (field.errorMessage !== '' ? ' bg-red-50 border-red-400' : 'border-gray-500')} />
            {field.errorMessage ? (<div className="text-red-400">{field.errorMessage}</div>) : null}
        </div>
    );
};

export default UITextfield