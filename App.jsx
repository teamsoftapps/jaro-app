/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import loginBackground from './src/assets/images/login-background.png';
import Dashboard from './src/screens/Dashboard/Dashboard';
import LoginScreen from './src/screens/Login/LoginScreen';

function App() {
  return <Dashboard />;
}

const styles = StyleSheet.create({});

export default App;
