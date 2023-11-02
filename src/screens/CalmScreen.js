import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import { icons, images, SIZES, COLORS, FONTS } from '../helpers';
import LinearGradient from 'react-native-linear-gradient';
import Youtube from '../components/Youtube';

export default function OnBoard({ navigation, route }) {
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const videoData = [
    { title: 'Video 1', videoId: 'OYA-dtPXQL8' },
    { title: 'Video 2', videoId: 'ZppkntzMD3U' },
    { title: 'Video 3', videoId: 'S8tZN-EW6Xk' },
    { title: 'Video 4', videoId: 'AI_aWUOdo8Y' },
    { title: 'Video 5', videoId: 'zSPxMJH-RSs' },
  ];

  const playVideo = (videoId) => {
    setCurrentVideoId(videoId);
  };

  const stopVideo = () => {
    setCurrentVideoId(null);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[COLORS.black, COLORS.secondary]}
        style={styles.overlay}
      >
        <View style={{
          alignItems: 'center',
        }}>
          <Text style={styles.title}>Calm You</Text>
        </View>
      </LinearGradient>

      <ScrollView>
        {videoData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => playVideo(item.videoId)}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        {currentVideoId && (
          <Youtube VideoId={currentVideoId} onClose={stopVideo} />
        )}
      </ScrollView>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.bottomButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('Reminders');
          }}
        >
          <Text style={styles.bottomButtonText}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('More');
          }}
        >
          <Text style={styles.bottomButtonText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('Help');
          }}
        >
          <Text style={styles.bottomButtonText}>Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  card: {
    backgroundColor: COLORS.white,
    height: 40,
    width: 200,
    borderRadius: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: COLORS.black,
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
});
