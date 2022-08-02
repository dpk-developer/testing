import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboardScreen, LoginScreen, OtpVerifyScreen } from '../Screens';
import { NavigationStrings } from '../Constants';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigationStrings.ONBOARD_SCREEN}
      screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}>
      <Stack.Screen
        name={NavigationStrings.ONBOARD_SCREEN}
        component={OnboardScreen}
      />
      <Stack.Screen
        name={NavigationStrings.LOGIN_SCREEN}
        component={LoginScreen}
      />
      <Stack.Screen
        name={NavigationStrings.OTP_VERIFY_SCREEN}
        component={OtpVerifyScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
