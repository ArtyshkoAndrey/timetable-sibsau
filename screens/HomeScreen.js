import React from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ListDay from './../components/DayOfTheWeekList'
import { sliderWidth, itemWidth } from './../constants/SliderEntry.style';
import styles from './../constants/SliderEntry.style';
import { Header, Right, Left, Icon, Container, Body, Content, Button, Title } from 'native-base';


export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      cardItemsArr: [
        {
          dayOfTheWeek: "Понедельник",
          subjects: ['Физическая культура', 'Методы моделирования', 'Инструментарий принятия решений']
        },
        {
          dayOfTheWeek: "Вторник",
          subjects: ['Человекомашинные интерфейсы', 'Инструментарий принятия решений']
        }
      ]
    };
  }

  render() {
    return (
      <Container style={{flex: 1}}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={{paddingVertical: 30}}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.cardItemsArr}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              contentContainerCustomStyle={styles.sliderContentContainer}
              containerCustomStyle={styles.slider}
            />
          </View>
        </Content>
      </Container>
    );
  }

  _renderItem ({item, index}) {
    return (
      <ListDay key={index} item={item} />
    );
  }
}
