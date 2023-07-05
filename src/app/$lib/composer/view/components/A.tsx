import React from 'react'
import { ComponentProps } from '@/app/$lib/composer/view/ComponentFactory'
import ComponentWrapper from './ComponentWrapper'

const A: React.FC<ComponentProps> = ({ component, composerAPI }) => {
    return (
        <ComponentWrapper selected={component.selected} editing={component.editing} component={component} composerAPI={composerAPI}>
            <div className="text-sm font-bold">Renderer A</div>
        </ComponentWrapper>
    );
};

export default A