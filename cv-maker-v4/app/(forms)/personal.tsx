import { router } from 'expo-router';
import FormComponent from '../../components/FormComponent';
import { FormField  } from '../../types/forms';

const PersonalForm = () => {
  const handleSubmit = (values: any) => {
    console.log('PersonalForm values:', values);
    router.push('/(tabs)/create')
  };
  
  // Types for the entire form fields array
  const formFields: FormField[] = [
    { name: 'fullName', label: 'Full Name', required: true },
    { name: 'address', label: 'Address', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'number', required: true },
    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
    { name: 'website', label: 'Website', type: 'url', required: true },
    { name: 'linkedIn', label: 'Linked In', type: 'url', required: true },
    // { name: 'category', label: 'Category', type: 'select', options: [{ label: 'Option 1', value: 'option1' }, 
    //   { label: 'Option 2', value: 'option2' }] }
  ];

  return (
    <FormComponent
      title="Personal Information"
      fields={formFields}
      onSubmit={handleSubmit}
      submitLabel="Save"
      storageKey="personal_form"
    />
  );
};

export default PersonalForm;