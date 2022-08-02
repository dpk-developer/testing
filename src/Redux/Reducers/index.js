import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import CommonReducer from './CommonReducer';
import DashboardReducer from './DashboardReducer';

import { ActionTypes } from '../../Constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

const appReducer = combineReducers({
  authReducer: AuthReducer,
  commonReducer: CommonReducer,
  dashboardReducer: DashboardReducer,
});

const rootReducer = (state, action) => {
  if (action.type === ActionTypes.RESET_APP) {
    AsyncStorage.clear();

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
