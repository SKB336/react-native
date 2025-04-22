import { router } from 'expo-router';
import FormComponent from '../../components/FormComponent';
import { FormField  } from '../../types/forms';

const EducationForm = () => {
  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    router.push('/(tabs)/create')
  };

  // interface FieldOption {
  //   label: string;
  //   value: string;
  // }

  // type FieldType = ''

  // interface FormField {
  //   name: string;
  //   label: string;
  //   type?: FieldType;
  //   placeholder?: string;
  //   required?: boolean;
  //   options?: FieldOption[];
  // }

  const formFields: FormField[] = [
    { name: 'course', label: 'Course / Degree', required: true },
    { name: 'institution', label: 'School / University', required: true},
    { name: 'grade', label: 'Score / Grade', required: false },
    { name: 'year', label: 'Year', required: true }
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

export default EducationForm;