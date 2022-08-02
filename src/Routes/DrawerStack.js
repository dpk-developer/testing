import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { CustomDrawer } from '../Components';
import { DashboardScreen } from '../Screens';
import { NavigationStrings } from '../Constants';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Drawer.Navigator
      initialRouteName={NavigationStrings.DRAWER_STACK}
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={NavigationStrings.DRAWER_STACK}
        component={DashboardScreen}
      />
    </Drawer.Navigator>
  );
};

export default App;
