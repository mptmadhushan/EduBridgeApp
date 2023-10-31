import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function test() {
  return (
    <View>
      <TouchableOpacity onPress={alert}>
        <Text>Hello word</Text>
        <Text>Hello word</Text>
      </TouchableOpacity>
    </View>
  );
}
