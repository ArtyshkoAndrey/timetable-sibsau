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
    this.state.isRefreshing = true
    fetch('http://95.188.80.41/group/БПА17-01')
      .then((response) => {
        try {
          return response.json()
        } catch(e) {
          alert("Нет такой группы")
          // this.props.navigation.navigate('LogoutStack')
        }
      })
      .then(() => {
        this.state.isRefreshing = false
      })
  }
  _renderItem () {
    let pay = []
    for (let i = 0; i < 1; i++) {
      pay.push(
        <Card key={i}>
          <CardItem bordered>
            <Left>
              <Thumbnail source={logo} />
              <Body>
                <Text>СибГУ</Text>
                <Text note>17 июня 2019</Text>
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
                Добро пожаловать в новое приложение "Расписание СибГУ". Здесь Вы найдёте своё актуальное расписание занятий и экзаменов
              </Text>
            </Body>
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