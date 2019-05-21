import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';


export default createStackNavigator({
  login: LoginScreen,
});