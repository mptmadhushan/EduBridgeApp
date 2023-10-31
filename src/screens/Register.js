/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Keyboard,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from '../helpers/firebase';
import Toast from 'react-native-simple-toast';

import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
// import auth from '@react-native-firebase/auth';
const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(false);
  const __doSignUp = () => {

    console.log('send data', email,password);
    if (!email) {
      Toast.showWithGravity('Please enter username', Toast.LONG, Toast.TOP);
    }
    if (!password) {
      Toast.showWithGravity('Please enter password', Toast.LONG, Toast.TOP);
    } else {
      firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then((res) => {
    navigation.navigate('Home');
     
        console.log('User registered successfully!')
        
        })
    }
  };

  const __doCreateUser = async (email, password) => {
    // navigation.navigate('Login');
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response && response.user) {
        setValid(false);
        setError();
        Alert.alert('Success', 'Account created successfully.. please login');
        navigation.navigate('LogIn');
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <ImageBackground
      style={styles.mainBody}
      source={require('../assets/icons/loginback.png')}>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          width: SIZES.width,
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.centerFlex}>
          <Text style={styles.title}>Create New {'\n'} Account</Text>
          </View>
          <View style={styles.rowFlex}>
            <View style={styles.SectionStyle}>
              <TextInput
                label={'Name'}
                keyboardType="email-address"
                style={[isValid ? styles.inputStyleError : styles.inputStyle]}
                placeholder="User Name"
                placeholderTextColor={COLORS.black}
                onChangeText={text => {
                  setError;
                  setEmail(text);
                }}
                error={isValid}
              />
            </View>
          </View>
          <View style={styles.rowFlex}>
            <View style={styles.SectionStyle}>
              <TextInput
                label={'Email'}
                keyboardType="email-address"
                style={[isValid ? styles.inputStyleError : styles.inputStyle]}
                placeholder="Mail address"
                placeholderTextColor={COLORS.black}
                onChangeText={text => {
                  setError;
                  setEmail(text);
                }}
                error={isValid}
              />
            </View>
          </View>
          <View style={styles.rowFlex}>
            <View style={styles.SectionStyle}>
              <TextInput
                label={'Password'}
                secureTextEntry
                style={[
                  styles.inputStyle,
                  isValid ? styles.inputStyleError : '',
                ]}
                placeholder="Password"
                placeholderTextColor={COLORS.black}
                error={isValid}
                onChangeText={text => setPassword(text)}
              />
            </View>
          </View>

          <View style={styles.centerFlex}>
            <View style={styles.centerFlex}>
              <TouchableOpacity
                // style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Login')}>
                {error ? (
                  <Text style={styles.errorTextStyle}>{error}</Text>
                ) : (
                  <Text style={styles.buttonTextStyle2}>
                    have an account? login here.
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => __doSignUp()}>
              <Text style={styles.buttonTextStyle}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonTextStyle2: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: SIZES.width * 0.3,
  },
  rowFlex: {
    flexDirection: 'row',
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: SIZES.width * 0.1,
    alignContent: 'center',
  },
  mainBody: {
    // backgroundColor: '#FAFAFA',
    flex: 1,
    // alignItems: 'flex-end',
    justifyContent: 'center',
  },
  SectionStyle: {
    // backgroundColor: COLORS.secondary,
    // borderColor: COLORS.white,
    height: 40,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    marginTop: 50,
    color: COLORS.white,
    height: 40,
    width: 130,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    color: COLORS.primary,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: COLORS.black,
    width: SIZES.width * 0.7,
  },
  inputStyleError: {
    flex: 1,
    color: COLORS.third,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'red',
    paddingLeft: 15,
    paddingRight: 15,
    width: SIZES.width * 0.7,
  },
  registerTextStyle: {
    color: '#4c5a5b',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: SIZES.width * 0.3,
  },
});
