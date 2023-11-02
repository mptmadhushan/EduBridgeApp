import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OnBoard from '../screens/OnBoard';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Result from '../screens/Result';
import PlantUpload from '../screens/Gesture';
import MoreInfo from '../screens/Notes';
import Reminders from '../screens/Reminders';
import VoiceScreen from '../screens/Voice';
import Game from '../screens/Game';
import EmotionReport from '../screens/EmotionReport';
import GameHome from '../screens/GameHome';
import CalmScreen from '../screens/CalmScreen';
import ColorGame from '../screens/ColorGame';
import GameList from '../screens/GameList';
import WebView from '../screens/WebView';
import Quiz from '../screens/Quiz';
import GameWeb1 from '../screens/GameWeb1';
import GameWeb2 from '../screens/GameWeb2';
import GameWeb3 from '../screens/GameWeb3';
import TimeManage from '../screens/TimeManage';
import TestChart from '../screens/chart';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {View, Text, Image} from 'react-native';
// import backimg from '../assets/images/arrow-back-12-512.png';
const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: TapGestureHandler,
        }}>
      
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="GameHome"
          options={{headerShown: false}}
          component={GameHome}
        />
     
        <Stack.Screen
          name="Register"
          options={{headerShown: false}}
          component={Register}
        />
        <Stack.Screen
          name="Quiz"
          options={{headerShown: false}}
          component={Quiz}
        />
        <Stack.Screen
          name="Reminders"
          options={{headerShown: false}}
          component={Reminders}
        />
        <Stack.Screen
          name="OnBoard"
          options={{headerShown: false}}
          component={OnBoard}
        />
        <Stack.Screen
          name="PlantUpload"
          options={{headerShown: false}}
          component={PlantUpload}
        />
        <Stack.Screen
          name="TimeManage"
          options={{headerShown: false}}
          component={TimeManage}
        />
        <Stack.Screen
          name="Result"
          options={{headerShown: false}}
          component={Result}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="More"
          options={{headerShown: false}}
          component={MoreInfo}
        />
        <Stack.Screen
          name="Voice"
          options={{headerShown: false}}
          component={VoiceScreen}
        />
        <Stack.Screen
          name="Game"
          options={{headerShown: false}}
          component={Game}
        />
        <Stack.Screen
          name="EmotionReport"
          options={{headerShown: false}}
          component={EmotionReport}
        />
        <Stack.Screen
          name="CalmScreen"
          options={{headerShown: false}}
          component={CalmScreen}
        />
        <Stack.Screen
          name="ColorGame"
          options={{headerShown: false}}
          component={ColorGame}
        />
        <Stack.Screen
          name="GameList"
          options={{headerShown: false}}
          component={GameList}
        />
        <Stack.Screen
          name="WebView"
          options={{headerShown: false}}
          component={WebView}
        />
        <Stack.Screen
          name="GameWeb3"
          options={{headerShown: false}}
          component={GameWeb3}
        />
        <Stack.Screen
          name="GameWeb2"
          options={{headerShown: false}}
          component={GameWeb2}
        />
        <Stack.Screen
          name="GameWeb1"
          options={{headerShown: false}}
          component={GameWeb1}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
