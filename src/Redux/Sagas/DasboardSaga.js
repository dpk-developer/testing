import { takeLatest, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import { ActionTypes, ApiEndPoints } from '../../Constants';
import HttpService from '../../Services/HttpService';
import Colors from '../../Styles/Colors';

const httpService = new HttpService();

function* customerSupport({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.CUSTOMER_SUPPORT_URL,
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
        color: Colors.black,
        backgroundColor: Colors.theme,
      });
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.CUSTOMER_SUPPORT_SUCCESS,
      payload: { Msg, Status },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* feedback({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.FEEDBACK_URL,
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
        color: Colors.black,
        backgroundColor: Colors.theme,
      });
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.FEEDBACK_SUCCESS,
      payload: { Msg, Status },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* getVendorList({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status, VendorList } = yield httpService.post(
      ApiEndPoints.GET_VENDOR_LIST_URL,
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
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.GET_VENDOR_LIST_SUCCESS,
      payload: { Msg, Status, VendorList },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* vendorDetails({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status, VendorData } = yield httpService.post(
      ApiEndPoints.VENDOR_DETAILS_URL,
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
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.VENDOR_DETAILS_SUCCESS,
      payload: { Msg, Status, VendorData },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* getFAQ({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status, FaqData } = yield httpService.post(
      ApiEndPoints.GET_FAQ_URL,
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
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.GET_FAQ_SUCCESS,
      payload: { Msg, Status, FaqData },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* getVendorGallery({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status, GalleryList } = yield httpService.post(
      ApiEndPoints.GET_VENDOR_GALLERY_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.GET_VENDOR_GALLERY_SUCCESS,
      payload: { Msg, Status, GalleryList },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* deleteVendorGallery({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.DELETE_VENDOR_GALLERY_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* getVendorVideo({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status, VideoList } = yield httpService.post(
      ApiEndPoints.GET_VENDOR_VIDEO_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.GET_VENDOR_VIDEO_SUCCESS,
      payload: { Msg, Status, VideoList },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* addVendorVideo({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.ADD_VENDOR_VIDEO_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.ADD_VENDOR_VIDEO_SUCCESS,
      payload: { Status },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* deleteVendorVideo({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.DELETE_VENDOR_VIDEO_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.DELETE_VENDOR_VIDEO_SUCCESS,
      payload: { Status },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* getVendorAlbum({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status, AlbumList } = yield httpService.post(
      ApiEndPoints.GET_VENDOR_ALBUM_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.GET_VENDOR_ALBUM_SUCCESS,
      payload: { Msg, Status, AlbumList },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* addVendorAlbum({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.ADD_VENDOR_ALBUM_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* deleteVendorAlbum({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.DELETE_VENDOR_ALBUM_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* deleteVendorAlbumImage({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.DELETE_VENDOR_ALBUM_IMAGE_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* getVendorPrice({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status, PriceList } = yield httpService.post(
      ApiEndPoints.GET_VENDOR_PRICE_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.GET_VENDOR_PRICE_SUCCESS,
      payload: { Msg, Status, PriceList },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* addVendorPrice({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.ADD_VENDOR_PRICE_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* deleteVendorPrice({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.DELETE_VENDOR_PRICE_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* getVendorMoreInfo({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status, OtherInfoList } = yield httpService.post(
      ApiEndPoints.GET_VENDOR_MORE_INFO_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.GET_VENDOR_MORE_INFO_SUCCESS,
      payload: { Msg, Status, OtherInfoList },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* addVendorMoreInfo({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.ADD_VENDOR_MORE_INFO_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.ADD_VENDOR_MORE_INFO_SUCCESS,
      payload: { Status },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* deleteVendorMoreInfo({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.DELETE_VENDOR_MORE_INFO_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.DELETE_VENDOR_MORE_INFO_SUCCESS,
      payload: { Status },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* getVendorFaq({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status, FaqList } = yield httpService.post(
      ApiEndPoints.GET_VENDOR_FAQ_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.GET_VENDOR_FAQ_SUCCESS,
      payload: { Msg, Status, FaqList },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* addVendorFaq({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.ADD_VENDOR_FAQ_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.ADD_VENDOR_FAQ_SUCCESS,
      payload: { Status },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* deleteVendorFaq({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.DELETE_VENDOR_FAQ_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.DELETE_VENDOR_FAQ_SUCCESS,
      payload: { Status },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}
function* getVendorOffers({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status, OfferList } = yield httpService.post(
      ApiEndPoints.GET_VENDOR_OFFERS_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.GET_VENDOR_OFFERS_SUCCESS,
      payload: { Msg, Status, OfferList },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* addVendorOffers({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.ADD_VENDOR_OFFERS_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.ADD_VENDOR_OFFERS_SUCCESS,
      payload: { Status },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* deleteVendorOffers({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const { Msg, Status } = yield httpService.post(
      ApiEndPoints.DELETE_VENDOR_OFFERS_URL,
      payload,
    );

    if (Status === 0) {
      showMessage({
        message: Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    showMessage({
      message: Msg,
      color: Colors.black,
      backgroundColor: Colors.theme,
    });

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.DELETE_VENDOR_OFFERS_SUCCESS,
      payload: { Status },
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* addToWallet({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const response = yield httpService.post(
      ApiEndPoints.ADD_TO_WALLET_URL,
      payload,
    );

    if (response?.Status === 0) {
      showMessage({
        message: response?.Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.ADD_TO_WALLET_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

function* sendPaymentResponse({ type, payload }) {
  try {
    yield put({
      type: ActionTypes.APP_LOADER,
      payload: true,
    });

    const response = yield httpService.post(
      ApiEndPoints.SEND_PAYMENT_RESPONSE_URL,
      payload,
    );

    if (response?.Status === 0) {
      showMessage({
        message: response?.Msg,
        color: Colors.black,
        backgroundColor: Colors.theme,
      });

      return yield put({
        type: ActionTypes.APP_LOADER,
        payload: false,
      });
    }

    yield put({
      type: ActionTypes.APP_LOADER,
      payload: false,
    });

    yield put({
      type: ActionTypes.SEND_PAYMENT_RESPONSE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error(
      `Catch Error in DashboardSaga with ActionType ${type}`,
      error,
    );
  }
}

const DasboardSaga = function* () {
  yield takeLatest(ActionTypes.CUSTOMER_SUPPORT, customerSupport);
  yield takeLatest(ActionTypes.FEEDBACK, feedback);
  yield takeLatest(ActionTypes.GET_VENDOR_LIST, getVendorList);
  yield takeLatest(ActionTypes.VENDOR_DETAILS, vendorDetails);
  yield takeLatest(ActionTypes.GET_FAQ, getFAQ);
  yield takeLatest(ActionTypes.GET_VENDOR_GALLERY, getVendorGallery);
  yield takeLatest(ActionTypes.DELETE_VENDOR_GALLERY, deleteVendorGallery);
  yield takeLatest(ActionTypes.GET_VENDOR_VIDEO, getVendorVideo);
  yield takeLatest(ActionTypes.DELETE_VENDOR_VIDEO, deleteVendorVideo);
  yield takeLatest(ActionTypes.ADD_VENDOR_VIDEO, addVendorVideo);
  yield takeLatest(ActionTypes.GET_VENDOR_ALBUM, getVendorAlbum);
  yield takeLatest(ActionTypes.ADD_VENDOR_ALBUM, addVendorAlbum);
  yield takeLatest(ActionTypes.DELETE_VENDOR_ALBUM, deleteVendorAlbum);
  yield takeLatest(
    ActionTypes.DELETE_VENDOR_ALBUM_IMAGE,
    deleteVendorAlbumImage,
  );
  yield takeLatest(ActionTypes.GET_VENDOR_PRICE, getVendorPrice);
  yield takeLatest(ActionTypes.ADD_VENDOR_PRICE, addVendorPrice);
  yield takeLatest(ActionTypes.DELETE_VENDOR_PRICE, deleteVendorPrice);
  yield takeLatest(ActionTypes.GET_VENDOR_MORE_INFO, getVendorMoreInfo);
  yield takeLatest(ActionTypes.ADD_VENDOR_MORE_INFO, addVendorMoreInfo);
  yield takeLatest(ActionTypes.DELETE_VENDOR_MORE_INFO, deleteVendorMoreInfo);
  yield takeLatest(ActionTypes.GET_VENDOR_FAQ, getVendorFaq);
  yield takeLatest(ActionTypes.ADD_VENDOR_FAQ, addVendorFaq);
  yield takeLatest(ActionTypes.DELETE_VENDOR_FAQ, deleteVendorFaq);
  yield takeLatest(ActionTypes.GET_VENDOR_OFFERS, getVendorOffers);
  yield takeLatest(ActionTypes.ADD_VENDOR_OFFERS, addVendorOffers);
  yield takeLatest(ActionTypes.DELETE_VENDOR_OFFERS, deleteVendorOffers);
  yield takeLatest(ActionTypes.ADD_TO_WALLET, addToWallet);
  yield takeLatest(ActionTypes.SEND_PAYMENT_RESPONSE, sendPaymentResponse);

  
};

export default DasboardSaga;
