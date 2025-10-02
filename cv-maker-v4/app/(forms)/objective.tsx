import { useEffect, useState } from "react";
import { router } from "expo-router";
import FormComponent from "~/components/FormComponent";
import { FormField } from "~/types/forms";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ObjectiveForm = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);

  const handleSubmit = (values: any) => {
    console.log('ObjectiveForm values:', values);
    router.push('/(tabs)/create');
  };

  const loadContext = async () => {
    const savedValues = await AsyncStorage.getItem('personal_form');
    return JSON.parse(savedValues || '{}');
  };

  useEffect(() => {
    const generateFields = async () => {
      const context = await loadContext();
      const jobTitle = context.jobTitle || 'a suitable job title';
      // const contextString = JSON.stringify(context, null, 2) || 'No Context was passed';

      const fields: FormField[] = [
        {
          name: 'objective',
          label: 'Objective',
          type: 'textarea',
          required: true,
          ai: {
            enabled: true,
            prompt: `
              Write a concise resume objective for a "${jobTitle}" position, written from the candidate’s point of view. 
              Keep it professional, CV-appropriate, and limited to one short paragraph without headings, bullet points, double/single quotes or formatting.
              `,
          },
        },
      ];

      setFormFields(fields);
    };

    generateFields();
  }, []);

  if (formFields.length === 0) return null; // or a loading spinner

  return (
    <FormComponent
      title="Objective"
      fields={formFields}
      onSubmit={handleSubmit}
      submitLabel="Save"
      storageKey="objective_form"
    />
  );
};

export default ObjectiveForm;
