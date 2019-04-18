import React from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ListDay from './../components/DayOfTheWeekList'
import { sliderWidth, itemWidth } from './../constants/SliderEntry.style';
import styles from './../constants/SliderEntry.style';
import { Header, Right, Left, Icon, Container, Body, Content, Button, Title } from 'native-base';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      cardItemsArr: [
        {
          dayOfTheWeek: "Понедельник",
          subjects: ['Физическая культура',
            'ПРОЕКТИРОВАНИЕ ЧЕЛОВЕКО-МАШИННОГО ИНТЕРФЕЙСА',
            'ИНСТРУМЕНТАРИЙ ПРИНЯТИЯ РЕШЕНИЙ',
            'ПРОЕКТИРОВАНИЕ ЧЕЛОВЕКО-МАШИННОГО ИНТЕРФЕЙСА',
            'ИНСТРУМЕНТАРИЙ ПРИНЯТИЯ РЕШЕНИЙ'
          ]
        },
        {
          dayOfTheWeek: "Вторник",
          subjects: [
            'ПРОЕКТИРОВАНИЕ ЧЕЛОВЕКО-МАШИННОГО ИНТЕРФЕЙСА',
            'ИНСТРУМЕНТАРИЙ ПРИНЯТИЯ РЕШЕНИЙ'
          ]
        },
        {
          dayOfTheWeek: "Среда",
          subjects: [
            'РУССКИЙ ЯЗЫК И КУЛЬТУРА РЕЧИ',
            'ФИЗИЧЕСКАЯ КУЛЬТУРА И СПОРТ'
          ]
        },
        {
          dayOfTheWeek: "Четверг",
          subjects: [
            'ВЫЧИСЛИТЕЛЬНАЯ МАТЕМАТИКА',
            'ОБЪЕКТНО-ОРИЕНТИРОВАННОЕ ПРОГРАММИРОВАНИЕ',
            'МЕТОДЫ МАТЕМАТИЧЕСКОГО МОДЕЛИРОВАНИЯ СЛОЖНЫХ ПРОЦЕССОВ И СИСТЕМ'
          ]
        },
        {
          dayOfTheWeek: "Пятница",
          subjects: [
            'ОБЪЕКТНО-ОРИЕНТИРОВАННОЕ ПРОГРАММИРОВАНИЕ',
            'МЕТОДЫ МАТЕМАТИЧЕСКОГО МОДЕЛИРОВАНИЯ СЛОЖНЫХ ПРОЦЕССОВ И СИСТЕМ',
            'ОБЪЕКТНО-ОРИЕНТИРОВАННОЕ ПРОГРАММИРОВАНИЕ',
            'МЕТОДЫ МАТЕМАТИЧЕСКОГО МОДЕЛИРОВАНИЯ СЛОЖНЫХ ПРОЦЕССОВ И СИСТЕМ',
            'ФУНКЦИОНАЛЬНОЕ ПРОГРАММИРОВАНИЕ',
            'ФУНКЦИОНАЛЬНОЕ ПРОГРАММИРОВАНИЕ'
          ]
        },
      ]
    };
  }
  componentWillMount () {
    console.log('hi')
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
          <View>
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
