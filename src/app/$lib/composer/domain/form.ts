export type ErrorMessagesMap = {
    [k: string]: string;
}

export type InitialValuesMap = {
    [k: string]: any;
}

export type UIFieldOptions = {
    label?: string;
    required?: boolean;
    disabled?: boolean;
}

export type OptionListItem = {
    label: string;
    value: string;
}

export abstract class AbstractUIField {
    name: string;
    value: any;
    editorValue: any;
    label: string;
    isValid: boolean;
    errorMessage: string;
    uiComponentID: string;
    required: boolean;
    disabled: boolean;

    constructor(name: string, value: any, options: any = {}) {
        this.isValid = true;
        this.name = name;
        this.value = value;
        this.editorValue = value;
        this.label = options.label || '';
        this.required = options.required || false;
        this.disabled = options.disabled !== undefined ? options.disabled : false;
        this.errorMessage = '';
        this.uiComponentID = '';
    }

    getValue(): any {
        return this.value;
    }

    setEditorValue(value: any) {
        this.editorValue = value;
    }

    getEditorValue(): any {
        return this.editorValue;
    }

    applyValue() {
        this.value = this.editorValue;
    }

    revertValue() {
        this.editorValue = this.value;
    }

    toString(): string {
        return this.value as string;
    }

    toJSON(): any {
        return { [this.name]: this.value }
    }

    getErrorObject(): ErrorMessagesMap {
        return this.errorMessage !== '' ? { [this.name]: this.errorMessage } : {}
    }

    async validate(): Promise<boolean> {
        this.isValid = true;
        return this.isValid;
    }
}

export class UITextfield extends AbstractUIField {
    uiComponentId: string = 'UITextfield';

    constructor(name: string, value: any, options?: UIFieldOptions) {
        super(name, value !== undefined ? value : '', options)
    }

    async validate(): Promise<boolean> {
        try {
            const value = this.getEditorValue();
            this.isValid = this.required ? (!!value && value.trim() !== '') : true;
            this.errorMessage = this.isValid ? '' : `The field ${this.name} cannot be empty.`;
        } catch {
            this.isValid = false;
            this.errorMessage = `The field ${this.name} appears to contain an invalid type.`;
        }
        return this.isValid;
    }
}

export class UISelectField extends AbstractUIField {
    optionsList: Array<OptionListItem> = [];
    uiComponentId: string = 'UISelectfield';

    constructor(name: string, value: string, optionsList: Array<OptionListItem>, options: UIFieldOptions = {}) {
        super(name, value, options);
        this.optionsList = optionsList;
    }

    setOptions(optionsList: Array<OptionListItem>) {
        this.optionsList = optionsList;
    }

    async validate(): Promise<boolean> {
        const isValid = this.optionsList.map(it => it.value).includes(this.getEditorValue());
        this.errorMessage = isValid ? '' : `Invalid options selected. Must be one of: ${this.optionsList.map(it => it.value).join(' | ')}`;
        return isValid;
    }
}

export class UITextareaField extends AbstractUIField {
    uiComponentId: string = 'UITextareafield';
}