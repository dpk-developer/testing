import React, { useEffect } from 'react';
import { View, ImageBackground, Text } from 'react-native';

import { useDispatch } from 'react-redux';
import { storeStorage } from '../../Helpers/Storage';

import { ActionTypes, AsyncStrings, ImagePaths } from '../../Constants';

import styles from './Styles';

const LoginSuccessScreen = ({ accessToken }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    storeStorage(AsyncStrings.USER_ACCESS_TOKEN, accessToken);

    setTimeout(() => {
      dispatch({
        type: ActionTypes.USER_TOKEN,
        payload: accessToken,
      });
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.loginSuccessContainer}>
      <ImageBackground
        source={ImagePaths.IC_LOGIN_SUCCESS}
        resizeMode="contain"
        style={styles.loginSuccessLogo}
      />

      <Text style={styles.successText}>Login Successfully</Text>
      <Text style={styles.welcomeText}>Welcome To WedBee</Text>
    </View>
  );
};

export default LoginSuccessScreen;
