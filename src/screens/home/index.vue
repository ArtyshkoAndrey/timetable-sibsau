<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-header>
      <nb-body>
        <nb-title>Timetable</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content padder>
      <nb-separator bordered>
        <nb-text>Понедельник</nb-text>
      </nb-separator>
      <nb-list-item>
        <nb-text>Физическая культура</nb-text>
      </nb-list-item>
      <nb-list-item>
        <nb-text>Правоведение</nb-text>
      </nb-list-item>
      <nb-list-item last>
        <nb-text>Человекомашинные интерфейсы</nb-text>
      </nb-list-item>

      <nb-separator bordered style="margin-top: 30">
        <nb-text>Вторник</nb-text>
      </nb-separator>
      <nb-list-item>
        <nb-text>ВЫЧИСЛИТЕЛЬНАЯ МАТЕМАТИКА</nb-text>
      </nb-list-item>
      <nb-list-item>
        <nb-text>ВЫЧИСЛИТЕЛЬНАЯ МАТЕМАТИКА</nb-text>
      </nb-list-item>
      <nb-list-item last>
        <nb-text>ВЫЧИСЛИТЕЛЬНАЯ МАТЕМАТИКА</nb-text>
      </nb-list-item>
    </nb-content>
  </nb-container>
</template>

<script>
import { Dimensions, Platform } from "react-native";
export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data: function() {
    return {
    //  return
    };
  },
  methods: {
    handleLetGoBtnPress: function() {
      this.navigation.navigate("DrawerOpen");
    }
  }
};
</script>
