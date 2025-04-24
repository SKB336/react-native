import React from "react";
import { router } from "expo-router";
import FormComponent from "~/components/FormComponent";
import { FormField } from "~/types/forms";

const ObjectiveForm = () => {
  const handleSubmit = (values: any) => {
    console.log('ObjectiveForm values:', values);
    router.push('/(tabs)/create')
  };

  const formFields: FormField[] = [
    { name: 'objective', label: 'Objective', type:'textarea', required: true }
  ];

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