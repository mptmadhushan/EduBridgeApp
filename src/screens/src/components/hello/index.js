import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native'

class Hello extends Component {
    render() {
        return (
            <LinearGradient
        colors={['transparent', COLORS.primary]}
        style={styles.overlay}>
        <Image
          style={{
            width: 100,
            maxHeight: 100,
            marginTop: SIZES.height * 0.2,
            resizeMode: 'contain',
          }}
          source={images}
        />
        <Text style={styles.title2}>Take care of your</Text>
        <Text style={styles.title}>"greens"</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.btn}>
          <Text style={styles.btnText}>Get started</Text>
        </TouchableOpacity>
        );
    }
}

export default Hello;