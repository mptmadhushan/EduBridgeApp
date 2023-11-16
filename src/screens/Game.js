import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const MemoryGame = () => {
  const initialCards = [
    { id: 1, value: 'A' },
    { id: 2, value: 'B' },
    { id: 3, value: 'C' },
    { id: 4, value: 'D' },
    { id: 5, value: 'A' },
    { id: 6, value: 'B' },
    { id: 7, value: 'C' },
    { id: 8, value: 'D' },
  ];

  const [cards, setCards] = useState(shuffleArray(initialCards));
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);

  const camera = useRef(null);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
      takePhoto(); // Capture and send a photo to the API every 10 seconds
    }, 10000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (selected.length === 2) {
      const [firstCard, secondCard] = selected;
      if (firstCard.value === secondCard.value) {
        setMatched([...matched, firstCard.id, secondCard.id]);
        setScore(score + 1);
      }
      setTimeout(() => {
        setSelected([]);
      }, 1000);
    }
  }, [selected]);

  useEffect(() => {
    if (matched.length === initialCards.length) {
      // Game over logic
      Alert.alert('Game Over', `Your score is ${score}`, [
        { text: 'Restart', onPress: resetGame },
      ]);
    }
  }, [matched]);

  const resetGame = () => {
    setCards(shuffleArray(initialCards));
    setSelected([]);
    setMatched([]);
    setTimer(0);
    setScore(0);
  };

  const takePhoto = async () => {
    if (camera.current) {
      try {
        const options = { quality: 0.5, base64: false, forceUpOrientation: true };
        await camera.current.pausePreview(); // Stop the camera preview
        await camera.current.resumePreview(); // Restart the camera preview
        const data = await camera.current.takePictureAsync(options);
        console.log('Captured photo:', data.uri);
  
        // Send the captured photo as a file to the API
        sendPhotoToAPI(data.uri);
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };

  const sendPhotoToAPI = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
  
      // Make an API call to send the image as a file
      const response = await axios.post(
        'https://3d5b-212-104-237-44.ngrok.io/detect_emotion',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      // Define emotion labels
      const emotionLabels = {
        // '-1': 'Disgust',
        0: 'Angry',
        1: 'Disgust',
        2: 'Fear',
        3: 'Happy',
        4: 'Sad',
        5: 'Surprise',
        6: 'Neutral',
      };
  
      // Extract emotion from the API response
      const emotionValue = response.data.emotion;
      console.log("🚀 ~ file: Game.js:133 ~ sendPhotoToAPI ~ response.data.emotion:", response.data.emotion)
      const emotionLabel = emotionLabels[emotionValue];
  
      if (emotionLabel) {
        // Load the existing emotion counts from AsyncStorage
        AsyncStorage.getItem('emotionCounts')
          .then((storedCounts) => {
            const emotionCounts = storedCounts ? JSON.parse(storedCounts) : {};
            emotionCounts[emotionLabel] = (emotionCounts[emotionLabel] || 0) + 1;
            console.log("🚀 ~ file: Game.js:140 ~ .then ~ emotionCounts:", emotionCounts)
  
            // Store the updated emotion counts in AsyncStorage
            AsyncStorage.setItem('emotionCounts', JSON.stringify(emotionCounts))
              .then(() => {
                console.log('Emotion counts stored in AsyncStorage:', emotionCounts);
              })
              .catch((error) => {
                console.error('Error storing emotion counts:', error);
              });
          })
          .catch((error) => {
            console.error('Error loading emotion counts:', error);
          });
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const handleCardPress = (card) => {
    if (selected.length < 2 && !matched.includes(card.id)) {
      setSelected([...selected, card]);
    }
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selected.includes(item) || matched.includes(item.id)
          ? { backgroundColor: 'green' }
          : null,
      ]}
      onPress={() => handleCardPress(item)}
      disabled={selected.length === 2 || matched.includes(item.id)}
    >
      <Text style={styles.cardText}>
        {selected.includes(item) || matched.includes(item.id) ? item.value : '?'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Timer: {timer} seconds</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <FlatList
        data={cards}
        numColumns={4}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
      />
      <RNCamera
        ref={camera}
        style={styles.camera}
        type={RNCamera.Constants.Type.front}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 80,
    margin: 5,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  camera: {
    // flex: 1,
    width: 1,
    height:1
  },
});

export default MemoryGame;
