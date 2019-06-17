import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Content, ListItem, Text, Separator, Card, CardItem, Left, Body, List } from 'native-base'
import { hp } from './../constants/SliderEntry.style'
import { Col, Row, Grid } from 'react-native-easy-grid'

export default class ListDay extends Component {
  constructor (props) {
    super(props)
  }
  _subjects () {
    let payments = [];
    for (let i = 0; i < this.props.item.lessons.length; i++) {
      if (typeof this.props.item.lessons[i]['0'] === 'undefined') {
        payments.push(<ListItem avatar key={i}>
            <Left style={{padding: 0}}>
              <Text note>{this.props.item.lessons[i]['time'][0]}</Text>
            </Left>
            <Body>
              <Text>{this.capitalize(this.props.item.lessons[i].name) }</Text>
            </Body>
          </ListItem>
        )
      } else {
        payments.push(<ListItem avatar key={i}>
            <Left style={{padding: 0}}>
              <Text note>{this.props.item.lessons[i]['time'][0]}</Text>
            </Left>
            <Body>
              <Text>{'1. ' + this.capitalize(this.props.item.lessons[i]['0'].name) }</Text>
              <Text>{'2. ' + this.capitalize(this.props.item.lessons[i]['1'].name) }</Text>
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
      console.log(this.props.week, this.props.numWeek)
      return(<Text style={{ padding: 5, fontSize:14, width: 100, textAlign: 'center', borderRadius: 20, backgroundColor:'#ff0000', color: '#fff' }}>Сегодня</Text>)
    }
    // if (this.props.day === this.props.item.num) {
    //  return(<Text style={{ padding: 5, fontSize:14, width: 100, textAlign: 'center', borderRadius: 20, backgroundColor:'#ff0000', color: '#fff' }}>Сегодня</Text>)
    // }
  }
  render() {
    return (
      <Card style={styles.card}>
        <CardItem>
          <Content>
            <Separator bordered style={{backgroundColor: '#006CB5', paddingTop: 20, paddingBottom: 20}}>
              <Grid style={{marginTop: -10}}>
                <Col style={{width: null}}><Text style={{fontWeight: 'bold', fontSize: 14, padding: 0, color: '#fff'}}>{ this.props.item.nameDay }</Text></Col>
                <Col style={{marginTop: -5, width: null}}>{this._checkDay()}</Col>
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

const styles = StyleSheet.create({
  card: {
    maxHeight: hp(60)
  }
});
