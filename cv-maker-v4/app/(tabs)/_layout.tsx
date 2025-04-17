import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;