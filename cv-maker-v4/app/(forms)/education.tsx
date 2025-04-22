import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import BaseButton from "~/components/BaseButton";
import FormField from "~/components/FormField";
import images from "~/constants/images";

const EducationForm = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const submit = () => {}

    return (
    <SafeAreaView className='bg-primary h-full'>
        <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-4'>
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

            <BaseButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            />
        </View>
        </ScrollView>
    </SafeAreaView>
    )
}