import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

import { ImagePaths } from '../../Constants';
import { TextInputWithIcon } from '../';

import Colors from '../../Styles/Colors';

const AppHeader = ({
  navigation,
  headerTitle,
  leftTitle,
  leftImg,
  rightImg,
  rightTitle,
  onPress,
  onPressLeft,
  searchBar,
  headerImg,
  rightBtnStyle,
  leftImgStyle,
  rightImgStyle,
  rightTitleStyle,
  rightImgStyle2,
  mainContainerStyle,
  ...props
}) => (
  <View style={{ ...styles.mainContainer, ...mainContainerStyle }}>
    {!!headerTitle && (
      <Text style={styles.headerTitleStyle}>{headerTitle}</Text>
    )}
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.leftImgStyles}
        onPress={onPressLeft ? onPressLeft : () => navigation.goBack()}>
        {!!leftImg && (
          <Image
            source={leftImg}
            resizeMode="contain"
            style={{ ...styles.backArrowStyle, ...leftImgStyle }}
          />
        )}
      </TouchableOpacity>

      {!!headerImg && (
        <Image
          source={headerImg}
          resizeMode="contain"
          style={styles.headerImgStyle}
        />
      )}

      {!!leftTitle && <Text style={styles.leftTitleStyle}>{leftTitle}</Text>}

      <View style={styles.searchStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ ...styles.rightImgStyles, ...rightBtnStyle }}
          onPress={onPress}>
          {!!rightImg && (
            <Image
              source={rightImg}
              resizeMode="contain"
              style={{ ...styles.serachIconStyle, ...rightImgStyle }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          {!!rightTitle && (
            <Text style={{ ...styles.rightTitleStyle, ...rightTitleStyle }}>
              {rightTitle}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>

    {!!searchBar && (
      <TextInputWithIcon
        placeholder={'Search, Vendor and Photos'}
        placeholderTextColor={'#999999'}
        leftIcon={ImagePaths.IC_SEARCH}
        inputStyle={styles.searchBarStyle}
        leftIconStyle={styles.leftIconStyle}
        style={styles.textInputStyle}
        {...props}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    shadowColor: Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.25)' : 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: Platform.OS === 'ios' ? 3.5 : 2,
    elevation: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: moderateScale(5),
    padding: moderateScale(5),
  },
  headerTitleStyle: {
    color: Colors.black,
    fontWeight: '500',
    top: moderateVerticalScale(17.5),
  },
  leftTitleStyle: {
    fontWeight: '500',
    fontSize: scale(18),
    color: Colors.blackOpacity50,
  },
  backArrowStyle: {
    width: moderateScale(20),
    height: moderateVerticalScale(20),
  },
  headerImgStyle: {
    width: moderateScale(76),
    height: moderateVerticalScale(25),
    marginStart: moderateScale(5),
  },
  leftImgStyles: {
    justifyContent: 'center',
    width: moderateScale(27),
    height: moderateVerticalScale(27),
    padding: moderateScale(5),
    marginEnd: moderateScale(10),
  },
  serachIconStyle: {
    width: moderateScale(17),
    height: moderateVerticalScale(17),
  },
  rightImgStyles: {
    justifyContent: 'center',
    width: moderateScale(19),
    height: moderateVerticalScale(19),
    padding: moderateScale(5),
    marginEnd: moderateScale(10),
  },
  rightTitleStyle: {
    fontWeight: '400',
    fontSize: scale(18),
    color: Colors.black,
  },
  searchStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  searchBarStyle: {
    width: moderateScale(337),
    height: moderateVerticalScale(44),
    flexDirection: 'row',
    alignItems: 'center',
    margin: moderateScale(14),
    backgroundColor: '#F0F3F6',
    borderRadius: 0,
    top: 0,
    shadowColor: '',
    shadowOffset: {},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  leftIconStyle: {
    margin: moderateScale(10),
    width: moderateScale(22),
    height: moderateVerticalScale(22),
    tintColor: '#999999',
  },
  textInputStyle: {
    width: '80%',
    color: Colors.black,
    marginStart: moderateScale(5),
  },
});

export default AppHeader;
