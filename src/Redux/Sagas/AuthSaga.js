import { takeLatest, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import { ActionTypes, ApiEndPoints, NavigationStrings } from '../../Constants';
import HttpService from '../../Services/HttpService';
import Colors from '../../Styles/Colors';

const httpService = new HttpService();

function* loginUsers({ type, payload, navigation }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.LOGIN_URL,
      payload,
    );

    if (Status === 0) {
      yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });

      return showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });
    } else {
      showMessage({
        message: Msg,
        color: Colors.white,
        backgroundColor: Colors.snackBar,
      });

      yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    navigation.navigate(NavigationStrings.OTP_VERIFY_SCREEN, {
      phoneNumber: payload?.Phone,
    });
  } catch (error) {
    console.error(`Catch Error in AuthSaga with ActionType ${type}`, error);
  }
}

function* verifyOtpLoginUsers({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status, VendorDetails } = yield httpService.post(
      ApiEndPoints.LOGIN_OTP_VERIFY_URL,
      payload,
    );

    if (Status === 0) {
      yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });

      return showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.snackBar,
      });
    } else {
      showMessage({
        message: Msg,
        color: Colors.white,
        backgroundColor: Colors.snackBar,
      });
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.LOGIN_OTP_VERIFY_SUCCESS,
      payload: { Msg, Status, VendorDetails },
    });
  } catch (error) {
    console.error(`Catch Error in AuthSaga with ActionType ${type}`, error);
  }
}

const AuthSaga = function* () {
  yield takeLatest(ActionTypes.LOGIN, loginUsers);
  yield takeLatest(ActionTypes.LOGIN_OTP_VERIFY, verifyOtpLoginUsers);
};

export default AuthSaga;
