import React from 'react'
import { ComponentProps } from '@/app/$lib/composer/view/ComponentFactory'
import ComponentWrapper from './ComponentWrapper'
import ComponentEditor from './ComponentEditor'
import ComponentRenderer from './ComponentRenderer'
import FormFactory from '../forms/FormFactory'
import { A as AInterface } from '../../domain/component'
import type { ComposerAPI } from '@/app/$lib/composer/view/ComponentFactory'

type ATypeProps = {
    component: AInterface;
    composerAPI: ComposerAPI;
}

const A: React.FC<ATypeProps> = ({ component, composerAPI }) => {
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
                <ComponentRenderer>Renderer A</ComponentRenderer>
            )}
        </ComponentWrapper>
    );
};

export default A