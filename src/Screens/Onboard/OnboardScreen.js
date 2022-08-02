import React from 'react';
import { View, ImageBackground, ScrollView } from 'react-native';

import { ButtonWithIcon } from '../../Components';
import { ImagePaths, NavigationStrings } from '../../Constants';
import Colors from '../../Styles/Colors';

import styles from './Styles';

const OnboardScreen = ({ navigation }) => (
  <ScrollView style={styles.container}>
    <ButtonWithIcon
      label={'X'}
      labelStyle={styles.crossSignStyle}
      buttonStyle={styles.crossStyle}
      onPress={() => {}}
    />

    <ImageBackground
      source={ImagePaths.IC_APP}
      resizeMode="contain"
      style={styles.logoStyles}
    />

    <View style={styles.loginSignupViewStyles}>
      <ButtonWithIcon
        label={'LOGIN'}
        labelStyle={styles.loginLabelStyle}
        buttonStyle={styles.loginBtnStyle}
        materialLeftIcon={{
          name: 'keyboard-backspace',
          size: 30,
          color: Colors.black,
          style: styles.materialLeftIconStyle,
        }}
        onPress={() => {
          navigation.navigate(NavigationStrings.LOGIN_SCREEN);
        }}
      />
    </View>
  </ScrollView>
);

export default OnboardScreen;
