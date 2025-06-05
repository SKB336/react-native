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
    { name: 'jobTitle', label: 'Job Title', required: false },
    { name: 'address', label: 'Address', required: false },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'number', required: true },
    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: false },
    { name: 'website', label: 'Website', type: 'url', required: false },
    { name: 'linkedIn', label: 'Linked In', type: 'url', required: false },
    { name: 'photo', label: 'Photo', type: 'image', required: false },
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