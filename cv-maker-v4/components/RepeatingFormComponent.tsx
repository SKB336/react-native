import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Button, Pressable } from 'react-native';
import ButtonComponent from './ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome6 } from '@expo/vector-icons'
import { v4 as uuidv4 } from 'uuid';
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

interface RepeatingFormComponentProps {
  title?: string;
  fields: FormField[];
  onSubmit: (values: Record<string, any>[]) => void;
  initialValues?: Record<string, any>[];
  submitLabel?: string;
  storageKey?: string;
}

const RepeatingFormComponent: React.FC<RepeatingFormComponentProps> = ({
  title = 'Form',
  fields = [],
  onSubmit,
  initialValues = [{}],
  submitLabel = 'Submit',
  storageKey = 'default_key'
}) => {
  const [formEntries, setFormEntries] = useState<Record<string, any>[]>(initialValues);
  const [errorsList, setErrorsList] = useState<Record<string, string | null>[]>([]);

  useEffect(() => {
    const loadFormValues = async () => {
      try {
        const savedValues = await AsyncStorage.getItem(storageKey);
        if (savedValues) {
          setFormEntries(JSON.parse(savedValues));
        }
      } catch (err) {
        console.error('Failed to load form values:', err);
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
    const { name, label, type = 'text', placeholder, options } = field;
    const value = formEntries[formIndex]?.[name] || '';
    const error = errorsList[formIndex]?.[name];

    switch (type) {
      case 'textarea':
        return (
          <TextInput
            multiline
            numberOfLines={4}
            value={value}
            onChangeText={(text) => handleChange(formIndex, name, text)}
            placeholder={placeholder || ''}
            className="w-full p-4 mb-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
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
          <TextInput
            value={value}
            onChangeText={(text) => handleChange(formIndex, name, text)}
            placeholder={placeholder || ''}
            secureTextEntry={type === 'password'}
            keyboardType={type === 'email' ? 'email-address' : type === 'number' ? 'numeric' : 'default'}
            className="w-full p-4 mb-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
        );
    }
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   className="flex-1"
    // >
      <ScrollView className='' keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding:16 }}>
        {/* <View className="p-4"> */}
          {formEntries.map((_, index) => (
            <View key={index} className='mb-6 rounded-md overflow-hidden'>
            {/* <View className="bg-white"> */}
              {/* <Text className="text-lg font-semibold mb-2">{title} {index + 1}</Text> */}
              <View className="flex-row items-center justify-between px-2 bg-primary">
                <Text className="text-lg font-semibold text-white">{title} {index + 1}</Text>
                {index > 0 && (
                  <Pressable onPress={() => removeFormEntry(index)} className=''>
                    <FontAwesome6 name="trash" size={16} color="white" />
                  </Pressable>
                )}
              </View>
              {/* </View> */}
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

          <Button title="Add Another" onPress={addFormEntry} />

          <View className="mt-4">
            <ButtonComponent title={submitLabel} handlePress={handleSubmit} />
          </View>
        {/* </View> */}
      </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default RepeatingFormComponent;
