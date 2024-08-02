import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CabsListScreen from '../screens/CabsListScreen';
import CabDetailScreen from '../screens/CabDetailScreen';

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#008e9e', 
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 28,
        },
        headerBackTitleVisible: false, 
        cardStyle: {
          backgroundColor: '#f5f5f5', 
        },
        gestureEnabled: true, 
        animationTypeForReplace: 'push', 
      }}
    >
      <Stack.Screen
        name="Cabs List"
        component={CabsListScreen}
        options={{ title: 'Available Cabs' }} 
      />
      <Stack.Screen
        name="Cab Detail"
        component={CabDetailScreen}
        options={{ title: 'Cab Details' }} 
      />
    </Stack.Navigator>
  );
}
