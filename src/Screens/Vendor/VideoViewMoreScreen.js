import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import Modal from 'react-native-modal';
import YoutubePlayer from 'react-native-youtube-iframe';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateVerticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import {
  AppHeader,
  AppLoader,
  ButtonWithIcon,
  DataNotFound,
} from '../../Components';
import { ImagePaths, ActionTypes, AsyncStrings } from '../../Constants';

import styles from './Styles';
import { getStorage } from '../../Helpers/Storage';

const VideoViewMoreScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const {
    appLoader,
    accessToken,
    videoList,
    addVideoSuccess,
    deleteVideoSuccess,
  } = useSelector(
    (state) => ({
      appLoader: state?.commonReducer?.appLoader,
      accessToken: state?.authReducer?.accessToken,
      videoList: state?.dashboardReducer?.videoList,
      addVideoSuccess: state?.dashboardReducer?.addVideoSuccess,
      deleteVideoSuccess: state?.dashboardReducer?.deleteVideoSuccess,
    }),
    shallowEqual,
  );

  const [data, setData] = useState([]);
  const [dataIndex, setIndex] = useState(0);

  const [typeData, setTypeData] = useState([]);
  const [typeDataIndex, setTypeIndex] = useState(0);

  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [vendorId, setVendorId] = useState(0);

  const [modalState, setModalState] = useState({
    visible: false,
    videoId: '',
    isEnabled: true,
  });

  useEffect(() => {
    getStorage(AsyncStrings.USER_DETAILS)
      .then((response) => {
        if (response) {
          let result = JSON.parse(response);

          dispatch({
            type: ActionTypes.GET_VENDOR_VIDEO,
            payload: {
              authorization: accessToken,
              VendorID: result?.VendorID,
            },
          });

          let Status = 0;
          dispatch({
            type: ActionTypes.ADD_VENDOR_VIDEO_SUCCESS,
            payload: { Status },
          });
          dispatch({
            type: ActionTypes.DELETE_VENDOR_VIDEO_SUCCESS,
            payload: { Status },
          });

          setVendorId(result?.VendorID?.toString());

          modalState.videoId = '';
          modalState.visible = false;
          setModalState({ ...modalState });
        }
      })
      .catch((error) =>
        console.error(`error with ${AsyncStrings.USER_DETAILS}`, error),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addVideoSuccess === 1, deleteVideoSuccess === 1]);

  useEffect(() => {
    if (route?.params?.type) {
      route?.params?.item?.[typeDataIndex]?.AlbumImage?.map((albumImg) => {
        typeData.push({ url: albumImg });
      });

      setTypeData(typeData);
    } else {
      videoList?.map((item) => {
        data.push({ url: item });
      });

      setData(data);
    }

    return () => {
      setData([]);
      setTypeData([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoList]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.teamFlexStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setIndex(
              item?.VideoLink?.split('https://www.youtube.com/watch?v=')[1],
            );
            setVisible(true);
          }}>
          <View key={index}>
            <Image
              source={{ uri: item?.Thumbnail }}
              style={styles.galleryImgStyle}
            />
            <View style={styles.blurGalleryImgStyle}>
              <AntDesign name="youtube" size={50} color="red" />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.deleteBtnStyle}
              onPress={() => deleteVideo(item?.VideoID?.toString())}>
              <Image
                key={item}
                source={ImagePaths.IC_DELETE}
                style={styles.galleryDeleteImgStyle}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const addVideo = () => {
    dispatch({
      type: ActionTypes.ADD_VENDOR_VIDEO,
      payload: {
        authorization: accessToken,
        VendorID: vendorId,
        YouTubeId: modalState.videoId,
      },
    });
  };

  const deleteVideo = (id) => {
    dispatch({
      type: ActionTypes.DELETE_VENDOR_VIDEO,
      payload: {
        authorization: accessToken,
        VendorID: vendorId,
        VideoID: id,
      },
    });
  };

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
          modalState.visible = true;
          setModalState({ ...modalState });
        }}
      />

      <AppLoader visible={appLoader} />
      <DataNotFound visible={!videoList?.length} />

      <FlatList
        data={videoList}
        renderItem={renderItem}
        numColumns={2}
        style={styles.galleryViewStyle}
        keyExtractor={(item, index) => index?.toString()}
        showsVerticalScrollIndicator={false}
      />

      {videoList?.length && visible ? (
        <Modal
          isVisible={visible}
          animationInTiming={700}
          animationOutTiming={1000}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          onBackButtonPress={() => setVisible(!visible)}>
          <YoutubePlayer
            height={moderateVerticalScale(190)}
            play={playing}
            videoId={dataIndex}
          />
        </Modal>
      ) : null}

      <Modal
        isVisible={modalState.visible}
        animationInTiming={700}
        animationOutTiming={1000}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onBackButtonPress={() => navigation.goBack()}>
        <View style={styles.addVideoIdStyle}>
          <View style={styles.highlightStyle} />
          <TextInput
            style={styles.textInputTwoStyle}
            placeholder={'Enter Youtube Video Id'}
            onChangeText={(text) => {
              if (text?.length > 10) {
                modalState.isEnabled = false;
              } else {
                modalState.isEnabled = true;
              }
              modalState.videoId = text;
              setModalState({ ...modalState });
            }}
            value={modalState.videoId}
          />
          <View style={styles.addVideoIdFlexStyle}>
            <ButtonWithIcon
              label={'CANCEL'}
              labelStyle={styles.labelStyle2}
              buttonStyle={styles.cancelBtnStyle}
              onPress={() => {
                modalState.visible = !modalState.visible;
                setModalState({ ...modalState });
              }}
            />
            <ButtonWithIcon
              label={'SAVE'}
              disabled={modalState.isEnabled}
              labelStyle={styles.labelStyle2}
              buttonStyle={
                modalState.isEnabled
                  ? styles.submitDisableStyle
                  : styles.submitBtnStyle
              }
              onPress={addVideo}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VideoViewMoreScreen;
