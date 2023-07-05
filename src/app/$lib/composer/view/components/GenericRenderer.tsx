import React from 'react'
import { ComponentProps } from '@/app/$lib/composer/view/ComponentFactory'
import ComponentWrapper from './ComponentWrapper'

const GenericRenderer: React.FC<ComponentProps> = ({ component, composerAPI }) => {
    return (
        <ComponentWrapper selected={component.selected} editing={component.editing} component={component} composerAPI={composerAPI}>
            <div className="text-sm font-bold">GenericRenderer</div>
            <pre className="text-sm text-gray-500">{JSON.stringify(component, null, '   ')}</pre>
        </ComponentWrapper>
    );
};

export default GenericRenderer