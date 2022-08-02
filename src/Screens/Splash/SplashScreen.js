import React from 'react';
import { View, ImageBackground } from 'react-native';

import { useDispatch } from 'react-redux';

import { getStorage } from '../../Helpers/Storage';

import { ImagePaths, AsyncStrings, ActionTypes } from '../../Constants';

import styles from './Styles';

const SplashScreen = () => {
  const dispatch = useDispatch();

  getStorage(AsyncStrings.USER_ACCESS_TOKEN)
    .then((accessToken) => {
      dispatch({
        type: ActionTypes.USER_TOKEN,
        payload: accessToken,
      });
    })
    .catch((error) =>
      console.error(`error with ${AsyncStrings.USER_ACCESS_TOKEN}`, error),
    );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImagePaths.IC_APP}
        resizeMode="contain"
        style={styles.logo}
      />
    </View>
  );
};

export default SplashScreen;
