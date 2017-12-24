import React from 'react';
import { View } from 'react-native';

export const DebugDiv = ({ color = 'black', children }) => (
  <View style={drawBorder(color)}>{children}</View>
);

export const drawBorder = (color = 'black', width = 2) => ({
  borderWidth: width,
  borderColor: color
});
