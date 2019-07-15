import React from "react";
import { StyleSheet, Image, AsyncStorage, KeyboardAvoidingView, TouchableOpacity, View, ScrollView } from "react-native";
import { Container, Content, Form, Item, Input, List, ListItem, Text, Button, Label } from 'native-base';
import 'abortcontroller-polyfill';
import { Permissions } from 'expo';
import logo from "./../assets/images/logo.png"
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

  constructor (props) {
    super(props)
    this.state = {
      query: '',
      groups: [],
      userGroup: {}
    }
    this.controller = new AbortController()
  }
  async findGroups (query) {
    // this.controller.abort()
    this.setState({query: query})
    await fetch('http://95.188.80.41/api/group/search/' + query + '/3', {signal: this.controller.signal})
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // console.log(data.groups)
        console.log('ok fetch')
        this.setState({groups: data.groups})
      })
      .catch(error => {
        console.log('123123123')
        this.setState({groups: []})
      })
  }
  _onPressGroup (group) {
    this.setState({userGroup: group}, () => {
      console.log('PressGroup', this.state.userGroup)
      this._signInAsync()
    })
  }
  _renderGroups () {
    let view = []
    this.state.groups.forEach(group => {
      view.push(
        <ListItem button key={group.id} onPress={this._onPressGroup.bind(this, group)}>
            <Text>{group.name}</Text>
        </ListItem>
      )
    })
    if (this.state.groups.length === 0 && this.state.query !== '') {
      view.push(
        <ListItem key={1}>
          <Text>Нет таких групп</Text>
        </ListItem>
      )
    }
    return view
  }
  _signInAsync = async () => {
    await AsyncStorage.setItem('userGroup', JSON.stringify(this.state.userGroup), () => {
      this.props.navigation.navigate('Main')
    });
  };
  render() {
    return (
      <Container>
        <Content padder disableKBDismissScroll={true}>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.container}>
              <Image source={logo} style={{height: 100, marginTop: 50, marginBottom: 100, width: null, resizeMode: 'contain'}} />
              <Form style={{flex: 1, paddingBottom: 0, marginBottom: 0}}>
                <Item stackedLabel last>
                  <Label>Группа</Label>
                  <Input onChangeText={val => this.findGroups(val)} />
                </Item>
                <ScrollView style={{flex: 1}}>
                  <List>
                    {this._renderGroups()}
                  </List>
                </ScrollView>
                {/*<Button onPress={this._signInAsync.bind(this)} rounded block primary style={{marginHorizontal: 10, marginTop: 50, backgroundColor: '#006CB5'}}><Text> Вход </Text></Button>*/}
              </Form>
            </View>
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
    width: null,
    flexDirection: 'column',
  }
});