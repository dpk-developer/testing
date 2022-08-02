import 'react-native-gesture-handler';
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import store from './Redux/Store';
import Routes from './Routes/Routes';
import Colors from './Styles/Colors';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.theme} barStyle={'dark-content'} />
        <Routes />
        <FlashMessage
          position={'top'}
          animated
          floating={Platform.OS === 'ios' ? false : true}
          duration={3000}
        />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme,
  },
});

export default App;
