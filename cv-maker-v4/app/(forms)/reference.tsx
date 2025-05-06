import React from 'react';
import { SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import RepeatingFormComponent from '../../components/RepeatingFormComponent';
import { FormField } from '../../types/forms';

const ReferenceForm = () => {
  const formFields: FormField[] = [
    { name: 'refName', label: 'Reference Name', required: true },
    { name: 'position', label: 'Job Title', required: true },
    { name: 'company', label: 'Company Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'number', required: false }
  ];

  const handleSubmit = (allEntries: Record<string, any>[]) => {
    console.log('All Reference Entries:', allEntries);
    router.push('/(tabs)/create');
  };

  return (
      <SafeAreaView>
        <RepeatingFormComponent
          title="Reference"
          fields={formFields}
          onSubmit={handleSubmit}
          submitLabel="Save"
          storageKey="reference_entries"
        />
      </SafeAreaView>
  );
};

export default ReferenceForm;
