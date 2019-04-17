import React, { Component } from 'react';
import { Content, ListItem, Text, Separator, Card, CardItem } from 'native-base';


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
	render() {
		return (
			<Card>
				<CardItem>
					<Content padder>
						<Separator bordered>
							<Text style={{fontWeight: 'bold', fontSize: 14,}}>{ this.props.item.dayOfTheWeek }</Text>
						</Separator>
						{this._subjects()}
					</Content>
				</CardItem>
			</Card>
		);
	}
}
