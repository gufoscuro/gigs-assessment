import React, { PropsWithChildren, useCallback } from 'react'
import { Component } from '../../domain/component';

type ComponentWrapperProps = {
    component: Component;
    editing?: boolean;
    selected?: boolean;
    triggerUpdate?: () => void;
    composerAPI: any;
} & PropsWithChildren

const Wrapper: React.FC<ComponentWrapperProps> = ({ editing, selected, children, component, composerAPI }) => {
    const onClick = useCallback((event: React.MouseEvent) => {
        if (composerAPI.componentAPI.onComponentClick) {
            composerAPI.componentAPI.onComponentClick(component, event);
            composerAPI.triggerUpdate();
        }
    }, []);

    return (
        <div onClick={onClick} className={"rounded-sm px-4 py-2 cursor-default " + (editing ? 'bg-blue-50 border border-solid border-blue-400' : 'bg-white') + (selected ? ' bg-blue-50 border border-solid border-blue-400' : '')}>
            {children}
        </div>
    );
};

export default Wrapper