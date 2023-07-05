import { Component } from '../domain/component'

export class ComponentAPI {
    private static instance: ComponentAPI;
    private lastClickEpoch: number = 0;
    editingItem?: Component;

    private constructor() { }

    static getInstance(): ComponentAPI {
        if (!ComponentAPI.instance) {
            ComponentAPI.instance = new ComponentAPI();
        }

        return ComponentAPI.instance;
    }

    toggleEdit(target: Component) {
        if (target.editing) {
            target.setEditing(false);
        } else {
            if (this.editingItem) {
                this.editingItem.setEditing(false);
            }
            target.setEditing(true);
            this.editingItem = target;
        }
    }

    onComponentClick(target: Component, _: MouseEvent) {
        const currentEpoch: number = new Date().getTime();
        if (this.lastClickEpoch > 0 && currentEpoch - this.lastClickEpoch < 300) {
			this.toggleEdit(target);
		} else {
			// single click behaviour
		}
		this.lastClickEpoch = currentEpoch;
    }
}