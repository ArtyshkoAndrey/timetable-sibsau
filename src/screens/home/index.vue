<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-header>
      <nb-body>
        <nb-title :style="{marginLeft: 20}">Расписание</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <view :style="{flex: 1, padding: 12}">
      <nb-deck-swiper
          :dataSource="cardItemsArr"
          :looping="isLoopingRequired"
          :renderEmpty="handleCardEmpty"
          :renderItem="handleCardRendering"
          :renderBottom="bottomCardRendering"
      >
      </nb-deck-swiper>
    </view>
  </nb-container>
</template>

<script>
import { Dimensions, Platform } from "react-native";
import React from "react";
import { View, Text } from "react-native";
import CardComponent from "./common/card";
export default {
  props: {
    navigation: {
      type: Object
    }
  },
	data: function() {
		return {
			cardItemsArr: [
				{
					dayOfTheWeek: "Понедельник",
					subjects: ['Физическая культура', 'Методы моделирования','Инструментарий принятия решений']
				},
				{
					dayOfTheWeek: "Вторник",
					subjects: ['Человекомашинные интерфейсы', 'Инструментарий принятия решений']
				}
			],
			isLoopingRequired: true
		};
	},
	methods: {
		handleCardEmpty: function() {
			return (
				<View>
					<Text>Over </Text>
				</View>
			);
		},
		handleCardRendering: function(item) {
			return <CardComponent item={item} />;
		},
		bottomCardRendering: function(item) {
			return <CardComponent v-show="false" item={item} />;
		}
	}
};
</script>
