import React, { Fragment } from 'react';
import { View, ImageBackground } from 'react-native';

import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  AppHeader,
  AppLoader,
  ButtonWithIcon,
  TextInputWithIcon,
} from '../../Components';
import { ActionTypes, ImagePaths } from '../../Constants';
import Colors from '../../Styles/Colors';

import styles from './Styles';

const LoginScreen = ({ navigation }) => {
  let phoneNumber;
  let dispatch = useDispatch();

  let { appLoader } = useSelector(
    (state) => ({
      appLoader: state?.commonReducer?.appLoader,
    }),
    shallowEqual,
  );

  return (
    <Fragment>
      <KeyboardAwareScrollView style={styles.container}>
        <AppHeader navigation={navigation} leftImg={ImagePaths.IC_BACK_TWO} />

        <View>
          <ImageBackground
            source={ImagePaths.IC_APP}
            resizeMode="contain"
            style={styles.logo}
          />

          <TextInputWithIcon
            icon={'phone'}
            placeholder={'Mobile Number'}
            placeholderTextColor={Colors.blackOpacity50}
            maxLength={10}
            keyboardType="phone-pad"
            onChangeText={(text) => (phoneNumber = text)}
          />

          <ButtonWithIcon
            label={'SEND OTP'}
            labelStyle={styles.labelStyle}
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              if (phoneNumber?.length === 10) {
                dispatch({
                  type: ActionTypes.LOGIN,
                  navigation: navigation,
                  payload: { Phone: phoneNumber }, // Object of Payload with key name Phone is Request Paramater of LOGIN API...
                });
              } else {
                showMessage({
                  message: 'Please Enter Mobile Number',
                  color: Colors.black,
                  backgroundColor: Colors.theme,
                });
              }
            }}
          />
        </View>
      </KeyboardAwareScrollView>
      <AppLoader visible={appLoader} />
    </Fragment>
  );
};

export default LoginScreen;
