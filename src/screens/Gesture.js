/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const MainScreen = ({routes, navigation}) => {
  let camera;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      takePicture(); // Capture and send a photo to the API every 10 seconds
    }, 10000);

    return () => clearInterval(timerInterval);
  }, []);

  const takePicture = async () => {
    if (camera) {
      const options = {
        quality: 0.5,
        base64: true,
      };
      const data = await camera.takePictureAsync(options);
      const baseImage = data.base64;

      let formData = new FormData();
      formData.append('image', {
        uri: data.uri,
        type: 'image/jpg',
        name: 'image.jpg',
      });

      const apiUrl = 'http://10.0.2.2:5002/recognize_hand_post'; // Replace with your API endpoint URL

      try {
        const response = await axios.post(apiUrl, formData);
        console.log('API Response:', response.data);

        // Handle the response and navigate based on the result
        const result = response.data.result[0];
        if (result === 'Fist') {
          navigation.navigate('Voice');
        } else if (result === 'Open Hand') {
          navigation.navigate('GameHome');
        } else if (result === 'Three Fingers') {
          navigation.navigate('Reminders');
        } else if (result === 'Four Fingers' || result === 'Five Fingers') {
          navigation.navigate('More');
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    }
  };

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      // Your image picker code here
    });
  };

  return (
    <View style={styles.container}>
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
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerText}
      />
      <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
        <Text style={styles.captureText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  captureText: {
    color: 'white',
    fontSize: 18,
  },
  spinnerText: {
    color: 'white',
  },
});

export default MainScreen;
