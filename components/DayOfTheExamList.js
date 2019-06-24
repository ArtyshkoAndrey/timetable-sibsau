import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Content, ListItem, Text, Separator, Card, CardItem, Left, Body, List } from 'native-base'
import { hp } from './../constants/SliderEntry.style'
import { Col, Grid } from 'react-native-easy-grid'

export default class ListDayExam extends Component {
  constructor (props) {
    super(props)
  }
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  _checkDay () {
    let date = this.props.item.date
    let thisDate = new Date().getDate() + '.' + ( (new Date().getMonth() + 1) > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1) ) + '.' + new Date().getFullYear()
    if (date === thisDate) {
      return(
        <Text style={{fontSize:14, width: 90, paddingVertical: 3, marginTop: 3, textAlign: 'center', borderRadius: 100, backgroundColor:'#ff0000', color: '#fff' }}>
          Сегодня
        </Text>
      )
    }
  }
  render() {
    return (
      <Card>
        <CardItem style={{paddingLeft: 0, paddingRight: 0, paddingTop: 0}}>
          <Content>
            <Separator bordered style={{backgroundColor: '#006CB5', paddingTop: 0}}>
              <Grid>
                <Col size={40}><Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 14, color: '#fff'}}>{ this.props.item.date }</Text></Col>
                <Col style={{width: 110}}>
                  {this._checkDay()}
                </Col>
              </Grid>
            </Separator>
            <List>
              <ListItem avatar last>
                <Left style={{padding: 0}}>
                  <Text note>{this.props.item['time']}</Text>
                </Left>
                <Body>
                  <Text>{this.capitalize(this.props.item.name) }</Text>
                  <Text note>{this.props.item.teacher }</Text>
                  <Text note>{this.props.item.audience }</Text>
                </Body>
              </ListItem>
            </List>
          </Content>
        </CardItem>
      </Card>
    );
  }
}
