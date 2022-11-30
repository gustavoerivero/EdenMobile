import React from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg'

const Background = ({ topColor, bottomColor, children }) => {

  const layout = useWindowDimensions()

  return (
    <View style={{ flex: 1 }}>
      <Svg width={layout.width} height={layout.height} style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0" stopColor={topColor} />
            <Stop offset="1" stopColor={bottomColor} />
          </LinearGradient>
        </Defs>
        <Rect width={layout.width} height={layout.height} fill="url(#grad)" />
      </Svg>
      {children}
    </View>
  );
};

export default Background;