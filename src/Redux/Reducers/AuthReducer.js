import { ActionTypes, AsyncStrings } from '../../Constants';
import { storeStorage } from '../../Helpers/Storage';

const initialState = {
  accessToken: '',
  loginSuccess: {},
  loginOtpVerifySuccess: {},
};

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_TOKEN: {
      return { ...state, accessToken: payload };
    }

    case ActionTypes.LOGIN_SUCCESS: {
      return { ...state, loginSuccess: payload };
    }

    case ActionTypes.LOGIN_OTP_VERIFY_SUCCESS: {
      storeStorage(
        AsyncStrings.USER_DETAILS,
        JSON.stringify(payload?.VendorDetails),
      );

      storeStorage(
        AsyncStrings.USER_ACCESS_TOKEN,
        payload?.VendorDetails?.AccessToken,
      );

      storeStorage(
        AsyncStrings.USER_ID,
        payload?.VendorDetails?.VendorID.toString(),
      );

      return { ...state, loginOtpVerifySuccess: payload };
    }

    default:
      return state;
  }
};

export default AuthReducer;
