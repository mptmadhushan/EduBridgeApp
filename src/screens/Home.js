import React, { useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
  ScrollView, // Import ScrollView
} from 'react-native';
import { images, SIZES, COLORS, FONTS } from '../helpers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

export default function Home({ navigation }) {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[COLORS.black, COLORS.secondary]}
          style={styles.overlay}>
          <Text style={styles.title1}>Dev User</Text>
          <Text style={styles.des}>Dev User</Text>
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
            onPress={() => navigation.navigate('Voice')}
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
              <Text style={styles.text001}>Voice</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('GameHome')}
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
              <Text style={styles.text001}>Games</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowNorm}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PlantUpload')}
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
              <Text style={styles.text001}>Gesture</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('EmotionReport')}
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
              <Text style={styles.text001}>Emotion Report</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Buttons at the bottom */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('Home')
          }}>
          <Text style={styles.bottomButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
           navigation.navigate('Reminders')
          }}>
          <Text style={styles.bottomButtonText}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('More')

          }}>
          <Text style={styles.bottomButtonText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('Home')

          }}>
          <Text style={styles.bottomButtonText}>Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  slide1: {
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
    color: COLORS.white,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowNorm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: SIZES.width,
  },
  // Bottom button styles
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 10,
    width: '25%',// Distribute equally among four buttons
    alignItems: 'center',
  },
  bottomButtonText: {
    color: COLORS.white,
  },
});
