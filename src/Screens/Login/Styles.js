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
  logo: {
    alignSelf: 'center',
    width: moderateScale(220),
    height: moderateVerticalScale(70),
    marginTop: moderateVerticalScale(85),
  },
  labelStyle: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: scale(18),
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
    marginTop: moderateVerticalScale(80),
    borderRadius: moderateScale(39),
    borderBottomStartRadius: 0,
  },
  alreadyStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateVerticalScale(110),
    marginBottom: moderateVerticalScale(50),
  },
  alreadyOnStyles: {
    color: Colors.blackOpacity50,
    fontWeight: '500',
    fontSize: scale(14),
  },
  alreadyLoginStyles: {
    color: Colors.theme,
    fontWeight: '500',
    fontSize: scale(14),
  },
  loginSuccessLogo: {
    width: moderateScale(184),
    height: moderateVerticalScale(184),
  },
  loginSuccessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.theme,
  },
  successText: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: scale(27),
    top: moderateVerticalScale(32),
  },
  welcomeText: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: scale(18),
    top: moderateVerticalScale(45),
  },
});

export default styles;
