import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import LinearGradient from 'react-native-linear-gradient';
export default function BottomTabsView({navigation, route}) {
  return (
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
          navigation.navigate('Home');
        }}>
        <Text style={styles.bottomButtonText}>Help</Text>
      </TouchableOpacity>
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
    width: '25%',// Distribute equally among four buttons
    alignItems: 'center',
  },
  bottomButtonText: {
    color: COLORS.white,
  },
});
