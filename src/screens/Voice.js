import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import Voice from 'react-native-voice';
import {images, SIZES, COLORS, FONTS} from '../helpers';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import bg1 from '../assets/1.png';
import bg2 from '../assets/2.png';
import bg3 from '../assets/3.png';
import bg4 from '../assets/4.png';
import bg45 from '../assets/icons/loginback.png';
const backgroundImages = [bg1, bg2, bg3, bg4];

const VoiceScreen = ({navigation}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [currentAction, setCurrentAction] = useState('');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(bg45);
  const openWebView = () => {
    navigation.navigate('WebView', {url: 'https://www.google.com'}); // Replace with the URL you want to open
  };
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;

    // Retrieve existing notes and reminders from AsyncStorage when the component mounts
    getNotes();
    getReminders();
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1.5);

    // Clean up TTS when component unmounts
    return () => {
      Tts.stop();
      Tts.shutdown();
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = e => {
    const spokenText = e.value[0].toLowerCase();
    console.log('Recognized Text:', spokenText);

    const createNoteIndex = spokenText.indexOf('create new note');
    const createReminderIndex = spokenText.indexOf('create new reminder');
    const changeThemeIndex = spokenText.indexOf('change appearance');

    if (createNoteIndex !== -1) {
      const noteText = spokenText
        .slice(createNoteIndex + 'create new note'.length)
        .trim();
      console.log('Creating note with text:', noteText);
      saveNote(noteText);
    } else if (createReminderIndex !== -1) {
      const reminderText = spokenText
        .slice(createReminderIndex + 'create new reminder'.length)
        .trim();
      console.log('Creating reminder with text:', reminderText);
      saveReminder(reminderText);
    } else if (changeThemeIndex !== -1) {
      console.log('Changing theme');
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setBackgroundImage(backgroundImages[randomIndex]);
    } else {
      const apiUrl = 'https://3d5b-212-104-237-44.ngrok.io/chatbot';
      // const apiUrl = 'http://10.0.2.2:5002/chatbot';

      // Data to send in the POST request
      const postData = {
        text: spokenText,
      };

      // Make the POST request
      axios
        .post(apiUrl, postData)
        .then(response => {
          Tts.speak(response.data);

          // Handle the response here
          console.log('API Response:', response.data);
        })
        .catch(error => {
          // Handle errors here
          console.error('API Error:', error);
        });
    }
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
      console.log('Voice recognition started');
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopListening = async () => {
    const apiUrl = 'https://3d5b-212-104-237-44.ngrok.io/chatbot';

    // Data to send in the POST requestr
    const postData = {
      text: 'Hello, chatbot! How are you?',
    };

    // Make the POST request
    axios
      .post(apiUrl, postData)
      .then(response => {
        // Handle the response here
        console.log('API Response:', response.data);
      })
      .catch(error => {
        // Handle errors here
        console.error('API Error:', error);
      });
    try {
      await Voice.stop();
      setIsListening(false);
      setCurrentAction(''); // Clear the current action
      console.log('Voice recognition stopped');
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

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

  const saveNote = async text => {
    if (text) {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');

        // Fetch existing notes
        const existingNotes = JSON.parse(savedNotes) || [];
        console.log('🚀 ~ file: Voice.js:92 ~ saveNote ~ notes:', notes);

        const newNoteEntry = {
          text: text,
          timestamp: new Date().toISOString(),
        };

        const updatedNotes = [...existingNotes, newNoteEntry];
        console.log(
          '🚀 ~ file: Voice.js:100 ~ saveNote ~ updatedNotes:',
          updatedNotes,
        );
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        setRecognizedText('');
        console.log('Saved note:', text);
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
  };

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

  const saveReminder = async text => {
    if (text) {
      try {
        // Fetch existing reminders
        const savedReminders = await AsyncStorage.getItem('reminders');

        // Fetch existing notes
        const existingReminders = JSON.parse(savedReminders) || [];
        console.log(
          '🚀 ~ file: Voice.js:92 ~ saveNote ~ notes:',
          existingReminders,
        );

        const newReminderEntry = {
          text: text,
          timestamp: new Date().toISOString(),
        };

        const updatedReminders = [...existingReminders, newReminderEntry];
        setReminders(updatedReminders);
        await AsyncStorage.setItem(
          'reminders',
          JSON.stringify(updatedReminders),
        );
        setRecognizedText('');
        console.log('Saved reminder:', text);
      } catch (error) {
        console.error('Error saving reminder:', error);
      }
    }
  };
  return (
    <ImageBackground style={{flex: 1}} source={backgroundImage}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <KeyboardAvoidingView behavior="padding">
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{
                width: 200,
                maxHeight: 200,
                resizeMode: 'contain',
              }}
              source={require('../assets/icons/voc.png')}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              Hi, I’M Voxie
            </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>Recognized Text: {recognizedText}</Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={isListening ? stopListening : startListening}>
              <Text style={styles.buttonTextStyle}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
              </Text>
            </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('TimeManage');
            }}>
            <Text style={styles.buttonTextStyle}>TimeManage</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('Quiz');
            }}>
            <Text style={styles.buttonTextStyle}>Quiz</Text>
          </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
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
            navigation.navigate('Help');
          }}>
          <Text style={styles.bottomButtonText}>Help</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default VoiceScreen;

const styles = StyleSheet.create({
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 10,
    width: '25%', // Distribute equally among four buttons
    alignItems: 'center',
  },
  bottomButtonText: {
    color: COLORS.white,
  },
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonTextStyle2: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: SIZES.width * 0.3,
  },
  title: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  rowFlex: {
    flexDirection: 'row',
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: SIZES.width * 0.1,
    alignContent: 'center',
  },
  mainBody: {
    // backgroundColor: '#FAFAFA',
    flex: 1,
    // alignItems: 'flex-end',
    justifyContent: 'center',
  },
  SectionStyle: {
    // backgroundColor: COLORS.secondary,
    // borderColor: COLORS.white,
    height: 40,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    marginTop: 50,
    color: COLORS.black,
    height: 40,
    width: 130,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 50,
    flex: 1,
    color: COLORS.black,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: COLORS.black,
    width: SIZES.width * 0.7,
  },
  inputStyleError: {
    flex: 1,
    color: COLORS.third,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    paddingLeft: 15,
    paddingRight: 15,
    width: SIZES.width * 0.7,
  },
  registerTextStyle: {
    color: '#4c5a5b',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: SIZES.width * 0.05,
  },
});
