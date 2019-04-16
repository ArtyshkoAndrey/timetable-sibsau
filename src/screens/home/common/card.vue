<template>
    <nb-card :style="stylesObj.cardHeight">
      <nb-cardItem cardBody>
        <nb-content padder>
          <nb-separator bordered>
            <nb-text>{{ item.dayOfTheWeek }}</nb-text>
          </nb-separator>
          <nb-list-item v-for="(subject, index) in item.subjects" :last="index === item.subjects.length">
            <nb-text>{{ subject }}</nb-text>
          </nb-list-item>
        </nb-content>
      </nb-cardItem>
    </nb-card>
</template>



<script>
import { Dimensions } from "react-native";
const deviceHeight = Dimensions.get("window").height;
export default {
  props: {
    item: {
      type: Object
    }
  },
  data: function () {
  	return {
			stylesObj: {
				cardHeight: {
					height: deviceHeight / 1.5
				}
			}
    }
  }
};
</script>
