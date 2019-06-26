import React from 'react';
import {
  ImageBackground,
  View,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
  Modal
} from 'react-native';
import CarouselTable from './../components/Carousel';
import  ExamViewTable from './../components/ExamView';
import {
  Header,
  Container,
  Body,
  Content,
  Title,
  Tab,
  Tabs,
  Text,
  List,
  ListIte,
  Right,
  Button,
  Left,
  Icon,
  ListItem,
  Separator
} from 'native-base'
const deviceWidth = Dimensions.get("window").width
const subjectImage = require("./../assets/images/subject.jpg")

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor (props) {
    super(props);
    this.HomeYList = this.HomeYList.bind(this)
    this.state = {
      userGroup: '',
      numWeek: null,
      page: 0,
      day: 0,
      scrollWithoutAnimation: true,
      isLoading: true,
      cardItemsArr: [],
      refreshing: false,
      tabsLocked: true,
      refreshEnabled: true,
      modalVisible: false,
      modalData: {}
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
    if (Number(evt.i) === 2) {
      this.setState({tabsLocked: false})
    } else {
      this.setState({tabsLocked: true})
    }
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
        alert("Нет такой группы")
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
    if ( new Date().getWeek() % 2) {
      this.setState({numWeek: 0})
    } else {
      this.setState({ numWeek: 1 })
    }
    this.setState({
      isLoading: false,
      cardItemsArr: data,
      day: new Date().getDay()
    })
    if (refresh) {
      setTimeout(() => this.setState({ page: this.state.numWeek, scrollWithoutAnimation: false }), 0)
    }
  }
  HomeYList (y) {
    if (Number(y) > 1) {
      this.setState({refreshEnabled: false})
    } else {
      this.setState({refreshEnabled: true})
    }
  }
  ModelSubject (data = {}) {
    this.setState({modalVisible: !this.state.modalVisible, modalData: data});
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
        <Tabs onChangeTab={this._chengeTab.bind(this)} locked={this.state.tabsLocked} page={this.state.page} initialPage={this.state.page} scrollWithoutAnimation={this.state.scrollWithoutAnimation}>
          <Tab tabStyle={{ backgroundColor: '#006CB5'}} activeTabStyle={{ backgroundColor: '#006CB5' }} heading="1 неделя">
            <ScrollView scrollEnabled={false}  horizontal refreshControl={ <RefreshControl enabled={this.state.refreshEnabled} refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> }>
              { this.state.cardItemsArr.timetable[0].length < 1 ? this.notTapes() : <CarouselTable ModelSubject={this.ModelSubject.bind(this)} HomeYList={this.HomeYList} timetable={this.state.cardItemsArr.timetable[0]} day={this.state.day} week={0} numWeek={this.state.numWeek} /> }
            </ScrollView>
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#006CB5' }} activeTabStyle={{ backgroundColor: '#006CB5' }} heading="2 неделя">
            <ScrollView scrollEnabled={false}  horizontal refreshControl={ <RefreshControl enabled={this.state.refreshEnabled} refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> }>
              { this.state.cardItemsArr.timetable[1].length < 1 ? this.notTapes() : <CarouselTable ModelSubject={this.ModelSubject.bind(this)} HomeYList={this.HomeYList} timetable={this.state.cardItemsArr.timetable[1]} day={this.state.day} week={1} numWeek={this.state.numWeek} /> }
            </ScrollView>
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#006CB5' }} activeTabStyle={{ backgroundColor: '#006CB5' }} heading="Экзамены">
            <Content style={{flex: 1}} refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> }>
              { this.state.cardItemsArr.exams === null ? this.notTapes() : < ExamViewTable exams={this.state.cardItemsArr.exams} /> }
            </Content>
          </Tab>
        </Tabs>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.ModelSubject()
          }}>
          <Container style={{flex: 1}}>
            <ImageBackground
              style={{
                height: null,
                resizeMode: "cover",
                width: deviceWidth,
                paddingTop: 0,
              }}
              source={subjectImage}
            >
             <Header noShadow iosBarStyle={"light-content"} androidStatusBarColor='#000' style={{ backgroundColor: 'transparent' }}>
              <Left>
                <Button transparent onPress={() => { this.ModelSubject() }}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
               <Right>
                 <Text style={{color: '#FFF'}}>Информация</Text>
               </Right>
             </Header>
             <View style={{justifyContent: 'center', height: 200}}>
              <Text style={{textAlign: 'center', color: '#FFF'}}>{ this.state.modalData['name'] !== undefined ? this.state.modalData['name'] : '' }</Text>
             </View>
           </ImageBackground>
           <Content padder>
             <View style={styles.pVertical}>
               <Separator style={{ backgroundColor: '#FFF', height: 20 }}>
                 <Text style={{fontSize: 11}}>Преподаватель</Text>
               </Separator>
               <ListItem style={{paddingTop: 0, borderBottomWidth: 0, paddingBottom: 0}}>
                 <Text>{ this.state.modalData['teacher'] !== undefined ? this.state.modalData['teacher'] : 'Нет данных' }</Text>
               </ListItem>
             </View>
             <View style={styles.pVertical}>
               <Separator style={{ backgroundColor: '#FFF', height: 20 }}>
                 <Text style={{fontSize: 11}}>Вид</Text>
               </Separator>
               <ListItem style={{paddingTop: 0, borderBottomWidth: 0, paddingBottom: 0}}>
                 <Text>{ this.state.modalData['type'] !== undefined ? this.state.modalData['type'] : 'Нет данных' }</Text>
               </ListItem>
             </View>
             <View style={styles.pVertical}>
               <Separator style={{ backgroundColor: '#FFF', height: 20 }}>
                 <Text style={{fontSize: 11}}>Аудитория</Text>
               </Separator>
               <ListItem style={{paddingTop: 0, borderBottomWidth: 0, paddingBottom: 0}}>
                 <Text>{ this.state.modalData['audience'] !== undefined ? this.state.modalData['audience'] : 'Нет данных' }</Text>
               </ListItem>
             </View>
             <View style={styles.pVertical}>
               <Separator style={{ backgroundColor: '#FFF', height: 20 }}>
                 <Text style={{fontSize: 11}}>Время</Text>
               </Separator>
               <ListItem style={{paddingTop: 0, borderBottomWidth: 0, paddingBottom: 0}}>
                 <Text>{ this.state.modalData['time'] !== undefined ? ( this.state.modalData['time'].length === 2 ? this.state.modalData['time'][0] + ' - ' : '/ - ' ) : '/ - ' }
                 { this.state.modalData['time'] !== undefined ? ( this.state.modalData['time'].length === 2 ? this.state.modalData['time'][1] : '/' ) : '/' } </Text>
               </ListItem>
             </View>
             <View style={styles.pVertical}>
               <Separator style={{ backgroundColor: '#FFF', height: 20 }}>
                 <Text style={{fontSize: 11}}>Следующих день этой ленты</Text>
               </Separator>
               <ListItem style={{paddingTop: 0, borderBottomWidth: 0, paddingBottom: 0}}>
                 <Text>Нет данных</Text>
               </ListItem>
             </View>
           </Content>
          </Container>
        </Modal>
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
  },
  pVertical: {
    paddingTop: 10,
    paddingBottom: 10
  }
});
