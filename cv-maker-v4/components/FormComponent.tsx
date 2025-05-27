import React, { useEffect, useState } from 'react';
import { 
  View, Text, TextInput, 
  TouchableOpacity, Image, ScrollView, 
  KeyboardAvoidingView, Platform, ActivityIndicator 
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormField } from '~/types/forms';
import ButtonComponent from './ButtonComponent';
import { API_KEY } from '~/constants/api';
import { fetchAISuggestion } from '~/utils/fetchAPI';


interface FormComponentProps {
  title?: string;
  fields: FormField[];
  onSubmit: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  submitLabel?: string;
  storageKey?: string;
  aiApiKey?: string;
}

const FormComponent: React.FC<FormComponentProps> = ({
  title = 'Form',
  fields = [],
  onSubmit,
  initialValues = {},
  submitLabel = 'Submit',
  storageKey = "default_key",
  aiApiKey = API_KEY,
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccessful, setSubmissionSuccessful] = useState<boolean>(false);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  useEffect(() => {
    const loadFormValues = async () => {
      try {
        const savedValues = await AsyncStorage.getItem(storageKey);
        if (savedValues) {
          console.log("Saved", savedValues)
          setFormValues(JSON.parse(savedValues));
        }
      } catch (err) {
        console.error('Failed to load form values:', err);
      }
    };

    loadFormValues();
  }, [storageKey]);

  const handleChange = (name: string, value: any): void => {
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach(field => {
      if (field.required && !formValues[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (): void => {
    if (validateForm()) {
      onSubmit && onSubmit(formValues);
      setSubmissionSuccessful(true);
    }
  };

  useEffect(() => {
    if (submissionSuccessful) {
      const saveValue = async () => {
        try {
          await AsyncStorage.setItem(storageKey, JSON.stringify(formValues));
          setSubmissionSuccessful(false);
        } catch (error) {
          console.error('Failed to save value:', error);
        }
      };

      saveValue();
    }
  }, [submissionSuccessful, formValues, storageKey]);

  const renderField = (field: FormField) => {
    const { name, label, type = 'text', placeholder, required, options, ai } = field;

    const suggestWithAI = async () => {
      if (!ai?.prompt) return;
      setLoadingSuggestion(true);
      try {
        const suggestion = await fetchAISuggestion(ai.prompt);
        handleChange(name, suggestion);
      } catch (err) {
        console.error('AI Suggestion error:', err);
        // You might want to show an error message to the user here
        setErrors(prev => ({
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
          <View key={name}>
            <TextInput
              multiline
              numberOfLines={4}
              value={formValues[name] || ''}
              onChangeText={(text) => handleChange(name, text)}
              placeholder={placeholder || ''}
              className="w-full p-4 mb-2 border border-gray-300 rounded-md bg-white text-gray-800"
            />
            {showAISuggestionButton && (
              <TouchableOpacity
                onPress={suggestWithAI}
                disabled={loadingSuggestion}
                className={`flex-row items-center justify-center p-2 mb-2 rounded-md ${
                  loadingSuggestion 
                    ? 'bg-gray-300' 
                    : 'bg-blue-500'
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
          <View key={name} className="w-full mb-4">
            {options?.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleChange(name, option.value)}
                className={`p-3 mb-1 border rounded-md ${
                  formValues[name] === option.value 
                    ? 'bg-blue-100 border-blue-500' 
                    : 'bg-white border-gray-300'
                }`}
              >
                <Text className="text-gray-800">{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'image':
        return (
          <TouchableOpacity
            key={name}
            onPress={async () => {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
              });
              if (!result.canceled) {
                handleChange(name, result.assets[0].uri);
              }
            }}
            className="w-full mb-4"
          >
            <View className="w-full p-4 border border-gray-300 rounded-md bg-white items-center justify-center">
              {formValues[name] ? (
                <Image
                  source={{ uri: formValues[name] }}
                  className="w-full aspect-square rounded-md"
                  resizeMode="cover"
                />
              ) : (
                <Text className="text-gray-500">Upload Image</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      case 'text':
      default:
        return (
          <View key={name}>
            <TextInput
              value={formValues[name] || ''}
              onChangeText={(text) => handleChange(name, text)}
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
                  loadingSuggestion 
                    ? 'bg-gray-300' 
                    : 'bg-blue-500'
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-50">
        <SafeAreaView className="flex-1" edges={['right', 'left', 'bottom']} >
          <View className='py-6 px-4'>
            {fields.map((field) => (
              <View key={field.name} className="mb-4">
                <Text className="mb-2 text-sm font-medium text-gray-700">
                  {field.label} {field.required && <Text className="text-red-500">*</Text>}
                </Text>
                {renderField(field)}
                {errors[field.name] && (
                  <Text className="mt-1 text-sm text-red-500">{errors[field.name]}</Text>
                )}
              </View>
            ))}

            <ButtonComponent 
                title={submitLabel} 
                handlePress={handleSubmit}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormComponent;