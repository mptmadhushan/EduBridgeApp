import React from 'react';
import {View, StyleSheet} from 'react-native';
// import YouTube from 'react-native-youtube';
import YoutubePlayer from 'react-native-youtube-iframe';

const YouTubePlayerScreen = ({VideoId}) => {
  return (
    <View style={styles.container}>
     <YoutubePlayer
        height={300}
        play={true}
        videoId={VideoId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default YouTubePlayerScreen;
