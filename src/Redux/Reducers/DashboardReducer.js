import { ActionTypes } from '../../Constants';

const initialState = {
  customerSupportSuccess: {},
  feedbackSuccess: {},
  venderListSuccess: [],
  venderDetailSuccess: [],
  faqSuccess: [],
  galleryList: [],
  videoList: [],
  albumList: [],
  priceList: [],
  offerList: [],
  faqList: [],
  otherInfoList: [],
  addVideoSuccess: 0,
  deleteVideoSuccess: 0,
  addMoreInfo: 0,
  deleteMoreInfo: 0,
  addFaq: 0,
  deleteFaq: 0,
  addOffers: 0,
  deleteOffers: 0,
  walletSuccess: {},
  paymentResponse:{},
};

const DashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_TO_WALLET_SUCCESS: {
      return { ...state, walletSuccess: payload };
    }

    case ActionTypes.CUSTOMER_SUPPORT_SUCCESS: {
      return { ...state, customerSupportSuccess: payload };
    }

    case ActionTypes.FEEDBACK_SUCCESS: {
      return { ...state, feedbackSuccess: payload };
    }

    case ActionTypes.GET_VENDOR_LIST_SUCCESS: {
      return { ...state, venderListSuccess: payload?.VendorList };
    }

    case ActionTypes.VENDOR_DETAILS_SUCCESS: {
      return { ...state, venderDetailSuccess: payload?.VendorData };
    }

    case ActionTypes.GET_FAQ_SUCCESS: {
      return { ...state, faqSuccess: payload?.FaqData };
    }

    case ActionTypes.GET_VENDOR_GALLERY_SUCCESS: {
      return { ...state, galleryList: payload?.GalleryList };
    }

    case ActionTypes.GET_VENDOR_VIDEO_SUCCESS: {
      return { ...state, videoList: payload?.VideoList };
    }

    case ActionTypes.ADD_VENDOR_VIDEO_SUCCESS: {
      return { ...state, addVideoSuccess: payload?.Status };
    }

    case ActionTypes.DELETE_VENDOR_VIDEO_SUCCESS: {
      return { ...state, deleteVideoSuccess: payload?.Status };
    }

    case ActionTypes.GET_VENDOR_ALBUM_SUCCESS: {
      return { ...state, albumList: payload?.AlbumList };
    }

    case ActionTypes.GET_VENDOR_PRICE_SUCCESS: {
      return { ...state, priceList: payload?.PriceList };
    }

    case ActionTypes.GET_VENDOR_MORE_INFO_SUCCESS: {
      return { ...state, otherInfoList: payload?.OtherInfoList };
    }

    case ActionTypes.ADD_VENDOR_MORE_INFO_SUCCESS: {
      return { ...state, addMoreInfo: payload?.Status };
    }

    case ActionTypes.DELETE_VENDOR_MORE_INFO_SUCCESS: {
      return { ...state, deleteMoreInfo: payload?.Status };
    }

    case ActionTypes.GET_VENDOR_FAQ_SUCCESS: {
      return { ...state, faqList: payload?.FaqList };
    }

    case ActionTypes.ADD_VENDOR_FAQ_SUCCESS: {
      return { ...state, addFaq: payload?.Status };
    }

    case ActionTypes.DELETE_VENDOR_FAQ_SUCCESS: {
      return { ...state, deleteFaq: payload?.Status };
    }

    case ActionTypes.GET_VENDOR_OFFERS_SUCCESS: {
      return { ...state, offerList: payload?.OfferList };
    }

    case ActionTypes.ADD_VENDOR_OFFERS_SUCCESS: {
      return { ...state, addOffers: payload?.Status };
    }

    case ActionTypes.DELETE_VENDOR_OFFERS_SUCCESS: {
      return { ...state, deleteOffers: payload?.Status };
    }

    case ActionTypes.SEND_PAYMENT_RESPONSE_SUCCESS: {
      return { ...state, paymentResponse: payload?.Status };
    }


    

    default:
      return state;
  }
};

export default DashboardReducer;
