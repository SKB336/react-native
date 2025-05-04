export interface FieldOption {
    label: string;
    value: string;
}

export type FieldType = 'text' | 'textarea' | 'select' | 'email' | 'password' | 'number' | 'date' | 'url' | 'image';

export interface FormField {
    name: string;
    label: string;
    type?: FieldType;
    placeholder?: string;
    required?: boolean;
    options?: FieldOption[];
}