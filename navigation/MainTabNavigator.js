// import React from 'react';
// import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
// import { Easing, Animated } from 'react-native';
// import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';
// import LogoutScreen from '../screens/LogoutScreen';
// import NewsScreen from '../screens/NewsScreen';

// const HomeTabs = createBottomTabNavigator({
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: {
//       title: "Расписание",
//       tabBarIcon: ({ focused }) => (
//         <TabBarIcon
//           focused={focused}
//           name={'table'}
//         />
//       )
//     }
//   },
//   News: {
//     screen: NewsScreen,
//     navigationOptions: {
//       title: "Новости",
//       tabBarIcon: ({ focused }) => (
//         <TabBarIcon
//           focused={focused}
//           name={'newspaper'}
//         />
//       )
//     }
//   },
//   Logout: {
//     screen: LogoutScreen,
//     navigationOptions: {
//       title: "Выйти",
//       tabBarIcon: ({ focused }) => (
//         <TabBarIcon
//           focused={focused}
//           name={'exit-to-app'}
//         />
//       )
//     }
//   },
// })

// export default createStackNavigator({ HomeTabs }, { 
//   headerMode: "none",
//   defaultNavigationOptions: {
//     gesturesEnabled: false,
//   },
//   transitionConfig: () => ({
//     transitionSpec: {
//       duration: 300,
//       easing: Easing.out(Easing.poly(4)),
//       timing: Animated.timing,
//     },
//     screenInterpolator: sceneProps => {
//       const { layout, position, scene } = sceneProps;
//       const { index } = scene;

//       const height = layout.initHeight;
//       const translateY = position.interpolate({
//         inputRange: [index - 1, index, index + 1],
//         outputRange: [height, 0, 0],
//       });

//       const opacity = position.interpolate({
//         inputRange: [index - 1, index - 0.99, index],
//         outputRange: [0, 1, 1],
//       });

//       return { opacity, transform: [{ translateY }] };
//     },
//   }),
// });

import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Easing, Animated, Platform } from 'react-native'
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LogoutScreen from '../screens/LogoutScreen';
import NewsScreen from '../screens/NewsScreen';
import { zoomOut } from 'react-navigation-transitions';

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
      title: "Выйти",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={'exit-to-app'}
        />
      )
    }
  },
})

export default createStackNavigator({ HomeTabs }, {
  headerMode: "none",
  transitionConfig: () => zoomOut(),
});