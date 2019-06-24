import React, { Component } from 'react';
import { View, Content } from "native-base";
import ListDayExam from './DayOfTheExamList.js'
export default class ExamViewTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slider1ActiveSlide: 0
    }
  }
  render () {
    return (
        <Content>
          <View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
              {this._renderItem(this.props.exams)}
          </View>
        </Content>
    )
  }
  _renderItem (exams) {
      let paymants = []
      exams.forEach((item, index) => {
          paymants.push(<ListDayExam key={index} item={item} />)
      })
    return paymants;
  }
}