import React from 'react';
import { View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import RepeatingFormComponent from '../../components/RepeatingFormComponent';
import { FormField } from '../../types/forms';

const EducationFormScreen = () => {
  const formFields: FormField[] = [
    { name: 'course', label: 'Course / Degree', required: true },
    { name: 'institution', label: 'School / University', required: true },
    { name: 'grade', label: 'Score / Grade', required: false },
    { name: 'year', label: 'Year', required: true }
  ];

  const handleSubmit = (allEntries: Record<string, any>[]) => {
    console.log('All Education Entries:', allEntries);
    router.push('/(tabs)/create');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50" keyboardShouldPersistTaps={`always`}>
      <View className="p-4">
        <RepeatingFormComponent
          title="Education"
          fields={formFields}
          onSubmit={handleSubmit}
          submitLabel="Save"
          storageKey="education_entries"
        />
      </View>
    </ScrollView>
  );
};

export default EducationFormScreen;
