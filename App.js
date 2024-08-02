// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './src/navigation/HomeStackNavigator';
import MyCabScreen from './src/screens/MyCabScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="My Cab" component={MyCabScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
