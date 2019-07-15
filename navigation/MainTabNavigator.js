import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import LogoutScreen from '../screens/LogoutScreen'
import NewsScreen from '../screens/NewsScreen'

const HomeTabs = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Расписание",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={'table'}
        />
      )
    }
  },
  News: {
    screen: NewsScreen,
    navigationOptions: {
      title: "Новости",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={'newspaper'}
        />
      )
    }
  },
  Logout: {
    screen: LogoutScreen,
    navigationOptions: {
      tabBarLabel: () => (
        <Text style={{color: 'red', fontSize: 11, paddingBottom: 2, textAlign: 'center'}}>
          Выйти
        </Text>
      ),
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={'exit-to-app'}
          color={'#ff4545'}
        />
      )
    }
  },
})

export default createStackNavigator({ HomeTabs }, {
  headerMode: "none",
});