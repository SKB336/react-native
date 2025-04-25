import React from 'react';
import { SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import RepeatingFormComponent from '../../components/RepeatingFormComponent';
import { FormField } from '../../types/forms';

const ExperienceForm = () => {
  const formFields: FormField[] = [
    { name: 'company', label: 'Company Name', required: true },
    { name: 'position', label: 'Job Title', required: true },
    { name: 'dateFrom', label: 'Start Date', required: false },
    { name: 'dateTo', label: 'End Date', required: false },
    { name: 'details', label: 'Details', type: 'textarea', required: false }
  ];

  const handleSubmit = (allEntries: Record<string, any>[]) => {
    console.log('All Experience Entries:', allEntries);
    router.push('/(tabs)/create');
  };

  return (
      <SafeAreaView>
        <RepeatingFormComponent
          title="Experience"
          fields={formFields}
          onSubmit={handleSubmit}
          submitLabel="Save"
          storageKey="experience_entries"
        />
      </SafeAreaView>
  );
};

export default ExperienceForm;
