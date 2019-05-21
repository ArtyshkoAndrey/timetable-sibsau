import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ListDay from './DayOfTheWeekList'
import styles from './../constants/SliderEntry.style';
import { sliderWidth, itemWidth } from './../constants/SliderEntry.style';

let day = false

export default class CarouselTabel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userGroup: '',
      numWeek: 0,
      slider1ActiveSlide: 1,
      firstSlide: 1,
      day: 10,
      scrollWithoutAnimation: false,
      cardItemsArr: [
        {
          dayOfTheWeek: "Понедельник",
          num: 1,
          subjects: ['Физическая культура',
            'ПРОЕКТИРОВАНИЕ ЧЕЛОВЕКО-МАШИННОГО ИНТЕРФЕЙСА',
            'ИНСТРУМЕНТАРИЙ ПРИНЯТИЯ РЕШЕНИЙ',
            'ПРОЕКТИРОВАНИЕ ЧЕЛОВЕКО-МАШИННОГО ИНТЕРФЕЙСА',
            'ИНСТРУМЕНТАРИЙ ПРИНЯТИЯ РЕШЕНИЙ'
          ]
        },
        {
          dayOfTheWeek: "Вторник",
          num: 2,
          subjects: [
            'ПРОЕКТИРОВАНИЕ ЧЕЛОВЕКО-МАШИННОГО ИНТЕРФЕЙСА',
            'ИНСТРУМЕНТАРИЙ ПРИНЯТИЯ РЕШЕНИЙ'
          ]
        },
        {
          dayOfTheWeek: "Среда",
          num: 3,
          subjects: [
            'РУССКИЙ ЯЗЫК И КУЛЬТУРА РЕЧИ',
            'ФИЗИЧЕСКАЯ КУЛЬТУРА И СПОРТ'
          ]
        },
        {
          dayOfTheWeek: "Четверг",
          num: 4,
          subjects: [
            'ВЫЧИСЛИТЕЛЬНАЯ МАТЕМАТИКА',
            'ОБЪЕКТНО-ОРИЕНТИРОВАННОЕ ПРОГРАММИРОВАНИЕ',
            'МЕТОДЫ МАТЕМАТИЧЕСКОГО МОДЕЛИРОВАНИЯ СЛОЖНЫХ ПРОЦЕССОВ И СИСТЕМ'
          ]
        },
        {
          dayOfTheWeek: "Пятница",
          num: 5,
          subjects: [
            'ОБЪЕКТНО-ОРИЕНТИРОВАННОЕ ПРОГРАММИРОВАНИЕ',
            'МЕТОДЫ МАТЕМАТИЧЕСКОГО МОДЕЛИРОВАНИЯ СЛОЖНЫХ ПРОЦЕССОВ И СИСТЕМ',
            'ОБЪЕКТНО-ОРИЕНТИРОВАННОЕ ПРОГРАММИРОВАНИЕ',
            'МЕТОДЫ МАТЕМАТИЧЕСКОГО МОДЕЛИРОВАНИЯ СЛОЖНЫХ ПРОЦЕССОВ И СИСТЕМ',
            'ФУНКЦИОНАЛЬНОЕ ПРОГРАММИРОВАНИЕ',
            'ФУНКЦИОНАЛЬНОЕ ПРОГРАММИРОВАНИЕ'
          ]
        },
        {
          dayOfTheWeek: "Суббота",
          num: 6,
          subjects: [
            'Правоведение',
            'Функциональное программирование'
          ]
        },
      ]
    };
  }
  componentWillMount () {
    let date = new Date()
    let b = false
    this.state.slider1ActiveSlide = Number(date.getDay())
    this.state.cardItemsArr.forEach((item) => {
      if (item.num === Number(date.getDay())) {
        this.state.slider1ActiveSlide = item.num - 1
        this.state.firstSlide = item.num - 1
        day = item.num
        b = true

      }
    })
    if (b === false ) {
      // this.state.slider1ActiveSlide = this.state.cardItemsArr[this.state.cardItemsArr.length - 1].num - 1
      this.state.slider1ActiveSlide = 0
      this.state.firstSlide = 0
      day = false
    }
  }
  render () {
    return (
      <View>
        <Carousel
          ref={ c => this._carousel = c }
          data={this.state.cardItemsArr}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          contentContainerCustomStyle={styles.sliderContentContainer}
          containerCustomStyle={styles.slider}
          inactiveSlideScale={0.7}
          inactiveSlideOpacity={0.7}
          firstItem={this.state.firstSlide}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
        />
         <Pagination
            dotsLength={this.state.cardItemsArr.length}
            activeDotIndex={this.state.slider1ActiveSlide}
            containerStyle={styles.paginationContainer}
            dotColor={'rgba(0, 0, 0, 0.92)'}
            dotStyle={styles.paginationDot}
            inactiveDotOpacity={0.4}
            inactiveDotColor={'rgba(0, 0, 0, 0.4)'}
            inactiveDotScale={0.6}
            carouselRef={this._carouse}
            tappableDots={!!this._carouse}
          />
      </View>
    )
  }
  _renderItem ({item, index}) {
    return (
      <ListDay key={index} day={day} item={item} />
    );
  }
}