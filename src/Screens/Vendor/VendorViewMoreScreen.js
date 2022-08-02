import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';

import axios from 'axios';
import Modal2 from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import ImageViewer from 'react-native-image-zoom-viewer';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import DocumentPicker, { types } from 'react-native-document-picker';

import {
  AppHeader,
  AppLoader,
  ButtonWithIcon,
  DataNotFound,
} from '../../Components';
import { ImagePaths, ActionTypes, AsyncStrings } from '../../Constants';

import Colors from '../../Styles/Colors';
import { getStorage } from '../../Helpers/Storage';

import styles from './Styles';

const inputTheme = {
  colors: {
    text: Colors.darkBlack,
  },
  roundness: 0,
};

const VendorViewMoreScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { appLoader, accessToken, galleryList, albumList, priceList } =
    useSelector(
      (state) => ({
        appLoader: state?.commonReducer?.appLoader,
        accessToken: state?.authReducer?.accessToken,
        galleryList: state?.dashboardReducer?.galleryList,
        albumList: state?.dashboardReducer?.albumList,
        priceList: state?.dashboardReducer?.priceList,
      }),
      shallowEqual,
    );

  const [visible, setVisible] = useState(false);

  const [render, setRender] = useState(false);

  const [data, setData] = useState([]);
  const [dataIndex, setIndex] = useState(0);

  const [typeData, setTypeData] = useState([]);
  const [typeDataIndex, setTypeIndex] = useState(0);

  const [albumImgIndex, setAlbumImgIndex] = useState(0);
  const [vendorId, setVendorId] = useState(0);

  const [modalData, setModalData] = useState({
    visible: false,
    name: '',
    price: '',
    title: '',
    nameError: false,
    priceError: false,
    titleError: false,
  });

  useEffect(() => {
    getStorage(AsyncStrings.USER_DETAILS)
      .then((response) => {
        if (response) {
          let result = JSON.parse(response);

          if (route?.params?.title === 'Gallery') {
            dispatch({
              type: ActionTypes.GET_VENDOR_GALLERY,
              payload: {
                authorization: accessToken,
                VendorID: result?.VendorID,
              },
            });
          } else if (route?.params?.title === 'Album') {
            dispatch({
              type: ActionTypes.GET_VENDOR_ALBUM,
              payload: {
                authorization: accessToken,
                VendorID: result?.VendorID,
              },
            });
          } else if (route?.params?.title === 'Pricing') {
            dispatch({
              type: ActionTypes.GET_VENDOR_PRICE,
              payload: {
                authorization: accessToken,
                VendorID: result?.VendorID,
              },
            });
          }
          setVendorId(result?.VendorID?.toString());
        }
      })
      .catch((error) =>
        console.error(`error with ${AsyncStrings.USER_DETAILS}`, error),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  useEffect(() => {
    if (galleryList?.length) {
      setData([]);
      galleryList?.map((item, index) => {
        data.push({ url: item?.Image });
      });

      setData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galleryList]);

  useEffect(() => {
    return () => {
      dispatch({ type: ActionTypes.GET_VENDOR_ALBUM_SUCCESS, payload: [] });
      dispatch({ type: ActionTypes.GET_VENDOR_GALLERY_SUCCESS, payload: [] });
      dispatch({ type: ActionTypes.GET_VENDOR_PRICE_SUCCESS, payload: [] });

      setData([]);
      setTypeData([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item, index }) => {
    let key = route?.params?.title === 'Album' ? 'AlbumImage' : 'PriceImage';
    if (item?.[key]?.length) {
      return item?.[key]?.slice(0, 1)?.map((img, albumIndex) => (
        <TouchableOpacity
          key={img}
          activeOpacity={0.8}
          onPress={() => {
            item?.[key]?.map((albumItem, albumItemIndex) => {
              typeData.push({ url: albumItem?.ImageUrl });
            });
            setTypeData(typeData);
            setTypeIndex(albumIndex);
            setAlbumImgIndex(index);
            setVisible(true);
          }}>
          <View>
            {route?.params?.title === 'Pricing' ? (
              <View style={styles.galleryTextViewTwoStyle}>
                <Text style={styles.teamUserTextStyle}>
                  <Text style={styles.viewMoreTextStyle}>
                    {item?.PriceTitle}
                  </Text>
                </Text>
              </View>
            ) : null}
            <Image
              key={img}
              source={{ uri: img?.ImageUrl }}
              style={styles.galleryImgStyle}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.deleteBtnStyle}
              onPress={() => {
                if (route?.params?.title === 'Album') {
                  deleteAlbum(item?.AlbumID?.toString());
                }

                if (route?.params?.title === 'Pricing') {
                  deleteAlbum(item?.PriceID?.toString());
                }
              }}>
              <Image
                key={item}
                source={ImagePaths.IC_DELETE}
                style={styles.galleryDeleteImgStyle}
              />
            </TouchableOpacity>
            <View style={styles.galleryTextViewStyle}>
              <Text style={styles.teamUserTextStyle}>
                <Text style={styles.viewMoreTextStyle}>
                  {item?.AlbumName ? item?.AlbumName : 'Rs.' + item?.Price}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    } else {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setIndex(index);
            setVisible(true);
          }}>
          <View>
            <Image
              key={item}
              source={{ uri: item?.Image }}
              style={styles.galleryImgStyle}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.deleteBtnStyle}
              onPress={() => deleteGallery(item?.ImageID?.toString())}>
              <Image
                key={item}
                source={ImagePaths.IC_DELETE}
                style={styles.galleryDeleteImgStyle}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const deleteGallery = (id) => {
    dispatch({
      type: ActionTypes.DELETE_VENDOR_GALLERY,
      payload: {
        authorization: accessToken,
        VendorID: vendorId,
        ImageID: id,
      },
    });
    setData([]);
    dispatch({ type: ActionTypes.GET_VENDOR_GALLERY_SUCCESS, payload: [] });
    setRender(!render);
  };

  const deleteAlbum = (id) => {
    if (route?.params?.title === 'Album') {
      dispatch({
        type: ActionTypes.DELETE_VENDOR_ALBUM,
        payload: {
          authorization: accessToken,
          VendorID: vendorId,
          AlbumID: id,
        },
      });
      dispatch({ type: ActionTypes.GET_VENDOR_ALBUM_SUCCESS, payload: [] });
    }

    if (route?.params?.title === 'Pricing') {
      dispatch({
        type: ActionTypes.DELETE_VENDOR_PRICE,
        payload: {
          authorization: accessToken,
          VendorID: vendorId,
          PriceID: id,
        },
      });
      dispatch({ type: ActionTypes.GET_VENDOR_PRICE_SUCCESS, payload: [] });
    }
    setTypeData([]);
    setVisible(false);
    setRender(!render);
  };

  const deleteAlbumImage = (id, imageId) => {
    if (route?.params?.title === 'Album') {
      dispatch({
        type: ActionTypes.DELETE_VENDOR_ALBUM_IMAGE,
        payload: {
          authorization: accessToken,
          VendorID: vendorId,
          AlbumID: id,
          ImageID: imageId,
        },
      });
      dispatch({ type: ActionTypes.GET_VENDOR_ALBUM_SUCCESS, payload: [] });
    }

    if (route?.params?.title === 'Pricing') {
      dispatch({
        type: ActionTypes.DELETE_VENDOR_PRICE_IMAGE,
        payload: {
          authorization: accessToken,
          VendorID: vendorId,
          PriceID: id,
          ImageID: imageId,
        },
      });
      dispatch({ type: ActionTypes.GET_VENDOR_PRICE_SUCCESS, payload: [] });
    }

    setTypeData([]);
    setVisible(!visible);
    setRender(!render);
  };

  const chooseFile = async () => {
    try {
      let formData = new FormData();

      let file = await DocumentPicker.pickMultiple({
        type: [types.images],
      });

      file?.map((item, index) => {
        formData.append('VendorID', vendorId);
        formData.append('AlbumName', modalData.name);
        formData.append('PriceTitle', modalData.title);
        formData.append('Price', modalData.price);
        formData.append('Images[]', {
          uri: item?.uri,
          name: item?.name,
          type: item?.type,
        });
      });

      let url =
        route?.params?.title === 'Album'
          ? 'https://www.wedbeeindia.com/api/AddVendorAlbumAPI'
          : route?.params?.title === 'Gallery'
          ? 'https://www.wedbeeindia.com/api/AddVendorGalleryAPI'
          : 'https://www.wedbeeindia.com/api/AddVendorPriceAPI';

      let headers = {
        'Content-type': 'multipart/form-data',
        Authorization: accessToken,
      };

      await axios
        .post(url, formData, {
          headers: headers,
        })
        .then((response) => {
          if (response?.data?.Status === 1) {
            modalData.visible = !modalData.visible;
            setModalData({ ...modalData });

            if (route?.params?.title === 'Album') {
              setTypeData([]);
              dispatch({
                type: ActionTypes.GET_VENDOR_ALBUM_SUCCESS,
                payload: [],
              });
            } else if (route?.params?.title === 'Gallery') {
              setData([]);
              dispatch({
                type: ActionTypes.GET_VENDOR_GALLERY_SUCCESS,
                payload: [],
              });
            } else if (route?.params?.title === 'Pricing') {
              setTypeData([]);
              dispatch({
                type: ActionTypes.GET_VENDOR_PRICE_SUCCESS,
                payload: [],
              });
            }

            setRender(!render);
          }
        })
        .catch((err) => {
          showMessage({
            message: err?.toString(),
            color: Colors.black,
            backgroundColor: Colors.theme,
          });
        });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker, exit any dialogs or menus and move on...
      } else {
        throw error;
      }
    }
  };

  const renderHeader = (id) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.imageViewerDeleteBtnStyle}
        onPress={() => {
          if (route?.params?.title === 'Album') {
            if (albumList[albumImgIndex]?.AlbumImage?.length > 1) {
              deleteAlbumImage(
                albumList[albumImgIndex]?.AlbumID?.toString(),
                albumList[albumImgIndex]?.AlbumImage[id]?.ImageId?.toString(),
              );
            } else {
              deleteAlbum(albumList[albumImgIndex]?.AlbumID?.toString());
            }
          }

          if (route?.params?.title === 'Pricing') {
            if (priceList[albumImgIndex]?.PriceImage?.length > 1) {
              deleteAlbumImage(
                priceList[albumImgIndex]?.PriceID?.toString(),
                priceList[albumImgIndex]?.PriceImage[id]?.ImageId?.toString(),
              );
            } else {
              deleteAlbum(priceList[albumImgIndex]?.PriceID?.toString());
            }
          }
        }}>
        <Image
          source={ImagePaths.IC_DELETE}
          style={styles.galleryDeleteImgStyle}
        />
      </TouchableOpacity>
    );
  };

  const renderFooter = (text) => <Text>{text}</Text>;

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        leftImg={ImagePaths.IC_BACK}
        leftTitle={route?.params?.title}
        rightImg={ImagePaths.IC_ADD}
        rightImgStyle={styles.rightImgStyle}
        rightBtnStyle={styles.rightBtnStyle}
        onPress={() => {
          if (route?.params?.title === 'Gallery') {
            chooseFile();
          } else {
            modalData.visible = !modalData.visible;
            setModalData({ ...modalData });
          }
        }}
      />

      <AppLoader visible={appLoader} />
      <DataNotFound
        visible={
          route?.params?.title === 'Album'
            ? !albumList?.length
            : route?.params?.title === 'Gallery'
            ? !galleryList?.length
            : !priceList?.length
        }
      />

      <FlatList
        data={
          route?.params?.title === 'Album'
            ? albumList
            : route?.params?.title === 'Gallery'
            ? galleryList
            : priceList
        }
        renderItem={renderItem}
        numColumns={2}
        style={styles.galleryViewStyle}
        keyExtractor={(item, index) => index?.toString()}
        showsVerticalScrollIndicator={false}
      />

      <Modal2
        isVisible={modalData.visible}
        animationInTiming={700}
        animationOutTiming={1000}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onBackButtonPress={() => {
          modalData.visible = !modalData.visible;
          setModalData({ ...modalData });
        }}>
        <View style={styles.albumContainerStyle}>
          <View style={styles.highlightStyle} />
          {route?.params?.title === 'Album' ? (
            <TextInput
              maxLength={20}
              label={'Album Title'}
              theme={inputTheme}
              error={modalData.nameError}
              style={styles.inputStyle}
              underlineColor={Colors.blackOpacity25}
              activeUnderlineColor={Colors.blackOpacity50}
              onChangeText={(text) => {
                modalData.name = text?.trim();
                if (modalData.name?.length > 2) {
                  modalData.nameError = false;
                }
                setModalData({ ...modalData });
              }}
              value={modalData.name}
            />
          ) : (
            <View>
              <TextInput
                maxLength={20}
                label={'Title'}
                theme={inputTheme}
                error={modalData.titleError}
                style={styles.inputStyle}
                underlineColor={Colors.blackOpacity25}
                activeUnderlineColor={Colors.blackOpacity50}
                onChangeText={(text) => {
                  modalData.title = text?.trim();
                  if (modalData.title?.length > 2) {
                    modalData.titleError = false;
                  }
                  setModalData({ ...modalData });
                }}
                value={modalData.title}
              />

              <TextInput
                maxLength={10}
                keyboardType={'number-pad'}
                label={'Price'}
                theme={inputTheme}
                error={modalData.priceError}
                style={styles.inputStyle}
                underlineColor={Colors.blackOpacity25}
                activeUnderlineColor={Colors.blackOpacity50}
                onChangeText={(text) => {
                  modalData.price = text?.trim();
                  if (modalData.price?.length > 2) {
                    modalData.priceError = false;
                  }
                  setModalData({ ...modalData });
                }}
                value={modalData.price}
              />
            </View>
          )}

          <View style={styles.buttonMenuStyle}>
            <ButtonWithIcon
              label={'CANCEL'}
              labelStyle={styles.labelStyle2}
              buttonStyle={styles.cancelBtnStyle}
              onPress={() => {
                modalData.visible = !modalData.visible;
                setModalData({ ...modalData });
              }}
            />
            <ButtonWithIcon
              label={'NEXT'}
              labelStyle={styles.labelStyle2}
              buttonStyle={styles.submitBtnStyle}
              onPress={() => {
                if (route?.params?.title === 'Album') {
                  if (modalData.name?.length < 3) {
                    modalData.nameError = true;
                    setModalData({ ...modalData });
                    return;
                  }
                } else {
                  if (modalData.title?.length < 3) {
                    modalData.titleError = true;
                    setModalData({ ...modalData });
                    return;
                  }

                  if (modalData.price?.length < 3) {
                    modalData.priceError = true;
                    setModalData({ ...modalData });
                    return;
                  }
                }

                chooseFile();
              }}
            />
          </View>
        </View>
      </Modal2>

      {route?.params?.title === 'Album' ||
      route?.params?.title === 'Pricing' ? (
        <Modal
          visible={visible}
          onRequestClose={() => {
            setTypeData([]);
            setVisible(false);
          }}>
          <ImageViewer
            index={typeDataIndex}
            imageUrls={typeData}
            renderHeader={renderHeader}
            renderFooter={renderFooter}
            saveToLocalByLongPress={false}
            enableSwipeDown={true}
            onCancel={() => {
              setTypeData([]);
              setVisible(false);
            }}
            useNativeDriver={true}
          />
        </Modal>
      ) : (
        <Modal visible={visible} onRequestClose={() => setVisible(false)}>
          <ImageViewer
            index={dataIndex}
            imageUrls={data}
            saveToLocalByLongPress={false}
            enableSwipeDown={true}
            onCancel={() => setVisible(false)}
            useNativeDriver={true}
          />
        </Modal>
      )}
    </View>
  );
};

export default VendorViewMoreScreen;
