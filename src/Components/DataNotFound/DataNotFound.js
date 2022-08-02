import React, { Fragment } from 'react';
import { View, StyleSheet } from 'react-native';

import LottieView from 'lottie-react-native';

import { ImagePaths } from '../../Constants';
import { moderateVerticalScale } from 'react-native-size-matters';

const DataNotFound = ({ visible }) => {
  return (
    <Fragment>
      {visible ? (
        <View style={styles.container}>
          <LottieView source={ImagePaths.ANIM_DATA_NOT_FOUND} loop autoPlay />
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
    marginTop: moderateVerticalScale(50),
  },
});

export default DataNotFound;
