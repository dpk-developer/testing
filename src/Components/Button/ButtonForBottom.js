import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

import Colors from '../../Styles/Colors';

const ButtonForBottom = ({
  icon,
  label,
  iconStyle,
  labelStyle,
  buttonStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ ...styles.container, ...buttonStyle }}
      {...props}>
      <Image
        source={icon}
        resizeMode={'contain'}
        style={{ ...styles.imageStyle, ...iconStyle }}
      />
      <Text style={{ ...styles.textStyle, ...labelStyle }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.theme,
  },
  imageStyle: {
    width: moderateScale(22),
    height: moderateVerticalScale(24),
  },
  textStyle: {
    color: Colors.darkBlack,
    fontWeight: '500',
    fontSize: scale(15),
    margin: moderateScale(5),
  },
});

export default ButtonForBottom;
