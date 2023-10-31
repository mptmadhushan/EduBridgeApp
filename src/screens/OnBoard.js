/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import LinearGradient from 'react-native-linear-gradient';
export default function OnBoard({navigation}) {
  console.log(':hap');
  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/rm222-mind-20.jpg')}>
      <LinearGradient
        colors={[COLORS.primary, 'transparent']}
        style={styles.overlay}>
        <Image
          style={{
            width: 100,
            maxHeight: 100,
            marginTop: SIZES.height * 0.2,
            resizeMode: 'contain',
          }}
          source={images}
        />
        <Text style={styles.title2}>
          "Et aliqua tempor dolor incididunt culpa occaecat mollit ut ea nulla Lorem sunt aliquip aute.."
        </Text>
        {/* <Text style={styles.titl/e}>"Proident sint ipsum"</Text> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.btn}>
          <Text style={styles.btnText}>Get started</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    flex: 1,
  },
  overlay: {
    // marginTop: SIZES.height ,
    // backgroundColor: 'rgba(255,0,0,0.5)',
    height: SIZES.height * 0.7,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: COLORS.third,
    height: 40,
    width: 130,
    borderRadius: 20,
    margin: 10,
    marginTop: SIZES.height * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.third,
    shadowOffset: {
      width: 12,
      height: 12,
    },
    shadowOpacity: 0.98,
    shadowRadius: 16.0,
    elevation: 24,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight:'bold'
  },
  title: {
    color: COLORS.secondary,
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: 'bold',
  },
  title2: {
    marginTop: SIZES.height * 0.01,
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});
