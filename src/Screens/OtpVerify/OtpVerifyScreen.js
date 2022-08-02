import React, { useState, useRef } from 'react';
import { View, Text, Image, Keyboard } from 'react-native';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  AppHeader,
  AppLoader,
  ButtonWithIcon,
  TextInputWithIcon,
} from '../../Components';
import { ActionTypes, ImagePaths } from '../../Constants';
import { LoginSuccessScreen } from '../';

import styles from './Styles';

const OtpVerifyScreen = ({ navigation, route }) => {
  let phoneNumber = route?.params?.phoneNumber;

  const dispatch = useDispatch();

  let { appLoader, otpVerifySuccess } = useSelector(
    (state) => ({
      appLoader: state?.commonReducer?.appLoader,
      otpVerifySuccess: state?.authReducer?.loginOtpVerifySuccess,
    }),
    shallowEqual,
  );

  const inputsRef = useRef([]);

  const [active, setActive] = useState(0);

  const [otp, setOtp] = useState({
    pushOtp: [],
    value: '',
    isEnabled: true,
  });

  const onKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Backspace') {
      if (active !== 0) {
        otp.pushOtp.pop();
        inputsRef.current[active - 1]?.focus();
        return setActive(active - 1);
      }
    } else {
      inputsRef.current[active + 1]?.focus();
      return setActive(active + 1);
    }
    return null;
  };

  if (otpVerifySuccess?.Status === 1) {
    return (
      <LoginSuccessScreen
        navigation={navigation}
        accessToken={otpVerifySuccess?.VendorDetails?.AccessToken}
      />
    );
  } else {
    return (
      <KeyboardAwareScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.container}>
          <AppLoader visible={appLoader} />
          <View style={styles.headerStyle}>
            <AppHeader
              navigation={navigation}
              leftImg={ImagePaths.IC_CROSS}
              leftImgStyle={styles.leftImgStyle}
              headerTitle={'Verification'}
              mainContainerStyle={styles.mainContainerStyle}
            />
          </View>

          <Image
            source={ImagePaths.IC_EMAIL_WITH_STARS}
            style={styles.emailWithStarStyle}
          />

          <Text style={styles.otpSentStyle}>
            OTP has been sent to you on your {'\n'} mobile number{' '}
            <Text style={styles.textMsgStyle}>+91 {phoneNumber}</Text>
          </Text>

          <ButtonWithIcon
            label={'Change Number'}
            labelStyle={styles.changeNumberStyle}
          />

          <Text style={styles.enterOtpStyle}>Enter Otp Code Here</Text>

          <View style={styles.inputRowStyle}>
            <TextInputWithIcon
              inputRef={(r) => {
                inputsRef.current[0] = r;
              }}
              maxLength={1}
              autoFocus={active === 0}
              onKeyPress={onKeyPress}
              keyboardType="number-pad"
              inputStyle={styles.inputStyle}
              onChangeText={(text) => {
                otp.pushOtp.push(text);
                setOtp({ ...otp });
              }}
            />
            <TextInputWithIcon
              inputRef={(r) => {
                inputsRef.current[1] = r;
              }}
              maxLength={1}
              autoFocus={active === 1}
              keyboardType="number-pad"
              onKeyPress={onKeyPress}
              inputStyle={styles.inputStyle}
              onChangeText={(text) => {
                otp.pushOtp.push(text);
                setOtp({ ...otp });
              }}
            />
            <TextInputWithIcon
              inputRef={(r) => {
                inputsRef.current[2] = r;
              }}
              maxLength={1}
              autoFocus={active === 2}
              keyboardType="number-pad"
              onKeyPress={onKeyPress}
              inputStyle={styles.inputStyle}
              onChangeText={(text) => {
                otp.pushOtp.push(text);
                setOtp({ ...otp });
              }}
            />
            <TextInputWithIcon
              inputRef={(r) => {
                inputsRef.current[3] = r;
              }}
              maxLength={1}
              autoFocus={active === 3}
              keyboardType="number-pad"
              onKeyPress={onKeyPress}
              inputStyle={styles.inputStyle}
              onChangeText={(text) => {
                otp.pushOtp.push(text);

                otp.value = otp?.pushOtp?.reduce((item, total) => item + total);

                if (otp.value?.length === 4) {
                  otp.isEnabled = false;
                  Keyboard.dismiss();
                } else {
                  otp.isEnabled = true;
                }
                setOtp({ ...otp });
              }}
            />
          </View>

          <ButtonWithIcon
            label={'SUBMIT'}
            labelStyle={styles.labelStyle}
            buttonStyle={
              otp.isEnabled ? styles.disableStyle : styles.buttonStyle
            }
            disabled={otp.isEnabled}
            onPress={() => {
              dispatch({
                type: ActionTypes.LOGIN_OTP_VERIFY,
                payload: { Phone: phoneNumber, OTP: otp.value },
              });
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
};

export default OtpVerifyScreen;
