import React from 'react';
import { View, Image, StyleSheet, TextInput, Platform } from 'react-native';

import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../Styles/Colors';

const TextInputWithIcon = ({
  icon,
  inputRef,
  inputStyle,
  leftIcon,
  leftIconStyle,
  ...props
}) => (
  <View style={{ ...styles.container, ...inputStyle }}>
    {!!icon && (
      <Icon
        style={styles.icon}
        name={icon}
        color={Colors.theme}
        size={26}
        {...props}
      />
    )}

    {!!leftIcon && (
      <Image source={leftIcon} resizeMode={'contain'} style={leftIconStyle} />
    )}
    <TextInput ref={inputRef} style={styles.input} {...props} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    margin: moderateScale(12),
    borderRadius: moderateScale(39),
    top: moderateVerticalScale(51),
    height: moderateVerticalScale(51),
    shadowColor: Platform.OS === 'ios' ? Colors.blackOpacity25 : Colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: Platform.OS === 'ios' ? 3.5 : 2,
    elevation: 5,
  },
  icon: {
    alignSelf: 'center',
    marginStart: moderateScale(15),
  },
  input: {
    width: '90%',
    color: Colors.black,
    marginStart: moderateScale(15),
  },
});

export default TextInputWithIcon;
