import React, { useEffect, useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  KeyboardAvoidingView, Pressable, ActivityIndicator 
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FontAwesome6 } from '@expo/vector-icons'

import { API_KEY } from '~/constants/api';
import COLORS from '~/constants/colors';
import ButtonComponent from './ButtonComponent';
import { FormField } from '~/types/forms';
import { fetchAISuggestion } from '~/utils/fetchAPI';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


interface RepeatingFormComponentProps {
  title?: string;
  fields: FormField[];
  onSubmit: (values: Record<string, any>[]) => void;
  initialValues?: Record<string, any>[];
  submitLabel?: string;
  storageKey?: string;
  aiApiKey?: string;
}

const RepeatingFormComponent: React.FC<RepeatingFormComponentProps> = ({
  title = 'Form',
  fields = [],
  onSubmit,
  initialValues = [{}],
  submitLabel = 'Submit',
  storageKey = 'default_key',
  aiApiKey = API_KEY
}) => {
  const [formEntries, setFormEntries] = useState<Record<string, any>[]>(initialValues);
  const [errorsList, setErrorsList] = useState<Record<string, string | null>[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  useEffect(() => {
    const loadFormValues = async () => {
      try {
        const savedValues = await AsyncStorage.getItem(storageKey);
        if (savedValues) {
          setFormEntries(JSON.parse(savedValues));
        }
      } catch (err) {
        console.error('Failed to load form values:', err);
      } finally {
        setLoading(false)
      }
    };

    loadFormValues();
  }, [storageKey]);

  const handleChange = (formIndex: number, name: string, value: any): void => {
    const newEntries = [...formEntries];
    newEntries[formIndex] = {
      ...newEntries[formIndex],
      [name]: value,
    };
    setFormEntries(newEntries);

    const newErrors = [...errorsList];
    if (newErrors[formIndex]) {
      newErrors[formIndex][name] = null;
      setErrorsList(newErrors);
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const allErrors: Record<string, string | null>[] = [];

    formEntries.forEach((entry, index) => {
      const entryErrors: Record<string, string | null> = {};
      fields.forEach(field => {
        if (field.required && !entry[field.name]) {
          entryErrors[field.name] = `${field.label} is required`;
          isValid = false;
        }
      });
      allErrors[index] = entryErrors;
    });

    setErrorsList(allErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formEntries);
      AsyncStorage.setItem(storageKey, JSON.stringify(formEntries)).catch(console.error);
    }
  };

  const addFormEntry = () => {
    setFormEntries([...formEntries, {}]);
    setErrorsList([...errorsList, {}]);
  };

  const removeFormEntry = (index: number) => {
    if (formEntries.length <= 1) return;
    const newEntries = [...formEntries];
    const newErrors = [...errorsList];
    newEntries.splice(index, 1);
    newErrors.splice(index, 1);
    setFormEntries(newEntries);
    setErrorsList(newErrors);
  };

  const renderField = (field: FormField, formIndex: number) => {
    const { name, label, type = 'text', placeholder, options, ai } = field;
    const value = formEntries[formIndex]?.[name] || '';
    const error = errorsList[formIndex]?.[name];

    const suggestWithAI = async () => {
      if (!ai?.prompt) return;
      
      let localizedPrompt = ai.prompt;
      if (ai.contextKey) {
        for (const key of ai.contextKey) {
          localizedPrompt = localizedPrompt.replace(`{{${key}}}`, formEntries[formIndex][key]);
        }
      }
      
      setLoadingSuggestion(true);
      try {
        const suggestion = await fetchAISuggestion(localizedPrompt);
        handleChange(formIndex, name, suggestion);
      } catch (err) {
        console.error('AI Suggestion error:', err);
        // Might want to show an error message to the user here
        setErrorsList(prev => ({
          ...prev,
          [name]: 'Failed to get AI suggestion. Please try again.'
        }));
      }
      setLoadingSuggestion(false);
    };

    const showAISuggestionButton = ai?.enabled && ['text', 'textarea'].includes(type) && aiApiKey;

    switch (type) {
      case 'textarea':
        return (
          <View>
          <TextInput
            multiline
            numberOfLines={4}
            value={value}
            onChangeText={(text) => handleChange(formIndex, name, text)}
            placeholder={placeholder || ''}
            className="w-full p-4 mb-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
            {showAISuggestionButton && (
              <TouchableOpacity
                onPress={suggestWithAI}
                disabled={loadingSuggestion}
                className={`flex-row items-center justify-center p-2 mb-2 rounded-md ${
                  loadingSuggestion ? 'bg-gray-300' : 'bg-blue-500'
                }`}
              >
                {loadingSuggestion ? (
                  <>
                    <ActivityIndicator size="small" color="white" className="mr-2" />
                    <Text className="text-white text-sm">Getting AI suggestion...</Text>
                  </>
                ) : (
                  <Text className="text-white text-sm">✨ Get AI Suggestion</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        );
      case 'select':
        return (
          <View className="w-full mb-2">
            {options?.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleChange(formIndex, name, option.value)}
                className={`p-3 mb-1 border rounded-md ${
                  value === option.value ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
                }`}
              >
                <Text className="text-gray-800">{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return (
          <View>
          <TextInput
            value={value}
            onChangeText={(text) => handleChange(formIndex, name, text)}
            placeholder={placeholder || ''}
            secureTextEntry={type === 'password'}
            keyboardType={type === 'email' ? 'email-address' : type === 'number' ? 'numeric' : 'default'}
            className="w-full p-4 mb-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
          {showAISuggestionButton && (
            <TouchableOpacity
              onPress={suggestWithAI}
              disabled={loadingSuggestion}
              className={`flex-row items-center justify-center p-2 mb-2 rounded-md ${
                loadingSuggestion ? 'bg-gray-300' : 'bg-blue-500'
              }`}
            >
              {loadingSuggestion ? (
                <>
                  <ActivityIndicator size="small" color="white" className="mr-2" />
                  <Text className="text-white text-sm">Getting AI suggestion...</Text>
                </>
              ) : (
                <Text className="text-white text-sm">✨ Get AI Suggestion</Text>
              )}
            </TouchableOpacity>
          )}
          </View>
        );
    }
  };
  
  if (loading) {
    return (
      <View className="h-full justify-center items-center">
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    )
  }

  return (
    <KeyboardAwareScrollView
          // style={{ flex: 1, backgroundColor: '#F9FAFB' }}
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 24, paddingHorizontal: 16 }}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={70} // Little extra padding at the bottom
          enableOnAndroid={true}
        >
        <SafeAreaView className="flex-1" edges={['right', 'left', 'bottom']} >
          {formEntries.map((_, index) => (
            <View key={index} className='mb-6 rounded-md overflow-hidden'>
              <View className="flex-row items-center justify-between px-2 bg-primary">
                <Text className="text-lg font-semibold text-white">{title} {index + 1}</Text>
                {index > 0 && (
                  <Pressable onPress={() => removeFormEntry(index)} className=''>
                    <FontAwesome6 name="trash" size={16} color="white" />
                  </Pressable>
                )}
              </View>

              <View className="bg-white p-4">
                {fields.map((field) => (
                  <View key={field.name} className="mb-2">
                    <Text className="mb-1 text-sm font-medium text-gray-700">
                      {field.label} {field.required && <Text className="text-red-500">*</Text>}
                    </Text>
                    {renderField(field, index)}
                    {errorsList[index]?.[field.name] && (
                      <Text className="text-sm text-red-500">{errorsList[index][field.name]}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}

          <Pressable 
            className="bg-secondary rounded-lg p-3 items-center justify-center" 
            onPress={addFormEntry}
          >
            <Text className="text-white font-semibold">Add Another</Text>
          </Pressable>


          <View className="mt-4">
            <ButtonComponent title={submitLabel} handlePress={handleSubmit} />
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
  );
};

export default RepeatingFormComponent;
