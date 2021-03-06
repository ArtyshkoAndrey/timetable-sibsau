import React from "react"
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
export default class LogoutScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };
  constructor(props) {
    super(props)
    this._signOutAsync()
  };
  _signOutAsync () {
    AsyncStorage.removeItem('userGroup', () => {
      AsyncStorage.removeItem('timetable', () => {
        this.props.navigation.navigate('Auth')
      })
    })
  };
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