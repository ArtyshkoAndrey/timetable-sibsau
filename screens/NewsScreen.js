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
import {
    CachedImage,
    ImageCacheProvider,
    ImageCacheManager
} from 'react-native-cached-image';
const defaultImageCacheManager = ImageCacheManager();
const deviceWidth = Dimensions.get("window").width;
const logo = require("./../assets/images/logo.png")
// const cardImage = require("./../assets/images/splash-port-hdpi.png")

export default class NewsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor (props) {
    super(props);
    this.state = {
      isRefreshing: false,
      posts: []
    }
  }
  componentDidMount = async () => {
    await this._onRefresh()
  }

  _onRefresh () {
    this.state.isRefreshing = true
    fetch('http://95.188.80.41/api/posts')
      .then((response) => {
        try {
          return response.json()
        } catch(e) {
          alert("Нет связи с сервером")
          // this.props.navigation.navigate('LogoutStack')
        }
      })
      .then((posts) => {
        defaultImageCacheManager.clearCache()
        .then(() => {
            ReactNative.Alert.alert('Cache cleared');
        });
        this.state.isRefreshing = false
        this.setState({posts: posts})
      })
  }
  _renderItem () {
    let data = []
    // let data = [
    //   {
    //     content: 'Расписание вновь доступно. В этом обновлении добавлены новые группы, и увеличина скорость работы приложения',
    //     date: '15 июля 2019',
    //     user: 'СибГУ'
    //   },
    //   {
    //     content: 'Добро пожаловать в новое приложение "Расписание СибГУ". Здесь Вы найдёте своё актуальное расписание занятий и экзаменов',
    //     date: '17 июня 2019',
    //     user: 'СибГУ'
    //   }
    // ]
    this.state.posts.forEach(post => {
      data.push(
        <Card key={post.id}>
          <CardItem bordered>
            <Left>
            <CachedImage source={{uri: post.user.avatar}} />
              <Body>
                <Text>{post.user.name}</Text>
                <Text note>{post.created_at}</Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem>
            <Body>
              <CachedImage source={{uri: 'http://95.188.80.41/public/uploads' + post.avatar}} style={{
                alignSelf: "center",
                height: 200,
                resizeMode: "cover",
                width: deviceWidth / 1.18,
                marginVertical: 5
              }} />
              <Text>
                {post.summary}
              </Text>
            </Body>
          </CardItem>
        </Card>
      )
    })
    return data
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
