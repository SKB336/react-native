import CustomForm from '../../components/FormComponent';

const MyScreen = () => {
  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    // Process the form data
  };

  // Define the type for field options (for select/dropdown fields)
  interface FieldOption {
    label: string;
    value: string;
  }
  
  // Define the possible field types
  type FieldType = 'text' | 'textarea' | 'select' | 'email' | 'password' | 'number' | 'date' | 'url';
  
  // Define the structure for a single form field
  interface FormField {
    name: string;
    label: string;
    type?: FieldType;
    placeholder?: string;
    required?: boolean;
    options?: FieldOption[];
  }
  
  // Define the type for the entire form fields array
  const formFields: FormField[] = [
    { name: 'fullName', label: 'Full Name', required: true },
    { name: 'address', label: 'Address', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'number', required: true },
    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
    { name: 'website', label: 'Website', type: 'url', required: true },
    { name: 'linkedIn', label: 'Linked In', type: 'url', required: true },
    // { 
    //   name: 'category', 
    //   label: 'Category', 
    //   type: 'select',
    //   options: [
    //     { label: 'Option 1', value: 'option1' },
    //     { label: 'Option 2', value: 'option2' },
    //   ]
    // }
  ];

  return (
      <CustomForm
        title="Personal Information"
        fields={formFields}
        onSubmit={handleSubmit}
        submitLabel="Save"
      />
  );
};

export default MyScreen;