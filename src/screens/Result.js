import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';

// ...
const MyWebComponent = ({route}) => {
  const {resData} = route.params;
  console.log('1. Nutritious', resData);
  return (
    <WebView source={{uri: resData.result.music_link}} style={{flex: 1}} />
  );
};

export default MyWebComponent;

const styles = StyleSheet.create({
  centerFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  overlay: {
    marginTop: -SIZES.height * 0.2,
    height: SIZES.height * 0.7,
    flex: 1,
  },
  rowFlex: {
    height: SIZES.height * 0.1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
  },
  text001: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: COLORS.black,
  },
  slide1: {
    backgroundColor: COLORS.third,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: SIZES.width * 0.4,
    maxHeight: SIZES.width * 0.15,
  },
  slide2: {
    backgroundColor: COLORS.third,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: SIZES.width * 0.4,
    height: SIZES.width * 0.1,
  },
});
