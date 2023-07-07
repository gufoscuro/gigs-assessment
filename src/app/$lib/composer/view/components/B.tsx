import React from 'react'
import { ComponentProps } from '@/app/$lib/composer/view/ComponentFactory'
import ComponentWrapper from './ComponentWrapper'
import ComponentEditor from './ComponentEditor'
import ComponentRenderer from './ComponentRenderer'
import FormFactory from '../forms/FormFactory'

import { B as BInterface } from '../../domain/component'

type BTypeProps = ComponentProps & {
    component: BInterface;
}

const B: React.FC<BTypeProps> = ({ component, composerAPI }) => {
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
                        field={component.name} 
                        composerAPI={composerAPI} 
                        component={component} />
                    <FormFactory 
                        field={component.value} 
                        composerAPI={composerAPI} 
                        component={component} />
                </ComponentEditor>
            ) : (
                <ComponentRenderer>Renderer B</ComponentRenderer>
            )}
        </ComponentWrapper>
    );
};

export default B