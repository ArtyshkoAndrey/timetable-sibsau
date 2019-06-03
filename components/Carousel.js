import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ListDay from './DayOfTheWeekList'
import styles from './../constants/SliderEntry.style';
import { sliderWidth, itemWidth } from './../constants/SliderEntry.style';

let day = null
let week = null
let numWeek = null

export default class CarouselTabel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slider1ActiveSlide: this.props.day - 1,
      day: this.props.day,
      numWeek: this.props.numWeek,
      week: this.props.week
    }
  }
  componentDidMount () {
    day = this.state.day
    week = this.state.week
    numWeek = this.state.numWeek
    console.log('Test1', this.state.day)
    console.log(this.state.slider1ActiveSlide)
  }
  render () {
    return (
      <View>
        <Carousel
          ref={ c => this._carousel = c }
          data={this.props.timetable}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          contentContainerCustomStyle={styles.sliderContentContainer}
          containerCustomStyle={styles.slider}
          inactiveSlideScale={0.7}
          inactiveSlideOpacity={0.7}
          firstItem={this.state.slider1ActiveSlide}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
        />
         <Pagination
            dotsLength={this.props.timetable.length}
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
    console.log('Тест недели в рендер Итем', week)
    return (
      <ListDay key={index} day={day} item={item} week={week} numWeek={numWeek} />
    );
  }
}