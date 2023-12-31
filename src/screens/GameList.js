/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import {images, SIZES, COLORS, FONTS} from '../helpers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

export default function GameList({navigation}) {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[COLORS.black, COLORS.secondary]}
        style={styles.overlay}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 100,
              maxHeight: 100,
            }}
            source={require('../assets/eduLogo.png')}
          />
        </View>
      </LinearGradient>

      <View style={styles.rowNorm}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Game')}
          style={styles.slide1}>
          <View style={styles.centerFlex}>
            <Image
              style={{
                width: 50,
                maxHeight: 50,
                resizeMode: 'contain',
              }}
              source={require('../assets/icons/sound.png')}
            />
            <Text style={styles.text001}>Memory Game</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rowNorm}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ColorGame')}
          style={styles.slide1}>
          <View style={styles.centerFlex}>
            <Image
              style={{
                width: 50,
                maxHeight: 50,
                resizeMode: 'contain',
              }}
              source={require('../assets/icons/sound.png')}
            />
            <Text style={styles.text001}>Color Match</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rowNorm}>
        <TouchableOpacity
          onPress={() => navigation.navigate('GameWeb1')}
          style={styles.slide1}>
          <View style={styles.centerFlex}>
            <Image
              style={{
                width: 50,
                maxHeight: 50,
                resizeMode: 'contain',
              }}
              source={require('../assets/icons/sound.png')}
            />
            <Text style={styles.text001}>Game</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rowNorm}>
        <TouchableOpacity
          onPress={() => navigation.navigate('GameWeb2')}
          style={styles.slide1}>
          <View style={styles.centerFlex}>
            <Image
              style={{
                width: 50,
                maxHeight: 50,
                resizeMode: 'contain',
              }}
              source={require('../assets/icons/sound.png')}
            />
            <Text style={styles.text001}>Game</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rowNorm}>
        <TouchableOpacity
          onPress={() => navigation.navigate('GameWeb3')}
          style={styles.slide1}>
          <View style={styles.centerFlex}>
            <Image
              style={{
                width: 50,
                maxHeight: 50,
                resizeMode: 'contain',
              }}
              source={require('../assets/icons/sound.png')}
            />
            <Text style={styles.text001}>Game</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  slide1: {
    // backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    flex: 1,
    maxWidth: SIZES.width * 0.3,
  },
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  title2: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: SIZES.width * 0.06,
    fontSize: 25,
  },
  text001: {
    color: COLORS.black,
    fontSize: 15,
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.height * 0.3,
    marginBottom: 100,
    padding: 30,
  },
  title1: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: SIZES.height * 0.1,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowNorm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: SIZES.width,
    // marginLeft: SIZES.width * 0.06,
    // marginRight: SIZES.width * 0.06,
  },
});
