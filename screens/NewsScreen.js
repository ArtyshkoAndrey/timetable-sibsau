import React from 'react';
import {ScrollView, RefreshControl } from 'react-native';
import { Image, Dimensions } from "react-native";
import FadeInView from './../components/FadeInView';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body,
} from "native-base";
const deviceWidth = Dimensions.get("window").width;
const logo = require("./../assets/images/logo.png")
const cardImage = require("./../assets/images/splash-port-hdpi.png")

export default class NewsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor (props) {
    super(props);
    this.state = {
      isRefreshing: false
    }
  }
  _onRefresh () {
    console.log("hi")
    this.state.isRefreshing = true
    fetch('http://95.188.80.41/group/БПА17-01')
      .then((response) => {
        try {
          return response.json()
        } catch(e) {
          console.log('123123')
          alert("Нет такой группы")
          // this.props.navigation.navigate('LogoutStack')
        }
      })
      .then((table) => {
        console.log(table)
        this.state.isRefreshing = false
      })
  }
  _renderItem () {
    let pay = []
    for (let i = 0; i < 10; i++) {
      pay.push(
        <Card key={i}>
          <CardItem bordered>
            <Left>
              <Thumbnail source={logo} />
              <Body>
                <Text>NativeBase</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem>
            <Body>
              <Image
                style={{
                  alignSelf: "center",
                  height: 150,
                  resizeMode: "cover",
                  width: deviceWidth / 1.18,
                  marginVertical: 5
                }}
                source={cardImage}
              />
              <Text>
                NativeBase is a free and source framework that enable
                developers to build high-quality mobile apps using React
                Native iOS and Android apps with a fusion of ES6. NativeBase
                builds a layer on top of React Native that provides you with
                basic set of components for mobile application development.
              </Text>
            </Body>
          </CardItem>
          <CardItem style={{ paddingVertical: 0 }}>
            <Left>
              <Button transparent>
                <Icon name="logo-github" />
                <Text>4,923 stars</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      )
    }
    return pay
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#006CB5' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Новости</Title>
          </Body>
          <Right />
        </Header>

        <Content padder  refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            title="Loading..."
          />
        }>

          <ScrollView >
            <FadeInView>
              {this._renderItem()}
            </FadeInView>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}