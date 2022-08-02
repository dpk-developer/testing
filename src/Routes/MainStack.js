import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  OfferScreen,
  WalletScreen,
  WebViewScreen,
  VideoViewMoreScreen,
  VendorViewMoreScreen,
  CustomerSupportScreen,
  DashboardDetailScreen,
} from '../Screens';

import { NavigationStrings } from '../Constants';
import DrawerStack from './DrawerStack';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigationStrings.DASHBOARD_SCREEN}
      screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}>
      <Stack.Screen
        name={NavigationStrings.DASHBOARD_SCREEN}
        component={DrawerStack}
      />
      <Stack.Screen
        name={NavigationStrings.DASHBOARD_DETAIL_SCREEN}
        component={DashboardDetailScreen}
      />
      <Stack.Screen
        name={NavigationStrings.WEBVIEW_SCREEN}
        component={WebViewScreen}
      />
      <Stack.Screen
        name={NavigationStrings.CUSTOMER_SUPPORT_SCREEN}
        component={CustomerSupportScreen}
      />
      <Stack.Screen
        name={NavigationStrings.VENDOR_VIEW_MORE_SCREEN}
        component={VendorViewMoreScreen}
      />
      <Stack.Screen
        name={NavigationStrings.VIDEO_VIEW_MORE_SCREEN}
        component={VideoViewMoreScreen}
      />
      <Stack.Screen
        name={NavigationStrings.OFFERS_SCREEN}
        component={OfferScreen}
      />
      <Stack.Screen
        name={NavigationStrings.WALLET_SCREEN}
        component={WalletScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
