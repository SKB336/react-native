import { SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import RepeatingFormComponent from '../../components/RepeatingFormComponent';
import { FormField } from '../../types/forms';

const SkillForm = () => {
  const formFields: FormField[] = [
    { name: 'skill', label: 'Skill', required: false }
  ];

  const handleSubmit = (allEntries: Record<string, any>[]) => {
    console.log('All Skill Entries:', allEntries);
    router.push('/(tabs)/create');
  };

  return (
    <SafeAreaView>
      <RepeatingFormComponent
        title="Skill"
        fields={formFields}
        onSubmit={handleSubmit}
        submitLabel="Save"
        storageKey="skill_entries"
      />
    </SafeAreaView>
  );
};

export default SkillForm;
