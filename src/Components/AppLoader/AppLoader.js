import React, { useEffect, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';

import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';

import { ActionTypes, ImagePaths } from '../../Constants';
import Colors from '../../Styles/Colors';

const AppLoader = ({ visible }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {visible ? (
        <View style={styles.container}>
          <LottieView
            style={styles.loaderStyle}
            source={ImagePaths.ANIM_LOADER}
            loop
            autoPlay
          />
        </View>
      ) : null}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackOpacity50,
    zIndex: 1,
  },
  loaderStyle: {
    width: '25%',
    height: '25%',
    aspectRatio: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default AppLoader;
