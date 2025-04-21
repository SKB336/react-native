import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BaseButton from './BaseButton';

// Type definitions
type FieldType = 'text' | 'textarea' | 'select' | 'email' | 'password' | 'number' | 'date' | 'url';

interface FieldOption {
  label: string;
  value: string;
}

interface FormField {
  name: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];
}

interface CustomFormProps {
  title?: string;
  fields: FormField[];
  onSubmit: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  submitLabel?: string;
}

/**
 * CustomForm Component for React Native with NativeWind
 */
const CustomForm: React.FC<CustomFormProps> = ({
  title = 'Form',
  fields = [],
  onSubmit,
  initialValues = {},
  submitLabel = 'Submit'
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

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
    }
  };

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
        {/* <View className="mb-6">
          <Text className="text-2xl font-bold text-center text-gray-800">{title}</Text>
        </View> */}

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

        {/* <TouchableOpacity
          onPress={handleSubmit}
          className="mt-6 py-4 bg-blue-600 rounded-md items-center"
        >
          <Text className="text-white font-medium text-base">{submitLabel}</Text>
        </TouchableOpacity> */}
        <BaseButton 
            title="Save" 
            handlePress={handleSubmit}
        />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomForm;