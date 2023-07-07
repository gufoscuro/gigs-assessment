import React from 'react'
import { Component } from '@/app/$lib/composer/domain/component'
import { AbstractUIField } from '@/app/$lib/composer/domain/form';
import UITextfield from './components/UITextfield'
import type { ComposerAPI } from '../ComponentFactory'

export type ComponentProps = {
    field: AbstractUIField;
    component: Component;
    composerAPI: ComposerAPI;
}

function getComponent(component: Component, field: AbstractUIField, composerAPI: any) {
    switch(field.uiComponentId) {
        case "UITextfield":
            return (<UITextfield composerAPI={composerAPI} field={field} />);
        default:
            return (<div>No renderer for the form element "{field.uiComponentId}"</div>);
    }
}

const Factory: React.FC<ComponentProps> = ({ component, field, composerAPI }) => {
    return getComponent(component, field, composerAPI);
};

export default Factory