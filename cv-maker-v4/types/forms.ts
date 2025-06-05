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

export interface TemplateDataType {
    personal_form?: {
      fullName: string;
      currentPosition?: string;
      email: string;
      phone: string;
      linkedIn?: string;
      website?: string;
      photo?: any; // TYPE: Maybe a Number pointing to the image
    };
    objective_form?: {
      objective: string;
    };
    experience_entries?: Array<{
      position: string;
      company: string;
      dateFrom: string;
      dateTo: string;
      details?: string;
    }>;
    education_entries?: Array<{
      course: string;
      institution: string;
      year: string;
    }>;
    skill_entries?: Array<{
      skill: string;
    }>;
    reference_entries?: Array<{
      refName: string;
      company: string;
      position: string;
      phone: string;
      email: string;
    }>;
}