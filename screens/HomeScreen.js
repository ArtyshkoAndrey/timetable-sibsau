import React from 'react';
import { View, AsyncStorage, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import colors from './../constants/Colors'
import CarouselTabel from './../components/Carousel'
import { Header,
  Right,
  Left,
  Icon,
  Container,
  Body,
  Content,
  Button,
  Title,
  Tab,
  Tabs,
  Text } from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor (props) {
    super(props);
    this.state = {
      userGroup: '',
      numWeek: 0,
      page: 0,
      day: 0,
      scrollWithoutAnimation: true,
      isLoading: true,
      cardItemsArr: []
    };
  }
  componentDidMount () {
    AsyncStorage.getItem('userGroup')
      .then((value) => {
        this.setState({ userGroup: value })
        fetch('http://192.168.0.61/group/' + value)
          .then((response) => { return response.json()})
          .then((data) => {
            let year = new Date().getFullYear()
            let month = new Date().getMonth()
            let today = new Date(year, month, 0).getTime()
            let now = new Date().getTime()
            let week = Math.round((now - today) / (1000 * 60 * 60 * 24 * 7))
            if (week % 2) {
              this.setState({ numWeek: 0 })
            } else {
              this.setState({ numWeek: 1 })
            }
            console.log('Сейчас', this.state.numWeek, 'неделя')
            this.setState({
              isLoading: false,
              cardItemsArr: data.timetable,
              day: new Date().getDay()
            })
            setTimeout(() => this.setState({ page: this.state.numWeek, scrollWithoutAnimation: false }), 0)
          })
          .catch((error) =>{
            console.error(error)
          })
      })
  }
  render() {
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
          <StatusBar barStyle="default" />
        </View>
      )
    }
    return (
      <Container style={{flex: 1}}>
        <Header hasTabs style={{ backgroundColor: '#006CB5' }}>
          <Body>
            <Title style={{paddingLeft: 20}}>{'Расписание ' + this.state.userGroup.toUpperCase() }</Title>
          </Body>
        </Header>
        <Tabs style={{ backgroundColor: '#006CB5' }} locked={true} page={this.state.page} initialPage={this.state.page} scrollWithoutAnimation={this.state.scrollWithoutAnimation}>
          <Tab  heading="1 неделя">
            <Content>
              <CarouselTabel timetable={this.state.cardItemsArr[0]} day={this.state.day} week={0} numWeek={this.state.numWeek} />
            </Content>
          </Tab>
          <Tab heading="2 неделя">
            <Content>
              <CarouselTabel timetable={this.state.cardItemsArr[1]} day={this.state.day} week={1} numWeek={this.state.numWeek} />
            </Content>
          </Tab>
        </Tabs>
      </Container>
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