// @ts-nocheck 

import React from 'react'
import { Component } from '@/app/$lib/composer/domain/component'
import { ComponentAPI } from '@/app/$lib/composer/controller/ComponentAPI'
import GenericRenderer from './components/GenericRenderer'
import A from './components/A'
import B from './components/B'
import C from './components/C'

export interface ComposerAPI {
    triggerUpdate: () => void;
    componentAPI: ComponentAPI
}

export interface ComponentProps {
    component: Component;
    composerAPI: ComposerAPI;
}

function getComponent(component: Component, composerAPI: any) {
    switch(component.id) {
        case "A":
            return (<A component={component} composerAPI={composerAPI} />);
        case "B":
            return (<B component={component} composerAPI={composerAPI} />);
        case "C":
            return (<C component={component} composerAPI={composerAPI} />);
        default:
            return (<GenericRenderer component={component} composerAPI={composerAPI} />);
    }
}

const Factory: React.FC<ComponentProps> = ({ component, composerAPI }) => {
    return getComponent(component, composerAPI);
};

export default Factory