import React from 'react';
import * as Expo from 'expo';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    if (!__DEV__) {
      try {
        const update = await Expo.Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Expo.Updates.fetchUpdateAsync()
          alert("Новая версия")
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