import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router';

import { images } from '../../constants';

import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';

import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider';

interface GlobalContextType {
  setUser: any;
  setIsLoggedIn: any;
}

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext() as GlobalContextType;
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      // set it to global state...

      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-4'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[110px] h-[35px]'
          />

          <Text className='text-2xl text-white text-semibold mt-8 font-psemibold'>Sign up to Aora</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e : any) => setForm({ ...form, username: e })}
            otherStyles="mt-5"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e : any) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e : any) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-base text-gray-100 font-pregular'>
              Have an account already?
            </Text>
            <Link href="/sign-in" className='text-base font-psemibold text-secondary'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp