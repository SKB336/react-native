import { View, Text } from 'react-native';
import CardComponent from '~/components/CardComponent';
import icons from '~/constants/icons';
import { Href, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import ButtonComponent from '~/components/ButtonComponent';

const cardData: {
  name: string;
  icon: keyof typeof FontAwesome.glyphMap;
  path: string;
}[] = [
  { name: 'Personal',   icon: "user",             path: "/(forms)/personal" },
  { name: 'Education',  icon: "graduation-cap",   path: "/(forms)/education" },
  { name: 'Experience', icon: "briefcase",        path: "/(tabs)/home" },
  { name: 'Skills',     icon: "star",             path: "/(tabs)/home" },
  { name: 'Objective',  icon: "bullseye",         path: "/(tabs)/home" },
  { name: 'Reference',  icon: "paperclip",        path: "/(tabs)/home" },
];

export default function CreateScreen() {
  const onNext = () => {};

  return (
    <View className="flex-1 relative border">
      {/* Colored background for top 1/4 of screen */}
      <View className="absolute top-0 left-0 right-0 h-[9%] bg-primary" />
      
      {/* Content sits on top */}
      <View className="flex-1 p-4 z-10">
        <View className='items-center'>
          <View className="flex-row flex-wrap w-full justify-center gap-4">
            {cardData.map((item, index) => (
              <CardComponent
                key={index}
                iconName={item.icon}
                name={item.name}
                onPress={() => router.push(item.path as Href)}
              />
            ))}
          </View>
        </View>

        <View className='mt-6 border border-red-200'>
          <Text className='text-xl'>
            More Sections
          </Text>
        </View>
      </View>

      

      <View 
        className='py-6 px-4'>

        <ButtonComponent
          title="Next"
          handlePress={onNext}
          />
      </View>
    </View>
  );
}