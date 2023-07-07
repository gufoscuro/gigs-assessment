import { v4 } from 'uuid'
import { UITextfield, UISelectField, UITextareaField } from './form'

export interface Component {
    id: string;
    uuid: string;
    uiComponentID: string;
    editing: boolean;
    selected: boolean;
    children?: ComponentContainer;
    parent?: ComponentContainer;

    setEditing: (value: boolean) => void;
    setSelected: (value: boolean) => void;
    applyValues: () => void;
    revertValues: () => void;
    getID: () => string;
    validate: () => Promise<boolean>;
    toJSON: () => any;
}

export class ComponentContainer extends Array<Component> {
    parent?: Component;

    constructor(parent?: Component) {
        super();
        this.parent = parent || undefined;
    }

    protected insertInPosition(target: Component, component: Component, before: boolean = false) {
        const uuid = target ? target.getID() : null;
        const index = uuid === null ? 0 : this.findIndex(it => it.id === uuid);
        if (index !== -1) {
            this.splice(index + (before ? 0 : 1), 0, component);
        }
    }

    empty() {
        this.splice(0, this.length);
    }

    insertAfter(target: Component, component: Component) {
        this.insertInPosition(target, component, false);
    }

    insertBefore(target: Component, component: Component) {
        this.insertInPosition(target, component, true);
    }

    remove(uuid: string) {
        const index = this.findIndex(it => it.id === uuid);
        if (index !== -1) {
            this.splice(index, 1);
        }
    }

    toJSON () {
        return [...this]
    }
}

export abstract class IComponent implements Component {
    id: string;
    uuid: string;
    uiComponentID: string;
    editing: boolean;
    selected: boolean;
    children?: ComponentContainer;
    parent?: ComponentContainer;

    constructor(data: any, parent?: ComponentContainer) {
        this.id = data.id;
        this.uiComponentID = '';
        this.uuid = v4();
        this.parent = parent;
        this.editing = false;
        this.selected = false;
        this.parseChildren(data.children);
    }

    parseChildren(children: any) {
        if (children) {
            this.children = new ComponentContainer(this);
            for(const c of children) {
                const config = typeof(c.toJSON) === 'function' ? c.toJSON() : c;
                this.children.push(IComponent.factory(config, this.children));
            }
        }
    }
    
    setEditing (value: boolean) {
        this.editing = value;
    }

    setSelected (value: boolean) {
        this.selected = value;
    }

    getID(): string {
        return this.uuid;
    }

    applyValues () {

    }

    revertValues () {

    }

    toJSON(): any {
        return {
            id: this.id,
            ...this.children ? { children: this.children.toJSON() } : {}
            // ...this.editing ? { editing: this.editing } : {}
        }
    }

    async validate (): Promise<boolean> {
        return true
    }

    static factory(data: any, parent: ComponentContainer): IComponent {
        switch(data.id) {
            case "A":
                return new A(data, parent);
            case "B":
                return new B(data, parent);
            case "C":
                return new C(data, parent);
            default:
                return new Unknown(data, parent);
        }
    }
}

class Unknown extends IComponent {
    uiComponentID: string = 'GenericRenderer';
    data: any;

    constructor(data: any, parent: ComponentContainer) {
        super(data, parent);
        this.data = {
            ...data
        }
    }

    toJSON(): any {
        return {
            ...super.toJSON(),
            ...this.data
        }
    }
}

export abstract class NameValue extends IComponent {
    name: UITextfield;
    value: UITextfield;

    constructor(data: any, parent: ComponentContainer) {
        super(data, parent);
        this.name = new UITextfield('name', data.name ?? '', { label: 'Name', required: true });
        this.value = new UITextfield('value', data.value ?? '', { label: 'Value', required: true });
    }

    applyValues () {
        super.applyValues();
        this.name.applyValue();
        this.value.applyValue();
    }

    revertValues () {
        super.revertValues();
        this.name.revertValue();
        this.value.revertValue();
    }

    async validate(): Promise<boolean> {
        return (await Promise.all([ super.validate(), this.name.validate() ]))
            .every(it => it === true);
    }

    toJSON(): any {
        return {
            ...super.toJSON(),
            ...this.name.toJSON(),
            ...this.value.toJSON()
        }
    }
}

export class A extends NameValue {
    uiComponentID: string = 'A'
}

export class B extends NameValue {
    uiComponentID: string = 'B'
}

export class C extends IComponent {
    uiComponentID: string = 'C'
    content: UITextfield;

    constructor(data: any, parent: ComponentContainer) {
        super(data, parent);
        this.content = new UITextfield('content', data.content ?? '', { label: 'Content' });
    }

    applyValues () {
        super.applyValues();
        this.content.applyValue();
    }

    revertValues () {
        super.revertValues();
        this.content.revertValue();
    }

    toJSON(): any {
        return {
            ...super.toJSON(),
            ...this.content.toJSON()
        }
    }
}