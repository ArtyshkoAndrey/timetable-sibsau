import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
	const value = (percentage * viewportWidth) / 100;
	return Math.round(value);
}

export function hp(percentage) {
  let value = (percentage * viewportHeight) / 100
  return Math.round(value)
}

const slideHeight = viewportHeight * 0.7;
const slideWidth = wp(90);
const itemHorizontalMargin = wp(3);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export const entryBorderRadius = 8;

export default StyleSheet.create({
	paginationContainer: {
    paddingVertical: 20
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 10
  },
	slider: {
    marginTop: 15,
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
});