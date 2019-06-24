import React from 'react';
import { View, AsyncStorage, ActivityIndicator, StyleSheet, StatusBar, ScrollView, RefreshControl } from 'react-native';
import CarouselTable from './../components/Carousel';
import ExamCarouselTable from './../components/ExamCarousel';
import { Header,
  Container,
  Body,
  Content,
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
      numWeek: null,
      page: 0,
      day: 0,
      scrollWithoutAnimation: true,
      isLoading: true,
      cardItemsArr: [],
      refreshing: false
    };
  }
  componentDidMount = async () => {
    await AsyncStorage.getItem('userGroup')
    .then((value) => {
      this.setState({ userGroup: value })
    })
    let data = await AsyncStorage.getItem('timetable')
    if (data !== null) {
      this.calcData(JSON.parse(data))
      // fetch('http://95.188.80.41/group/' + this.state.userGroup)
      //   .then((response) => {
      //     return response.json()
      //   })
      //   .then((table) => {
      //     table = JSON.stringify(table)
      //     if (table !== data) {
      //       data = table
      //       AsyncStorage.setItem('timetable', table)
      //     }
      //     this.calcData(JSON.parse(data))
      //   })
      //   .catch(error => {
      //     alert("Нет такой группы")
      //     this.props.navigation.navigate('Logout')
      //   })
    } else {
      fetch('http://95.188.80.41/group/' + this.state.userGroup)
        .then((response) => {
          try {
            return response.json()
          } catch (e) {
            alert("Нет такой группы")
            this.props.navigation.navigate('Logout')
          }
        })
        .then((table) => {
          AsyncStorage.setItem('timetable', JSON.stringify(table), () => {
            this.calcData(table)
          })
        })
        .catch(() => {
          alert("Нет такой группы")
          this.props.navigation.navigate('Logout')
        })
    }
  }
  _chengeTab (evt) {
    this.setState({page: Number(evt.i)})
  }
  _onRefresh () {
    this.setState({ refreshing: true })
    fetch('http://95.188.80.41/group/' + this.state.userGroup)
      .then((response) => {
        return response.json()
      })
      .then((table) => {
        AsyncStorage.setItem('timetable', JSON.stringify(table), () => {
          this.calcData(table, false)
          this.setState({ refreshing: false })
        })
      })
      .catch(error => {
        alert(
          "Нет такой группы")
      })
  }
  notTapes () {
    return (
      <View style={styles.container}>
        <Text>Нет расписание</Text>
      </View>
    )
  }
  calcData (data, refresh = true) {
    console.log(refresh)
    let year = new Date().getFullYear()
    let month = new Date().getMonth()
    let today = new Date(year, month, 0).getTime()
    let now = new Date().getTime()
    let week = Math.round((now - today) / (1000 * 60 * 60 * 24 * 7))
    // if (week % 2) {
    //   this.setState({ numWeek: 0 })
    // } else {
    //   this.setState({ numWeek: 1 })
    // }
    this.setState({
      isLoading: false,
      cardItemsArr: data,
      day: new Date().getDay()
    })
    this.setState({ numWeek: 1 }) // Заглушка для диплома
    if (refresh) {
      setTimeout(() => this.setState({ page: this.state.numWeek, scrollWithoutAnimation: false }), 0)
    }
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
        <Tabs onChangeTab={this._chengeTab.bind(this)} locked={true} page={this.state.page} initialPage={this.state.page} scrollWithoutAnimation={this.state.scrollWithoutAnimation}>
          <Tab tabStyle={{ backgroundColor: '#006CB5'}} activeTabStyle={{ backgroundColor: '#006CB5' }} heading="1 неделя">
            <ScrollView scrollEnabled={false}  horizontal style={{flex: 1}} refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> }>
              { this.state.cardItemsArr.timetable[0].length < 1 ? this.notTapes() : <CarouselTable timetable={this.state.cardItemsArr.timetable[0]} day={this.state.day} week={0} numWeek={this.state.numWeek} /> }
            </ScrollView>
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#006CB5' }} activeTabStyle={{ backgroundColor: '#006CB5' }} heading="2 неделя">
            <ScrollView scrollEnabled={false}  horizontal style={{flex: 1}} refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> }>
              { this.state.cardItemsArr.timetable[1].length < 1 ? this.notTapes() : <CarouselTable timetable={this.state.cardItemsArr.timetable[1]} day={this.state.day} week={1} numWeek={this.state.numWeek} /> }
            </ScrollView>
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#006CB5' }} activeTabStyle={{ backgroundColor: '#006CB5' }} heading="Экзамены">
            <Content style={{flex: 1}} refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> }>
              { this.state.cardItemsArr.exams === null ? this.notTapes() : <ExamCarouselTable exams={this.state.cardItemsArr.exams} /> }
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