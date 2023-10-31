import React, { useState, useEffect } from 'react';
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

const VoiceScreen = ({ navigation }) => {
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
    console.log("🚀 ~ file: Voice.js:38 ~ onSpeechResults ~ spokenText:", spokenText)

    const createNoteIndex = spokenText.indexOf('create new note');
    const createReminderIndex = spokenText.indexOf('create new reminder');

    if (createNoteIndex !== -1) {
      setRecognizedText(
        spokenText.slice(createNoteIndex + 'create new note'.length).trim(),
        console.log("🚀 'create new note", spokenText.slice(createNoteIndex + 'create new note'.length).trim())
      );
      saveNote();
    } else if (createReminderIndex !== -1) {
      setRecognizedText(
        spokenText.slice(createReminderIndex + 'create new reminder'.length).trim(),
        console.log("🚀 ~ 'create new reminder'",  spokenText.slice(createReminderIndex + 'create new reminder'.length).trim())
      );
      saveReminder();
    }
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      setCurrentAction(''); // Clear the current action
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  const getNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
        console.log("🚀 ~ file: Voice.js:79 ~ getNotes ~ JSON.parse(savedNotes):", JSON.parse(savedNotes))
      }
    } catch (error) {
      console.error('Error retrieving notes from AsyncStorage:', error);
    }
  };

  const saveNote = async () => {
    if (recognizedText) {
      console.log("🚀 ~ file: Voice.js:91 ~ saveNote ~ recognizedText:", recognizedText)
      try {
        const newNoteEntry = {
          text: recognizedText,
          timestamp: new Date().toISOString(),
        };

        const updatedNotes = [...notes, newNoteEntry];
        console.log("🚀 ~ file: Voice.js:99 ~ saveNote ~ updatedNotes:", updatedNotes)
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));

        setRecognizedText('');
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
        console.log("🚀 ~ file: Voice.js:110 ~ getReminders ~ JSON.parse(savedReminders):", JSON.parse(savedReminders))
      }
    } catch (error) {
      console.error('Error retrieving reminders from AsyncStorage:', error);
    }
  };

  const saveReminder = async () => {
    if (recognizedText) {
      try {
        const newReminderEntry = {
          text: recognizedText,
          timestamp: new Date().toISOString(),
        };

        const updatedReminders = [...reminders, newReminderEntry];
        setReminders(updatedReminders);
        await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));

        setRecognizedText('');
      } catch (error) {
        console.error('Error saving reminder:', error);
      }
    }
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../assets/icons/loginback.png')}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <KeyboardAvoidingView behavior="padding">
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Recognized Text: {recognizedText}</Text>
            <TouchableOpacity
              onPress={isListening ? stopListening : startListening}>
              <Text>{isListening ? 'Stop Listening' : 'Start Listening'}</Text>
            </TouchableOpacity>

            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                width: 250,
                marginTop: 10,
                padding: 10,
              }}
              placeholder="New Note"
              onChangeText={text => setNewNote(text)}
              value={newNote}
            />

            <TouchableOpacity onPress={saveNote}>
              <Text>Save Note</Text>
            </TouchableOpacity>

            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                width: 250,
                marginTop: 10,
                padding: 10,
              }}
              placeholder="New Reminder"
              onChangeText={text => setNewReminder(text)}
              value={newReminder}
            />

            <TouchableOpacity onPress={saveReminder}>
              <Text>Save Reminder</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

export default VoiceScreen;
