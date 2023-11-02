import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import Youtube from '../components/Youtube';
import {COLORS} from '../helpers';
import {RNCamera} from 'react-native-camera';

import AsyncStorage from '@react-native-community/async-storage';
export default function OnBoard({navigation}) {
  let camera;

  const [emo, setEmo] = useState({
    Angry: 0,
    Surprise: 0,
    Sadness: 0,
    Neutral: 0,
    Happiness: 0,
    Disgust: 0,
    Fear: 0,
  });
  const [userData, setUserData] = useState();
  useEffect(() => {
    getEmo();
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('user');
      if (savedNotes) {
        setUserData(JSON.parse(savedNotes));
        console.log(
          'Retrieved notes from AsyncStorage:',
          JSON.parse(savedNotes),
        );
      }
    } catch (error) {
      console.error('Error retrieving notes from AsyncStorage:', error);
    }
  };
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
      takePhoto(); // Capture and send a photo to the API every 10 seconds
    }, 10000);

    return () => clearInterval(timerInterval);
  }, []);

  const getEmo = async () => {
    try {
      const emotion = await AsyncStorage.getItem('emotionCounts');
      if (emotion) {
        setEmo(JSON.parse(emotion));
        console.log('Retrieved notes from AsyncStorage:', JSON.parse(emotion));
      }
    } catch (error) {
      console.error('Error retrieving notes from AsyncStorage:', error);
    }
  };
  const takePhoto = async () => {
    if (camera.current) {
      try {
        const options = {quality: 0.5, base64: false, forceUpOrientation: true};
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

  const sendPhotoToAPI = async imageUri => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      // Make an API call to send the image as a file
      const response = await axios.post(
        'http://10.0.2.2:5002/detect_emotion',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      // Extract emotion from the API response
      const emotionValue = response.data.emotion;
      if (emotionValue === 3) {
        Alert.alert('Happy', 'You are Smiling');
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };
  const emotionToVideoUrl = {
    Angry: 'KUTD-IdLAN0',
    Surprise: 'brGhhDpgcsg',
    Sadness: 'SmqiBFYcmpg',
    Neutral: '4PcBo11EH9k',
    Happiness: 'lAyT3fMTCsQ',
    Disgust: 'U8sD-XDVmdM',
    Fear: 'oPvYbQZDJnU',
  };

  const totalCount =
    Object.keys(emo).length > 0
      ? Object.values(emo).reduce((acc, value) => acc + value, 0)
      : 0;

  const labels = Object.keys(emo);
  const dataValues = Object.values(emo);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
      },
    ],
  };

  const highestEmotion = Object.keys(emo).reduce((a, b) =>
    emo[a] > emo[b] ? a : b,
  );
  const videoUrl = emotionToVideoUrl[highestEmotion];

  return (
    <View style={styles.container}>
      {userData?.user?.email === 'parent@gmail.com' ? (
        <ScrollView>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[COLORS.black, COLORS.secondary]}
            style={styles.overlay}>
            <Text style={[styles.title]}>Child's Emotions Report</Text>
          </LinearGradient>
          <View style={{alignItems: 'center', paddingHorizontal: 20}}>
            <Text style={styles.title}>Past Week</Text>
            {labels.map((label, index) => (
              <Text style={styles.des} key={index}>
                {label}: {((emo[label] / totalCount) * 100).toFixed(2)} %
              </Text>
            ))}
            <BarChart
              style={{marginTop: 50, marginBottom: 50}}
              data={data}
              width={360}
              height={220}
              yAxisLabel=""
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>
          <Youtube VideoId={videoUrl} />
        </ScrollView>
      ) : (
        <ScrollView>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{
                height: 400,
                width: 400, // Set the width as well
              }}
              source={require('../assets/mikotillsmile.gif')}
            />
          </View>
          <View style={styles.cameraContainer}>
            <RNCamera
              ref={ref => (camera = ref)}
              style={styles.camera}
              type={RNCamera.Constants.Type.front}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />
          </View>
        </ScrollView>
      )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  title: {
    color: COLORS.black,
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
  camera: {
    flex: 1,
  },
});
