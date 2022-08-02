import { Platform, StyleSheet } from 'react-native';

import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

import Colors from '../../Styles/Colors';

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerStyle: {
    width: '100%',
    height: moderateVerticalScale(170),
    backgroundColor: Colors.theme,
  },
  emailWithStarStyle: {
    width: moderateScale(150),
    height: moderateVerticalScale(120),
    top: moderateVerticalScale(-60),
  },
  otpSentStyle: {
    color: Colors.blackOpacity80,
    fontWeight: '400',
    fontSize: scale(16),
    top: moderateVerticalScale(-40),
  },
  textMsgStyle: {
    fontWeight: '500',
    fontSize: scale(16),
    color: Colors.black,
  },
  mainContainerStyle: {
    backgroundColor: Colors.transparent,
  },
  changeNumberStyle: {
    color: Colors.theme,
    top: moderateVerticalScale(-10),
  },
  enterOtpStyle: {
    fontWeight: '400',
    color: Colors.blackOpacity80,
    fontSize: scale(16),
    top: moderateVerticalScale(30),
  },
  inputRowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    width: moderateScale(48),
    height: moderateVerticalScale(68),
    borderRadius: moderateScale(7),
  },
  labelStyle: {
    fontWeight: '400',
    fontSize: scale(15),
  },
  buttonStyle: {
    width: moderateScale(351),
    height: moderateVerticalScale(51),
    backgroundColor: Colors.theme,
    alignSelf: 'center',
    margin: moderateScale(12),
    shadowColor:
      Platform.OS === 'ios' ? Colors.blackOpacity25 : Colors.darkBlack,
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 1,
    elevation: 10,
    top: moderateVerticalScale(80),
    bottom: moderateVerticalScale(20),
    borderRadius: moderateScale(39),
    borderBottomStartRadius: 0,
  },
  disableStyle: {
    width: moderateScale(351),
    height: moderateVerticalScale(51),
    backgroundColor: Colors.themeOpacity50,
    alignSelf: 'center',
    margin: moderateScale(12),
    shadowColor:
      Platform.OS === 'ios' ? Colors.blackOpacity25 : Colors.darkBlack,
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 1,
    elevation: 10,
    top: moderateVerticalScale(80),
    bottom: moderateVerticalScale(20),
    borderRadius: moderateScale(39),
    borderBottomStartRadius: 0,
  },
  leftImgStyle: {
    width: moderateScale(20),
    height: moderateVerticalScale(20),
  },
});

export default styles;
