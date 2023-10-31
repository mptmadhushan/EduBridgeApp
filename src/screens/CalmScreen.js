import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,Image,
  ImageBackground,ScrollView,FlatList
} from 'react-native';
import Video from 'react-native-video';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import LinearGradient from 'react-native-linear-gradient';
export default function OnBoard({navigation, route}) {
  // const {resData} = route.params;
  const result = {
    symptoms: [
      '•Quis adipisicing quis ut veniam ad occaecat laboris esse exercitation proident.',
     
     'Cupidatat reprehenderit non commodo cupidatat elit tempor officia voluptate.',,
     'Cupidatat reprehenderit non commodo cupidatat elit tempor officia voluptate.',
     'Cupidatat reprehenderit non commodo cupidatat elit tempor officia voluptate.','•Quis adipisicing quis ut veniam ad occaecat laboris esse exercitation proident.',
     
     'Cupidatat reprehenderit non commodo cupidatat elit tempor officia voluptate.',,
     'Cupidatat reprehenderit non commodo cupidatat elit tempor officia voluptate.',
     'Cupidatat reprehenderit non commodo cupidatat elit tempor officia voluptate.',
    ],
    solutions: [
      'Aute dolore consectetur dolore',
      ' ut excepteur officia et commodo do.',
    ],
  };


const videoData = [
  {
    id: 1,
    source: require('../assets/clam.mp4'),
  }, {
    id: 2,
    source: require('../assets/clam.mp4'),
  },
  // {
  //   id: 2,
  //   source: require('../assets/clam01.MP4'),
  // },
  // Add more video objects as needed
];
  // const result = resData.result.detail;
  // console.log('hello from res', resData);
  console.log(result);
  const api = {foo: 'bar', foz: 'baz'};
  return (
    <View
      style={styles.container}
      source={require('../assets/cocoOnb.jpg')}>
      <LinearGradient
      start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
        colors={[COLORS.black, COLORS.secondary,]}
        style={styles.overlay}>
        {/* <Text style={styles.title1}>
          "Protect your Palms: Uncovering Cocon+ut Diseases to Preserve Your
          Paradise."
        </Text> */}
        <View
          style={{
            alignItems: 'center',
            // marginTop: SIZES.height * 0.04,
            // maxHeight: 50,
          }}>
                 <Text style={styles.title}>Calm You</Text>

        </View>
      </LinearGradient>
      {/* <FlatList
        data={videoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Video

          fullscreen={true}
          paused={true}
            source={item.source}
            style={styles.video}
            controls={true}
            resizeMode="cover"
          />
        )}
      /> */}
      <ScrollView >
        <View style={{alignItems: 'center', paddingHorizontal: 20}}>
          {videoData &&
            videoData.map(list => (
              <Video

              paused={true}
                source={list.source}
                style={styles.video}
                controls={true}
                resizeMode="cover"
              />
            ))}
        
        </View>


        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.btn}>
          <Text style={styles.btnText}>Home</Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    flex: 1,
  },
  video: {
    flex: 1,
    width:SIZES.width,
    height:500
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
});
