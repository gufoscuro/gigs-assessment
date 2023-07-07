import React, { PropsWithChildren, useCallback } from 'react'
import { Button } from 'flowbite-react';
import type { ComposerAPI } from '../ComponentFactory'
import type { Component } from '../../domain/component'

type ComponentWrapperProps = {
    composerAPI: ComposerAPI;
    component: Component;
} & PropsWithChildren

const Wrapper: React.FC<ComponentWrapperProps> = ({ composerAPI, component, children }) => {
    const onSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const valid = await component.validate();
        if (valid) {
            component.applyValues();
            component.setEditing(false);
        }
        composerAPI.triggerUpdate();
    }, []);

    const onCancel = useCallback(async (event: React.MouseEvent) => {
        event.stopPropagation();
        await component.validate();
        component.revertValues();
        component.setEditing(false);
        composerAPI.componentAPI.cancelEdit();
        composerAPI.triggerUpdate();
    }, [])

    return (
        <form onSubmit={onSubmit}>
            {children}

            <div className="pt-4 pb-2 flex items-center justify-end">
                <Button color="light" className="mr-2" onClick={onCancel}>Cancel</Button>
                <Button color="dark" type="submit">Save Changes</Button>
            </div>
        </form>
    );
};

export default Wrapper