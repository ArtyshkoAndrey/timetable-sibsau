import React, { Component } from 'react'
import { View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ListDay from './DayOfTheWeekList'
import styles from './../constants/SliderEntry.style';
import { sliderWidth, itemWidth } from './../constants/SliderEntry.style';
export default class CarouselTable extends Component {
  constructor (props) {
    super(props)
    this.getYCarousel = this.getYCarousel.bind(this)
    this.state = {
      slider1ActiveSlide: 0,
      day: this.props.day,
      numWeek: this.props.numWeek,
      week: this.props.week
    }
    if (this.props.week === this.props.numWeek) {
      let date = new Date()
      this.props.timetable.forEach((item, index) => {
        if (item.index === date.getDay()) {
          this.state.slider1ActiveSlide = index
        }
      })
    }
  }
  getYCarousel (y) {
    this.props.HomeYList(y)
  }
  render () {
    return (
      <View>
        <Carousel
          ref={ c => this._carousel = c }
          data={this.props.timetable}
          renderItem={this._renderItem.bind(this)}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          contentContainerCustomStyle={styles.sliderContentContainer}
          inactiveSlideScale={0.7}
          inactiveSlideOpacity={0.7}
          firstItem={this.state.slider1ActiveSlide}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
        />
         <Pagination
            dotsLength={this.props.timetable.length}
            activeDotIndex={this.state.slider1ActiveSlide}
            containerStyle={styles.paginationContainer}
            dotColor={'#006CB5'}
            dotStyle={styles.paginationDot}
            inactiveDotOpacity={0.4}
            inactiveDotColor={'#62ABDA'}
            inactiveDotScale={0.6}
            carouselRef={this._carouse}
            tappableDots={!!this._carouse}
          />
      </View>
    )
  }
  _renderItem ({item, index}) {
    return (
      <ListDay key={index} ModelSubject={this.props.ModelSubject.bind(this)} getYCarousel={this.getYCarousel} day={this.state.day} item={item} week={this.state.week} numWeek={this.state.numWeek} />
    );
  }
}