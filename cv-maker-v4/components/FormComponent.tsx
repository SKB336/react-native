import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import ButtonComponent from './ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormField } from '~/types/forms';

// Type definitions
// type FieldType = 'text' | 'textarea' | 'select' | 'email' | 'password' | 'number' | 'date' | 'url';

// interface FieldOption {
//   label: string;
//   value: string;
// }

// interface FormField {
//   name: string;
//   label: string;
//   type?: FieldType;
//   placeholder?: string;
//   required?: boolean;
//   options?: FieldOption[];
// }

interface FormComponentProps {
  title?: string;
  fields: FormField[];
  onSubmit: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  submitLabel?: string;
  storageKey?: string;
}

/**
 * FormComponent Component for React Native with NativeWind
 */
const FormComponent: React.FC<FormComponentProps> = ({
  title = 'Form',
  fields = [],
  onSubmit,
  initialValues = {},
  submitLabel = 'Submit',
  storageKey = "default_key"
}) => {
  // console.log(AsyncStorage.getItem(storageKey))
  const [formValues, setFormValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccessful, setSubmissionSuccessful] = useState<boolean>(false);

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
      // setIsSubmitting(true);
      onSubmit && onSubmit(formValues);
      setSubmissionSuccessful(true); // Indicate successful submission
      // setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submissionSuccessful) {
      // Save value whenever inputValue changes
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
  }, [submissionSuccessful, formValues, storageKey]); // Re-run when inputValue changes

  const renderField = (field: FormField) => {
    const { name, label, type = 'text', placeholder, required, options } = field;
    
    switch (type) {
      case 'textarea':
        return (
          <TextInput
            key={name}
            multiline
            numberOfLines={4}
            value={formValues[name] || ''}
            onChangeText={(text) => handleChange(name, text)}
            placeholder={placeholder || ''}
            className="w-full p-4 mb-4 border border-gray-300 rounded-md bg-white text-gray-800"
          />
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
      case 'text':
      default:
        return (
          <TextInput
            key={name}
            value={formValues[name] || ''}
            onChangeText={(text) => handleChange(name, text)}
            placeholder={placeholder || ''}
            secureTextEntry={type === 'password'}
            keyboardType={type === 'email' ? 'email-address' : type === 'number' ? 'numeric' : 'default'}
            className="w-full p-4 mb-4 border border-gray-300 rounded-md bg-white text-gray-800"
          />
        );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-50">
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormComponent;