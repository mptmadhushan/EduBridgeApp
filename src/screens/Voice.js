import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import Voice from 'react-native-voice';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const VoiceScreen = ({navigation}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [currentAction, setCurrentAction] = useState('');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;

    // Retrieve existing notes and reminders from AsyncStorage when the component mounts
    getNotes();
    getReminders();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = e => {
    const spokenText = e.value[0].toLowerCase();
    console.log('Recognized Text:', spokenText);

    const createNoteIndex = spokenText.indexOf('create new note');
    const createReminderIndex = spokenText.indexOf('create new reminder');
    const changeThemeIndex =
      spokenText.indexOf('change appearance') ||
      spokenText.indexOf('change color');

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
      // Implement the code to change the theme here
    } else {
      const apiUrl = 'http://10.0.2.2:5002/chatbot';

      // Data to send in the POST request
      const postData = {
        text: 'Hello, chatbot! How are you?',
      };

      // Make the POST request
      axiosπ
        .post(apiUrl, postData)
        .then(response => {
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
    const apiUrl = 'http://10.0.2.2:5002/chatbot';

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
    <ImageBackground
      style={{flex: 1}}
      source={require('../assets/icons/loginback.png')}>
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
              onPress={isListening ? stopListening : startListening}>
              <Text>{isListening ? 'Stop Listening' : 'Start Listening'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

export default VoiceScreen;
