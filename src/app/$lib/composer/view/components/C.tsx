import React from 'react'
import { ComponentProps } from '@/app/$lib/composer/view/ComponentFactory'
import ComponentWrapper from './ComponentWrapper'
import ComponentEditor from './ComponentEditor'
import ComponentRenderer from './ComponentRenderer'
import FormFactory from '../forms/FormFactory'

import { C as BInterface } from '../../domain/component'

type CTypeProps = ComponentProps & {
    component: BInterface;
}

const C: React.FC<CTypeProps> = ({ component, composerAPI }) => {
    return (
        <ComponentWrapper
            selected={component.selected}
            editing={component.editing}
            component={component}
            composerAPI={composerAPI}>
            {component.editing ? (
                <ComponentEditor 
                    component={component} 
                    composerAPI={composerAPI}>
                    <FormFactory 
                        field={component.content} 
                        composerAPI={composerAPI} 
                        component={component} />
                </ComponentEditor>
            ) : (
                <ComponentRenderer>Renderer C</ComponentRenderer>
            )}
        </ComponentWrapper>
    );
};

export default C