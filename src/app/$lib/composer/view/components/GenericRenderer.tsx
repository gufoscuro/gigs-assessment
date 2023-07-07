import React, { useMemo } from 'react'
import { ComponentProps } from '@/app/$lib/composer/view/ComponentFactory'
import ComponentWrapper from './ComponentWrapper'
import ComponentRenderer from './ComponentRenderer'

const GenericRenderer: React.FC<ComponentProps> = ({ component, composerAPI }) => {
    const renderer = useMemo(() => JSON.stringify(component, null, '   '), [ component ])
    return (
        <ComponentWrapper selected={component.selected} editing={component.editing} component={component} composerAPI={composerAPI}>
            <div className="text-sm font-bold">GenericRenderer</div>
            {component.editing ? (
                <div>This component cannot be edited so far</div>
            ) : (
                <ComponentRenderer>
                    <pre className="text-sm text-gray-500">{renderer}</pre>
                </ComponentRenderer>
            )}
        </ComponentWrapper>
    );
};

export default GenericRenderer