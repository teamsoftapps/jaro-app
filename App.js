/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import LoginScreen from './src/screens/Login/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from './src/screens/Splash/SplashScreen';
import Dashboard from './src/screens/Dashboard/Dashboard';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="splash" component={SplashScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="dashboard" component={Dashboard} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
