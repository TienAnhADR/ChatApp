import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import FriendsScreen from './screens/FriendsScreen';
import ChatsScreen from './screens/ChatsScreen';
import ChatMessageScreen from './screens/ChatMessageScreen';
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}   />
        <Stack.Screen name="FriendsScreen" component={FriendsScreen}   />
        <Stack.Screen name="ChatsScreen" component={ChatsScreen}   />
        <Stack.Screen name="ChatMessageScreen" component={ChatMessageScreen}   />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})