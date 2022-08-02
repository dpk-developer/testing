const STAGE_URL = 'http://indodevserver.com/wedbee/api';
const PRODUCTION_URL = 'https://www.wedbeeindia.com/api';

export default {
  /*** Define Staging / Production Base Url Below Here ***/
  BASE_URL: PRODUCTION_URL,

  /*** Define All End Points Url Below Here ***/
  ADD_TO_WALLET_URL: 'VendorWalletRecharge',
  SEND_PAYMENT_RESPONSE_URL: 'PaymentResponse',

  LOGIN_URL: 'VendorLoginOTPAPI',
  LOGIN_OTP_VERIFY_URL: 'VendorLoginOTPVerifyAPI',
  CUSTOMER_SUPPORT_URL: 'ContactRequest',
  FEEDBACK_URL: 'Feedback',
  GET_VENDOR_LIST_URL: 'GetVendorListingAPI',
  VENDOR_DETAILS_URL: 'GetVendorDetailsAPI',
  GET_FAQ_URL: 'GetFaqAPI',
  UPLOAD_VENDOR_FILE_URL: 'VendorFile',
  GET_VENDOR_GALLERY_URL: 'GetVendorGalleryAPI',
  POST_VENDOR_GALLERY_URL: 'AddVendorGalleryAPI',
  DELETE_VENDOR_GALLERY_URL: 'DeleteVendorGalleryAPI',
  GET_VENDOR_VIDEO_URL: 'GetVendorVideoAPI',
  ADD_VENDOR_VIDEO_URL: 'AddVendorVideoAPI',
  DELETE_VENDOR_VIDEO_URL: 'DeleteVendorVideoAPI',
  GET_VENDOR_ALBUM_URL: 'GetVendorAlbumAPI',
  ADD_VENDOR_ALBUM_URL: 'AddVendorAlbumAPI',
  DELETE_VENDOR_ALBUM_URL: 'DeleteVendorAlbumAPI',
  DELETE_VENDOR_ALBUM_IMAGE_URL: 'DeleteVendorAlbumImageAPI',
  GET_VENDOR_PRICE_URL: 'GetVendorPriceAPI',
  ADD_VENDOR_PRICE_URL: 'AddVendorPriceAPI',
  DELETE_VENDOR_PRICE_URL: 'DeleteVendorPriceAPI',
  GET_VENDOR_MORE_INFO_URL: 'GetVendorOtherInfoAPI',
  ADD_VENDOR_MORE_INFO_URL: 'AddVendorOtherInfoAPI',
  DELETE_VENDOR_MORE_INFO_URL: 'DeleteVendorOtherInfoAPI',
  GET_VENDOR_FAQ_URL: 'GetVendorFaqAPI',
  ADD_VENDOR_FAQ_URL: 'AddVendorFaqAPI',
  DELETE_VENDOR_FAQ_URL: 'DeleteVendorFaqAPI',
  GET_VENDOR_OFFERS_URL: 'GetVendorOfferAPI',
  ADD_VENDOR_OFFERS_URL: 'AddVendorOfferAPI',
  DELETE_VENDOR_OFFERS_URL: 'DeleteVendorOfferAPI',
  DELETE_VENDOR_OFFERS_IMAGE_URL: 'DeleteVendorOfferImageAPI',

  /*** Define All WebView End Points Url Below Here ***/
  ABOUT_US_WEBVIEW_URL: 'https://www.wedbeeindia.com/about-us',
  PRIVACY_WEBVIEW_URL: 'https://www.wedbeeindia.com/privacy',
};
