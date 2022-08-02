import ActionTypes from '../../Constants/ActionTypes';

const initialState = {
  snackBar: '',
  appLoader: false,
};

const CommonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SNACK_BAR: {
      return { ...state, snackBar: payload };
    }

    case ActionTypes.APP_LOADER: {
      return { ...state, appLoader: payload };
    }

    default:
      return state;
  }
};

export default CommonReducer;
