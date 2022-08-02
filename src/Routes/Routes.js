import React, { useState, useEffect } from 'react';

import { useSelector, shallowEqual } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { SplashScreen } from '../Screens';
import { AsyncStrings } from '../Constants';
import { getStorage } from '../Helpers/Storage';

const Routes = () => {
  const { authentication } = useSelector(
    (state) => ({
      authentication: state?.authReducer?.accessToken,
    }),
    shallowEqual,
  );

  const [isLoading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState('');

  getStorage(AsyncStrings.USER_ACCESS_TOKEN)
    .then((accessToken) => {
      setAuthToken(accessToken);
    })
    .catch((error) =>
      console.error(`error with ${AsyncStrings.USER_ACCESS_TOKEN}`, error),
    );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const check = (isSignedIn) => {
    return isSignedIn?.length > 10 ? <MainStack /> : <AuthStack />;
  };

  if (isLoading) {
    return <SplashScreen />;
  } else {
    return (
      <NavigationContainer>
        {check(authToken?.length > 10 ? authToken : authentication)}
      </NavigationContainer>
    );
  }
};

export default Routes;
