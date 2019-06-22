import React from "react";
import { StyleSheet, View, Image, AsyncStorage, KeyboardAvoidingView } from "react-native";
import { Container, Header, Content, Form, Item, Input, Body, Right, Title, Text, Button, Label } from 'native-base';
import logo from "./../assets/images/logo.png"
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };
  costrustor () {
    this.state = {
      userGroup: ''
    }
  }
  _signInAsync = async () => {
    await AsyncStorage.setItem('userGroup', this.state.userGroup, () => {
      this.props.navigation.navigate('Main')
    });
  };
  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.container} padder disableKBDismissScroll={true}>
          <KeyboardAvoidingView behavior="padding">
            <Image source={logo} style={{height: 100, marginBottom: 100, width: null, resizeMode: 'contain'}} />
            <Form>
              <Item stackedLabel last>
                <Label>Группа</Label>
                <Input onChangeText={val => this.setState({userGroup: val})} />
              </Item>
              <Button onPress={this._signInAsync.bind(this)} rounded block primary style={{marginHorizontal: 40, marginTop: 50, backgroundColor: '#006CB5'}}><Text> Вход </Text></Button>
            </Form>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: 'center',
    flex: 1,
    width: null
  }
});