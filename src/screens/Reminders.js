import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,Image,
  ImageBackground,ScrollView
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
export default function OnBoard({navigation, route}) {
  // const {resData} = route.params;
  const result = {
    symptoms: [
     
     'Cupidatat a voluptate.',,
     'Cupidatat a voluptate.',
     'Cupidatat a voluptate.','•Quis adipisicing quis ut veniam ad occaecat laboris esse exercitation proident.',
     
     'Cupidatat a voluptate.',,
     'Cupidatat a voluptate.',
     'Cupidatat a voluptate.',
    ],
    solutions: [
      'Aute dolore consectetur dolore',
      ' ut excepteur officia et commodo do.',
    ],
  };
  useEffect(() => {

    // Retrieve existing notes and reminders from AsyncStorage when the component mounts
    getReminders();
 
  }, []);
  const [reminders, setReminders] = useState([]);

  // const result = resData.result.detail;
  // console.log('hello from res', resData);

  const getReminders = async () => {
    try {
      const savedReminders = await AsyncStorage.getItem('reminders');
      if (savedReminders) {
        setReminders(JSON.parse(savedReminders));
        console.log(
          'Retrieved reminders from AsyncStorage:',
          JSON.parse(savedReminders),
        );
      }
    } catch (error) {
      console.error('Error retrieving reminders from AsyncStorage:', error);
    }
  };
  return (
    <View
      style={styles.container}
      source={require('../assets/cocoOnb.jpg')}>
      <LinearGradient
      start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
        colors={[COLORS.black, COLORS.secondary,]}
        style={styles.overlay}>
        {/* <Text style={styles.title1}>
          "Protect your Palms: Uncovering Coconut Diseases to Preserve Your
          Paradise."
        </Text> */}
        <View
          style={{
            alignItems: 'center',
            // marginTop: SIZES.height * 0.04,
            // maxHeight: 50,
          }}>
                 <Text style={styles.title}>Your Reminders</Text>

        </View>
      </LinearGradient>
        <ScrollView >
        <View style={{alignItems: 'center', paddingHorizontal: 20}}>
          {reminders &&
            reminders?.map(list => (
              <Text style={styles.des} key={list.index}>
                {list.text} {'\n'} Date : Sat Oct 29 2022 {'\n'} Time : 02:05:51
              </Text>
            ))}
          {/* <Text style={styles.title}>Solutions</Text> */}
          {/* 
          {result.solutions &&
            result.solutions.map(list => ( */}
          {/* <Text style={styles.des}>
            Overall, incorporating coconut into your diet and beauty routine can
            have many health and beauty benefits.
          </Text> */}
          {/* // ))} */}
        </View>


        </ScrollView>
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
  container: {
    height: SIZES.height,
    flex: 1,
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.height * 0.25,
    marginBottom:100,
    padding:30

  },
  btn: {
    backgroundColor: COLORS.primary,
    height: 40,
    width: 100,
    borderRadius: 20,
    margin: 50,
    marginTop: 20,
    marginBottom: 20,
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
  },
  title: {
    color: COLORS.white,
    fontSize: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: 'bold',
  },
  des: {
    color: COLORS.black,
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
    borderRadius: 50,
    margin: 5,
    padding: 5,
    fontWeight: 'bold',
    marginTop: 10,
    backgroundColor: 'white',
  },
  title2: {
    // marginTop: SIZES.height * 0.1,
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
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
