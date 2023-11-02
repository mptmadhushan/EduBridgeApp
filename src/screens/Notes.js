import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import BottomTabsView from '../components/bottomTabs';
import LinearGradient from 'react-native-linear-gradient';
export default function MoreInfo({navigation, route}) {
  const [notes, setNotes] = useState([]);

  const result = {
    symptoms: [
      '•Quis adipisicing quis ut veniam ad occaecat laboris esse exercitation proident.',

      'Cupidatat reprehenderit non commodo cupidatat elit tempor officia voluptate.',
      ,
      'Cupidatat reprehenderit non commodo cupidatat elit tempor officia voluptate.',
      'Cupidatat reprehenderit non commodo cupidatat elit tempor officia voluptate.',
      '•Quis adipisicing quis ut veniam ad occaecat laboris esse exercitation proident.',

      'Cupidatat reprehenderit non commodo cupidatat elit tempor officia voluptate.',
      ,
      'Cupidatat reprehenderit non commodo cupidatat elit tempor officia voluptate.',
      'Cupidatat reprehenderit non commodo cupidatat elit tempor officia voluptate.',
    ],
    solutions: [
      'Aute dolore consectetur dolore',
      ' ut excepteur officia et commodo do.',
    ],
  };
  useEffect(() => {

    // Retrieve existing notes and reminders from AsyncStorage when the component mounts
    getNotes();

  }, []);
  const getNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
        console.log(
          'Retrieved notes from AsyncStorage:',
          JSON.parse(savedNotes),
        );
      }
    } catch (error) {
      console.error('Error retrieving notes from AsyncStorage:', error);
    }
  };
  return (
    <View style={styles.container} source={require('../assets/cocoOnb.jpg')}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[COLORS.black, COLORS.secondary]}
        style={styles.overlay}>

        <View
          style={{
            alignItems: 'center',
      
          }}>
          <Text style={styles.title}>Your Notes</Text>
        </View>
      </LinearGradient>
      <ScrollView>
        <View style={{alignItems: 'center', paddingHorizontal: 20}}>
          {notes &&
            notes?.map(list => (
              <Text style={styles.des} key={list.index}>
                {list.text}
              </Text>
            ))}
       
        </View>
      </ScrollView>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={styles.bottomButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('Reminders');
          }}>
          <Text style={styles.bottomButtonText}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('More');
          }}>
          <Text style={styles.bottomButtonText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('Home');
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
    marginBottom: 100,
    padding: 30,
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
});
