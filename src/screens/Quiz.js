import React from 'react';
import {WebView} from 'react-native-webview';

const CustomWebView = ({url}) => {
  console.log('web', url);
  return <WebView source={{uri: 'https://lahirumadushan99.github.io/EduBridgeQuiz/'}} style={{flex: 1}} />;
};

export default CustomWebView;
