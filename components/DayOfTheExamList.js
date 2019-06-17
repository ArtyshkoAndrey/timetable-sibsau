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
  render() {
    return (
      <Card style={styles.card}>
        <CardItem>
          <Content>
            <Separator bordered style={{backgroundColor: '#006CB5', paddingTop: 20, paddingBottom: 20}}>
              <Grid style={{marginTop: -10}}>
                <Col style={{width: null}}><Text style={{fontWeight: 'bold', fontSize: 14, padding: 0, color: '#fff'}}>{ this.props.item.date }</Text></Col>
              </Grid>
            </Separator>
            <List>
              <ListItem avatar last>
                <Left style={{padding: 0}}>
                  <Text note>{this.props.item['time']}</Text>
                </Left>
                <Body>
                  <Text>{this.capitalize(this.props.item.name) }</Text>
                </Body>
              </ListItem>
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
