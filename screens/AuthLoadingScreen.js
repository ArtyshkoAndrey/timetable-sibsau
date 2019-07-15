import React from 'react';
import * as Expo from 'expo';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Notifications, Permissions } from 'expo';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    Notifications.createChannelAndroidAsync('update-messages', {
      name: 'Обновление приложения',
      sound: true,
    })
    this.askPermissions()
    this._bootstrapAsync();
  }
  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== granted) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== granted) {
      return false;
    }
    return true;
  }
  sendNotificationImmediately = async () => {
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: 'Приложение обновлено',
      body: 'Приложение обновилось до последней версии.',
      android: {
        icon: '../assets/images/icon.png',
        channelId: 'update-messages',
      }
    });
    console.log(notificationId); // can be saved in AsyncStorage or send to server
  };
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    if (!__DEV__) {
      try {
        const update = await Expo.Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          this.sendNotificationImmediately()
          await Expo.Updates.fetchUpdateAsync()
          await Expo.Updates.reloadFromCache()
        }
      } catch (e) {
        alert(e)
      }
    }
    const userToken = await AsyncStorage.getItem('userGroup');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    await this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});