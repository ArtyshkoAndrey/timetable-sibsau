import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Content, ListItem, Text, Separator, Card, CardItem } from 'native-base'
import { hp } from './../constants/SliderEntry.style'
import { Col, Row, Grid } from 'react-native-easy-grid'

export default class ListDay extends Component {
	constructor (props) {
		super(props)
	}
	_subjects () {
		let payments = [];
		for (let i = 0; i < this.props.item.subjects.length; i++) {
			payments.push(<ListItem key={i}>
					<Text>{(i + 1) + '. ' + this.props.item.subjects[i] }</Text>
				</ListItem>
			)
		}
	return payments
	}
	_checkDay () {
		if (this.props.day === this.props.item.num) {
			return(<Text style={{ padding: 5, fontSize:14, width: 100, textAlign: 'center', borderRadius: 20, backgroundColor:'#ff0000', color: '#fff' }}>Сегодня</Text>)
		}
	}
	render() {
		return (
			<Card style={styles.card}>
				<CardItem>
					<Content>
						<Separator bordered style={{backgroundColor: '#006CB5', paddingTop: 20, paddingBottom: 20}}>
							<Grid style={{marginTop: -10}}>
								<Col style={{width: null}}><Text style={{fontWeight: 'bold', fontSize: 14, padding: 0, color: '#fff'}}>{ this.props.item.dayOfTheWeek }</Text></Col>
								<Col style={{marginTop: -5, width: null}}>{this._checkDay()}</Col>
							</Grid>
						</Separator>
						{this._subjects()}
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
