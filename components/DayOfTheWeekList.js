import React, { Component } from 'react'
import { Content, ListItem, Text, Separator, Card, CardItem, Left, Body, List } from 'native-base'
import { Col, Grid } from 'react-native-easy-grid'
import { TouchableHighlight, View } from 'react-native';

export default class ListDay extends Component {
  constructor (props) {
    super(props)
    console.log(this.props.navigate)
  }
  _subjects () {
    let payments = [];
    for (let i = 0; i < this.props.item.lessons.length; i++) {
      if (typeof this.props.item.lessons[i][0] === 'undefined') {
        payments.push(
          <ListItem avatar key={i}>
            <Left style={{padding: 0}}>
              <Text note>{this.props.item.lessons[i]['time']['start']}</Text>
            </Left>
            <Body>
              <TouchableHighlight onPress={() => { this.props.ModelSubject(this.props.item.lessons[i], this.props.item)}} underlayColor="white">
                <View>
                  {typeof this.props.item.lessons[i]['subGroup'] !== 'undefined' ? <Text note>{this.props.item.lessons[i]['subGroup']}</Text> : null }
                  <Text>{this.capitalize(this.props.item.lessons[i]['name']) }</Text>
                  <Text note>{this.props.item.lessons[i]['audience']}</Text>
                </View>
              </TouchableHighlight>
            </Body>
          </ListItem>
        )
      } else {
        payments.push(<ListItem avatar key={i}>
            <Left style={{padding: 0}}>
              <Text note>{this.props.item.lessons[i][0]['time']['start']}</Text>
            </Left>
            <Body>
              <TouchableHighlight onPress={() => { this.props.ModelSubject(this.props.item.lessons[i][0])}} underlayColor="white">
                <View>
                  <Text note>{this.props.item.lessons[i][0]['subGroup']}</Text>
                  <Text>{this.capitalize(this.props.item.lessons[i][0]['name']) }</Text>
                  <Text note>{this.props.item.lessons[i][0]['audience']}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => { this.props.ModelSubject(this.props.item.lessons[i][1])}} underlayColor="white">
                <View style={{marginTop: 10}}>
                  <Text note>{this.props.item.lessons[i][1]['subGroup']}</Text>
                  <Text>{this.capitalize(this.props.item.lessons[i][1]['name']) }</Text>
                  <Text note>{this.props.item.lessons[i][1]['audience']}</Text>
                </View>
              </TouchableHighlight>
            </Body>
          </ListItem>
        )
      }
    }
  return payments
  }
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  _checkDay () {
    if (this.props.week === this.props.numWeek && this.props.day === this.props.item.index) {
      return(
        <Text style={{fontSize:14, width: 90, paddingVertical: 3, marginTop: 3, textAlign: 'center', borderRadius: 100, backgroundColor:'#ff0000', color: '#fff' }}>
          Сегодня
        </Text>
      )
    }
  }
  handleScroll (event) {
    this.props.getYCarousel(event.nativeEvent.contentOffset.y)
    // console.log(event.nativeEvent.contentOffset.y)
  }
  render() {
    return (
      <Card>
        <CardItem style={{paddingLeft: 0, paddingRight: 0, paddingTop: 0}}>
          <Content onScroll={this.handleScroll.bind(this)}>
            <Separator bordered style={{backgroundColor: '#006CB5', paddingTop: 0}}>
              <Grid>
                <Col size={40}><Text style={{fontWeight: 'bold', marginLeft: 5 ,marginTop: 5, fontSize: 14, color: '#fff'}}>{ this.props.item['name'] }</Text></Col>
                <Col style={{width: 110}}>
                  {this._checkDay()}
                </Col>
              </Grid>
            </Separator>
            <List>
              {this._subjects()}
            </List>
          </Content>
        </CardItem>
      </Card>
    );
  }
}
