import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ButtonWithIcon = ({
  label,
  leftIcon,
  rigthIcon,
  leftIconStyle,
  rightIconStyle,
  materialLeftIcon,
  materialRightIcon,
  buttonStyle,
  labelStyle,
  ...props
}) => (
  <TouchableOpacity
    style={{ ...styles.container, ...buttonStyle }}
    activeOpacity={0.8}
    {...props}>
    {!!leftIcon && (
      <Image
        source={leftIcon}
        resizeMode="contain"
        style={{ ...styles.leftIcon, ...leftIconStyle }}
      />
    )}

    {!!materialLeftIcon && (
      <Icon
        name={materialLeftIcon?.name}
        color={materialLeftIcon?.color}
        style={{ ...styles.rigthIcon, ...materialLeftIcon?.style }}
        size={materialLeftIcon?.size}
      />
    )}

    <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>

    {!!rigthIcon && (
      <Image
        source={rigthIcon}
        resizeMode="contain"
        style={{ ...styles.rigthIcon, ...rightIconStyle }}
      />
    )}

    {!!materialRightIcon && (
      <Icon
        name={materialRightIcon?.name}
        color={materialRightIcon?.color}
        style={{ ...styles.rigthIcon, ...materialRightIcon?.style }}
        size={materialRightIcon?.size}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  leftIcon: {
    width: moderateScale(32),
    height: moderateVerticalScale(12),
  },
  rigthIcon: {
    width: moderateScale(32),
    height: moderateVerticalScale(12),
  },
  label: {
    fontWeight: '400',
    fontSize: scale(14),
  },
});

export default ButtonWithIcon;
