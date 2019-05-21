import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Расписание',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'table'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
});
