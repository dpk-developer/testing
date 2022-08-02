import { StyleSheet } from 'react-native';

import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: moderateScale(276),
    height: moderateVerticalScale(88),
  },
});

export default styles;
