import { Platform, StyleSheet } from 'react-native';

import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

import Colors from '../../Styles/Colors';

const styles = StyleSheet.create({
  customerContainerStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: moderateScale(300),
    borderTopStartRadius: moderateScale(4),
    borderTopEndRadius: moderateScale(4),
  },
  feedbackContainerStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: moderateScale(300),
    borderTopStartRadius: moderateScale(4),
    borderTopEndRadius: moderateScale(4),
  },
  highlightStyle: {
    borderTopStartRadius: moderateScale(4),
    borderTopEndRadius: moderateScale(4),
    backgroundColor: Colors.theme,
    height: moderateVerticalScale(8),
  },
  inputStyle: {
    borderRadius: 0,
    margin: moderateScale(5),
    top: 8,
    elevation: 0,
    color: 'red',
    backgroundColor: Colors.white,
  },
  inputMsgStyle: {
    borderRadius: 0,
    margin: moderateScale(5),
    top: 8,
    elevation: 0,
    color: 'red',
    height: moderateVerticalScale(100),
    backgroundColor: Colors.white,
  },
  buttonMenuStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: moderateVerticalScale(40),
  },
  cancelBtnStyle: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateVerticalScale(40),
    backgroundColor: '#d9dadb',
    borderBottomStartRadius: moderateScale(4),
  },
  submitBtnStyle: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    height: moderateVerticalScale(40),
    backgroundColor: Colors.theme,
    borderBottomEndRadius: moderateScale(4),
  },
  labelStyle: {
    fontWeight: '500',
    fontSize: scale(13),
    color: Colors.blackOpacity80,
  },
  faqContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  deatilCategoryCardStyle: {
    backgroundColor: Colors.white,
    margin: moderateScale(12),
    marginBottom: moderateVerticalScale(10),
    shadowColor: Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.25)' : 'black',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: Platform.OS === 'ios' ? 5 : 2,
    elevation: 5,
  },
  detailCategoryImgtyle: {
    width: '100%',
    height: moderateVerticalScale(150),
  },
  detailCategoryDescStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: moderateScale(10),
  },
  categoryTextStyle: {
    width: '85%',
    fontWeight: '500',
    fontSize: scale(15),
    margin: moderateScale(8),
    color: Colors.blackOpacity75,
  },
  detailCategoryDescThreeStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: moderateScale(10),
    marginTop: moderateVerticalScale(-5),
  },
  locationIcStyle: {
    width: moderateScale(16),
    height: moderateVerticalScale(16),
    marginStart: moderateScale(8),
    marginEnd: moderateScale(-5),
  },
  locationTextStyle: {
    width: '66%',
    fontWeight: '400',
    fontSize: scale(13),
    color: Colors.blackOpacity75,
    marginHorizontal: moderateScale(8),
    marginTop: moderateVerticalScale(-3),
  },
  resultTextStyle: {
    fontWeight: '400',
    fontSize: scale(13),
    color: Colors.blackOpacity75,
    marginHorizontal: moderateScale(12.5),
  },
  rightImgStyle: {
    width: moderateScale(15),
    height: moderateVerticalScale(15),
    borderRadius: moderateScale(360),
  },
  rightBtnStyle: {
    alignItems: 'center',
    width: moderateScale(30),
    height: moderateVerticalScale(30),
    borderRadius: moderateScale(360),
    marginRight: moderateScale(-2.5),
  },
  addCoverImgStyle: {
    marginStart: moderateScale(15),
    justifyContent: 'center',
    width: moderateScale(120),
    height: moderateVerticalScale(40),
  },
  addMoreImgStyle: {
    marginStart: moderateScale(15),
    marginBottom: moderateScale(-40),
    justifyContent: 'center',
    width: moderateScale(120),
    height: moderateVerticalScale(40),
  },
  deleteBtnStyle: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(40),
    height: moderateVerticalScale(40),
    borderRadius: moderateScale(360),
  },
  deleteImgStyle: {
    width: moderateScale(20),
    height: moderateVerticalScale(20),
    tintColor: Colors.theme,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoStyles: {
    alignSelf: 'center',
    width: moderateScale(220),
    height: moderateVerticalScale(70),
    marginTop: moderateVerticalScale(85),
  },
  loginSignupViewStyles: {
    marginTop: moderateVerticalScale(-20),
    marginHorizontal: moderateScale(20),
  },
  loginLabelStyle: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: scale(15),
  },
  loginBtnStyle: {
    width: '100%',
    height: moderateVerticalScale(45),
    backgroundColor: Colors.theme,
    justifyContent: 'center',
    marginTop: moderateVerticalScale(20),
    shadowColor:
      Platform.OS === 'ios' ? Colors.blackOpacity25 : Colors.darkBlack,
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 1,
    elevation: 10,
  },
  balanceViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(25),
    marginTop: moderateVerticalScale(50),
    marginBottom: moderateVerticalScale(30),
  },
  availBalanceTextStyle: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: scale(14),
  },
  balanceTextStyle: {
    color: Colors.theme,
    fontWeight: '500',
    fontSize: scale(14),
  },
});

export default styles;
