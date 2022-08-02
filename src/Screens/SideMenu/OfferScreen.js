import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import DocumentPicker, { types } from 'react-native-document-picker';

import {
  ButtonWithIcon,
  AppLoader,
  DataNotFound,
  AppHeader,
} from '../../Components';
import { ActionTypes, AsyncStrings, ImagePaths } from '../../Constants';
import { getStorage } from '../../Helpers/Storage';
import Colors from '../../Styles/Colors';

import styles from './Styles';
import { showMessage } from 'react-native-flash-message';

const inputTheme = {
  colors: {
    text: Colors.darkBlack,
  },
  roundness: 0,
};

const CustomerSupportScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { appLoader, offerList, accessToken } = useSelector(
    (state) => ({
      appLoader: state?.commonReducer?.appLoader,
      accessToken: state?.authReducer?.accessToken,
      offerList: state?.dashboardReducer?.offerList,
    }),
    shallowEqual,
  );

  const [render, setRender] = useState(false);

  const [customerData, setCustomerData] = useState({
    title: '',
    price: '',
    validity: '',
    description: '',
    titleError: false,
    priceError: false,
    validityError: false,
    descError: false,
    visible: false,
    vendorId: 0,
    coverPic: 0,
    morePic: 0,
    accessToken: '',
  });

  useEffect(() => {
    getStorage(AsyncStrings.USER_DETAILS)
      .then((response) => {
        let result = JSON.parse(response);

        dispatch({
          type: ActionTypes.GET_VENDOR_OFFERS,
          payload: {
            authorization: accessToken,
            VendorID: result?.VendorID,
          },
        });

        customerData.vendorId = result?.VendorID?.toString();
        customerData.accessToken = result?.AccessToken?.toString();
        setCustomerData({ ...customerData });
      })
      .catch((error) =>
        console.error(`error with ${AsyncStrings.USER_DETAILS}`, error),
      );

    return () => setCustomerData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const onSubmit = async () => {
    if (customerData.title?.length < 3) {
      customerData.titleError = true;
      setCustomerData({ ...customerData });
      return;
    }

    if (customerData.price?.length < 3) {
      customerData.priceError = true;
      setCustomerData({ ...customerData });
      return;
    }

    if (customerData.validity?.length < 3) {
      customerData.validityError = true;
      setCustomerData({ ...customerData });
      return;
    }

    if (customerData.description?.length <= 9) {
      customerData.descError = true;
      setCustomerData({ ...customerData });
      return;
    }

    if (!customerData.coverPic?.length) {
      showMessage({
        message: 'Please Add Cover Images...',
        color: Colors.black,
        backgroundColor: Colors.theme,
      });
      return;
    }

    if (!customerData.morePic?.length) {
      showMessage({
        message: 'Please Add More Images...',
        color: Colors.black,
        backgroundColor: Colors.theme,
      });
      return;
    }

    let formData = new FormData();

    customerData.morePic?.map((item, index) => {
      formData.append('VendorID', customerData.vendorId);
      formData.append('OfferTitle', customerData.title);
      formData.append('OfferDesc', customerData.description);
      formData.append('OfferPrice', customerData.price);
      formData.append('OfferValidity', customerData.validity);
      formData.append('CoverImage', {
        uri: customerData.coverPic[0]?.uri,
        name: customerData.coverPic[0]?.name,
        type: customerData.coverPic[0]?.type,
      });
      formData.append('Images[]', {
        uri: item?.uri,
        name: item?.name,
        type: item?.type,
      });
    });

    let url = 'https://www.wedbeeindia.com/api/AddVendorOfferAPI';

    let headers = {
      'Content-type': 'multipart/form-data',
      Authorization: customerData.accessToken,
    };

    await axios
      .post(url, formData, {
        headers: headers,
      })
      .then((response) => {
        if (response?.data?.Status === 1) {
          setCustomerData({ visible: false });
          setTimeout(() => {
            setRender(!render);
          }, 1000);
        }
      })
      .catch((err) => {
        showMessage({
          message: err?.toString(),
          color: Colors.black,
          backgroundColor: Colors.theme,
        });
      });
  };

  const chooseFile = async (numOfFile) => {
    try {
      let file = await DocumentPicker?.[numOfFile]({
        type: [types.images],
      });

      if (numOfFile === 'pick') {
        customerData.coverPic = file;
        setCustomerData({ ...customerData });
      }

      if (numOfFile === 'pickMultiple') {
        customerData.morePic = file;
        setCustomerData({ ...customerData });
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker, exit any dialogs or menus and move on...
      } else {
        throw error;
      }
    }
  };

  const deleteOffer = (offerId) => {
    dispatch({
      type: ActionTypes.DELETE_VENDOR_OFFERS,
      payload: {
        authorization: accessToken,
        VendorID: customerData.vendorId,
        OfferID: offerId,
      },
    });

    setTimeout(() => {
      setRender(!render);
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <View style={styles.deatilCategoryCardStyle}>
      <ImageBackground
        source={{
          uri: item?.OfferImage[0]?.ImageUrl,
        }}
        style={styles.detailCategoryImgtyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.deleteBtnStyle}
          onPress={() => deleteOffer(item?.OfferID)}>
          <Image source={ImagePaths.IC_DELETE} style={styles.deleteImgStyle} />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.detailCategoryDescStyle}>
        <Text style={styles.categoryTextStyle}>{item?.OfferTitle}</Text>
      </View>

      <View style={styles.detailCategoryDescThreeStyle}>
        <Text style={styles.locationTextStyle}>Rs. {item?.OfferPrice}</Text>
        <Text style={styles.resultTextStyle}>{item?.OfferValidity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.detailContainer}>
      <AppLoader visible={appLoader} />

      <DataNotFound visible={!offerList?.length} />

      <AppHeader
        navigation={navigation}
        leftImg={ImagePaths.IC_BACK}
        leftTitle={'Offers'}
        rightImg={ImagePaths.IC_ADD}
        rightImgStyle={styles.rightImgStyle}
        rightBtnStyle={styles.rightBtnStyle}
        onPress={() => {
          customerData.visible = !customerData.visible;
          setCustomerData({ ...customerData });
        }}
      />

      <FlatList
        data={offerList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        isVisible={customerData.visible}
        animationInTiming={700}
        animationOutTiming={1000}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onBackButtonPress={() => navigation.goBack()}>
        <View style={styles.customerContainerStyle}>
          <View style={styles.highlightStyle} />
          <TextInput
            maxLength={20}
            label={'Title'}
            theme={inputTheme}
            error={customerData.titleError}
            style={styles.inputStyle}
            underlineColor={Colors.blackOpacity25}
            activeUnderlineColor={Colors.blackOpacity50}
            onChangeText={(text) => {
              customerData.title = text?.trim();
              if (customerData.title?.length > 2) {
                customerData.titleError = false;
              }
              setCustomerData({ ...customerData });
            }}
            value={customerData.title}
          />
          <TextInput
            maxLength={10}
            keyboardType={'number-pad'}
            label={'Price'}
            theme={inputTheme}
            error={customerData.priceError}
            style={styles.inputStyle}
            underlineColor={Colors.blackOpacity25}
            activeUnderlineColor={Colors.blackOpacity50}
            onChangeText={(text) => {
              customerData.price = text?.trim();
              if (customerData.price?.length > 2) {
                customerData.priceError = false;
              }
              setCustomerData({ ...customerData });
            }}
            value={customerData.price}
          />
          <TextInput
            label={'Validity (DD-MM-YY)'}
            maxLength={10}
            theme={inputTheme}
            keyboardType={'phone-pad'}
            style={styles.inputStyle}
            underlineColor={Colors.blackOpacity25}
            activeUnderlineColor={Colors.blackOpacity50}
            onChangeText={(text) => {
              customerData.validity = text?.trim();
              if (customerData.validity?.length === 10) {
                customerData.validityError = false;
              }
              setCustomerData({ ...customerData });
            }}
            value={customerData.validity}
          />
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={250}
            label={'Description'}
            theme={inputTheme}
            error={customerData.descError}
            style={styles.inputMsgStyle}
            underlineColor={Colors.blackOpacity25}
            activeUnderlineColor={Colors.blackOpacity50}
            right={
              <TextInput.Affix
                text={`${customerData?.description?.length}/250`}
              />
            }
            onChangeText={(text) => {
              customerData.description = text;
              if (customerData.description?.length >= 10) {
                customerData.descError = false;
              }
              setCustomerData({ ...customerData });
            }}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.addCoverImgStyle}
            onPress={() => chooseFile('pick')}>
            <Text style={styles.labelStyle}>
              {customerData.coverPic
                ? `${customerData.coverPic?.length} Image Added`
                : '+ Add Cover Image'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.addMoreImgStyle}
            onPress={() => chooseFile('pickMultiple')}>
            <Text style={styles.labelStyle}>
              {customerData.morePic
                ? `${customerData.morePic?.length} Image Added`
                : '+ Add More Image'}
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonMenuStyle}>
            <ButtonWithIcon
              label={'CANCEL'}
              labelStyle={styles.labelStyle}
              buttonStyle={styles.cancelBtnStyle}
              onPress={() => {
                customerData.visible = !customerData.visible;
                setCustomerData({ ...customerData });
              }}
            />
            <ButtonWithIcon
              label={'SUBMIT'}
              labelStyle={styles.labelStyle}
              buttonStyle={styles.submitBtnStyle}
              onPress={onSubmit}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomerSupportScreen;
