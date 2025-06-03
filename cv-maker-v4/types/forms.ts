interface FieldOption {
    label: string;
    value: string;
}

type FieldType = 'text' | 'textarea' | 'select' | 'email' | 'password' | 'number' | 'date' | 'url' | 'image';

export interface FormField {
    name: string;
    label: string;
    type?: FieldType;
    placeholder?: string;
    required?: boolean;
    options?: FieldOption[];
    ai?: {
        enabled: boolean;
        apiKey?: string;
        apiEndpoint?: string;
        prompt: string;
        contextKey?: string[];
    };
}