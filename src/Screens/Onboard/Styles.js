import { Platform, StyleSheet } from 'react-native';

import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

import Colors from '../../Styles/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  crossStyle: {
    width: moderateScale(62),
    height: moderateScale(62),
    top: moderateVerticalScale(68),
    alignSelf: 'center',
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.theme,
  },
  crossSignStyle: {
    color: Colors.black,
    fontSize: scale(25),
    fontWeight: '300',
  },
  logoStyles: {
    alignSelf: 'center',
    width: moderateScale(220),
    height: moderateVerticalScale(70),
    marginTop: moderateVerticalScale(85),
  },
  fbLabelStyle: {
    color: Colors.white,
    fontWeight: '400',
    fontSize: scale(14),
  },
  loginLabelStyle: {
    color: Colors.black,
    fontWeight: '400',
    fontSize: scale(15),
  },
  signUpLabelStyle: {
    color: Colors.theme,
    fontWeight: '400',
    fontSize: scale(15),
  },
  fbBtnStyle: {
    width: moderateScale(351),
    height: moderateVerticalScale(51),
    backgroundColor: '#3374C5',
    alignSelf: 'center',
    margin: moderateScale(12),
    shadowColor:
      Platform.OS === 'ios' ? Colors.blackOpacity25 : Colors.darkBlack,
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 1,
    elevation: 10,
    top: moderateVerticalScale(50),
    borderRadius: moderateScale(39),
  },
  loginBtnStyle: {
    width: '100%',
    height: moderateVerticalScale(45),
    backgroundColor: Colors.theme,
    justifyContent: 'center',
    margin: moderateScale(12),
    shadowColor:
      Platform.OS === 'ios' ? Colors.blackOpacity25 : Colors.darkBlack,
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 1,
    elevation: 10,
    borderRadius: moderateScale(39),
    borderBottomStartRadius: 0,
  },
  loginSignupViewStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginStart: moderateScale(12),
    marginEnd: moderateScale(12),
    marginTop: moderateVerticalScale(60),
  },
  tncStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateVerticalScale(5),
    marginBottom: moderateVerticalScale(10),
  },
  agreementStyles: {
    color: Colors.blackOpacity80,
    fontWeight: '500',
    fontSize: scale(14),
    alignSelf: 'center',
    marginTop: moderateVerticalScale(46),
  },
  tncPrivacyStyles: {
    color: Colors.theme,
    fontWeight: '500',
    fontSize: scale(14),
  },
  andStyles: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: scale(14),
  },
  materialLeftIconStyle: {
    marginStart: moderateScale(-20),
    marginEnd: moderateScale(8),
    width: moderateScale(-32),
    height: moderateVerticalScale(-12),
  },
  materialRightIconStyle: {
    marginStart: moderateScale(8),
    marginEnd: moderateScale(-20),
    width: moderateScale(-32),
    height: moderateVerticalScale(-12),
  },
});

export default styles;
