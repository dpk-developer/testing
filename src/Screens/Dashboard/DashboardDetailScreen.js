import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  Share,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import {
  AppHeader,
  AppLoader,
  Accordion,
  DataNotFound,
  ButtonWithIcon,
} from '../../Components';
import { ActionTypes, ImagePaths, NavigationStrings } from '../../Constants';
import Colors from '../../Styles/Colors';

import styles from './Styles';

const inputTheme = {
  colors: {
    text: Colors.darkBlack,
  },
  roundness: 0,
};

const DashboardDetailScreen = ({ navigation, route }) => {
  const disptach = useDispatch();

  const {
    vendor,
    addFaq,
    faqList,
    deleteFaq,
    appLoader,
    accessToken,
    addMoreInfo,
    moreInfoList,
    deleteMoreInfo,
    addVideoSuccess,
    deleteVideoSuccess,
  } = useSelector(
    (state) => ({
      addFaq: state?.dashboardReducer?.addFaq,
      faqList: state?.dashboardReducer?.faqList,
      appLoader: state?.commonReducer?.appLoader,
      accessToken: state?.authReducer?.accessToken,
      deleteFaq: state?.dashboardReducer?.deleteFaq,
      addMoreInfo: state?.dashboardReducer?.addMoreInfo,
      moreInfoList: state?.dashboardReducer?.otherInfoList,
      vendor: state?.dashboardReducer?.venderDetailSuccess,
      deleteMoreInfo: state?.dashboardReducer?.deleteMoreInfo,
      addVideoSuccess: state?.dashboardReducer?.addVideoSuccess,
      deleteVideoSuccess: state?.dashboardReducer?.deleteVideoSuccess,
    }),
    shallowEqual,
  );

  const [moreInfo, setMoreInfo] = useState({
    visible: false,
    visible2: false,
    title: '',
    description: '',
    titleError: false,
    descriptionError: false,
    question: '',
    questionError: false,
    answer: '',
    answerError: false,
  });

  useEffect(() => {
    disptach({
      type: ActionTypes.VENDOR_DETAILS,
      payload: {
        authorization: accessToken,
        VendorID: route?.params?.VendorID,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addVideoSuccess === 1, deleteVideoSuccess === 1]);

  useEffect(() => {
    disptach({
      type: ActionTypes.GET_VENDOR_MORE_INFO,
      payload: {
        authorization: accessToken,
        VendorID: route?.params?.VendorID,
      },
    });

    disptach({
      type: ActionTypes.ADD_VENDOR_MORE_INFO_SUCCESS,
      payload: 0,
    });

    disptach({
      type: ActionTypes.DELETE_VENDOR_MORE_INFO_SUCCESS,
      payload: 0,
    });

    return () => setMoreInfo({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteMoreInfo === 1, addMoreInfo === 1]);

  useEffect(() => {
    disptach({
      type: ActionTypes.GET_VENDOR_FAQ,
      payload: {
        authorization: accessToken,
        VendorID: route?.params?.VendorID,
      },
    });

    disptach({
      type: ActionTypes.ADD_VENDOR_FAQ_SUCCESS,
      payload: 0,
    });

    disptach({
      type: ActionTypes.DELETE_VENDOR_FAQ_SUCCESS,
      payload: 0,
    });

    return () => setMoreInfo({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteFaq === 1, addFaq === 1]);

  const renderFaq = () => {
    return faqList?.map((item, index) => (
      <Accordion
        key={index?.toString()}
        title={item?.Question}
        body={item?.Answer}
        vendorId={route?.params?.VendorID}
        faqId={item?.FaqID}
        accessToken={accessToken}
      />
    ));
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Download WedBee from playstore.. link will be send you soon...',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const onSubmit = () => {
    if (moreInfo.title?.length < 3) {
      moreInfo.titleError = true;
      setMoreInfo({ ...moreInfo });
      return;
    }

    if (moreInfo.description?.length < 3) {
      moreInfo.descriptionError = true;
      setMoreInfo({ ...moreInfo });
      return;
    }

    disptach({
      type: ActionTypes.ADD_VENDOR_MORE_INFO,
      payload: {
        authorization: accessToken,
        VendorID: route?.params?.VendorID,
        Title: moreInfo.title,
        Desc: moreInfo.description,
      },
    });

    let clearState = {
      visible: false,
      title: '',
      description: '',
      titleError: false,
      descriptionError: false,
      visible2: false,
      question: '',
      answer: '',
      questionError: false,
      answerError: false,
    };

    setMoreInfo(clearState);
  };

  const onSubmitFaq = () => {
    if (moreInfo.question?.length < 3) {
      moreInfo.questionError = true;
      setMoreInfo({ ...moreInfo });
      return;
    }

    if (moreInfo.answer?.length < 3) {
      moreInfo.answerError = true;
      setMoreInfo({ ...moreInfo });
      return;
    }

    disptach({
      type: ActionTypes.ADD_VENDOR_FAQ,
      payload: {
        authorization: accessToken,
        VendorID: route?.params?.VendorID,
        Question: moreInfo.question,
        Answer: moreInfo.answer,
      },
    });

    let clearState = {
      visible: false,
      title: '',
      description: '',
      titleError: false,
      descriptionError: false,
      visible2: false,
      question: '',
      answer: '',
      questionError: false,
      answerError: false,
    };

    setMoreInfo(clearState);
  };

  const onDeleteMoreInfo = (id) => {
    disptach({
      type: ActionTypes.DELETE_VENDOR_MORE_INFO,
      payload: {
        authorization: accessToken,
        VendorID: route?.params?.VendorID,
        OtherInfoID: id,
      },
    });
  };

  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.moreInfoStyle}>
      <Text style={styles.moreInfoTitleStyle}>{item?.OtherInfoTitle}</Text>
      <Text style={styles.moreInfoDescStyle}>{item?.OtherInfoDesc}</Text>
      <TouchableOpacity
        style={styles.moreInfoDeleteBtnStyle}
        onPress={() => onDeleteMoreInfo(item?.OtherInfoID?.toString())}>
        <Image
          source={ImagePaths.IC_DELETE}
          style={styles.moreInfoDeleteIcStyle}
        />
      </TouchableOpacity>
    </View>
  );

  if (!Object.keys(vendor)?.length) {
    return <DataNotFound visible={!Object.keys(vendor)?.length} />;
  } else {
    return (
      <View style={styles.offerDetailsContainer}>
        <AppHeader
          navigation={navigation}
          leftImg={ImagePaths.IC_BACK}
          leftTitle={
            vendor?.VendorCompanyData?.CompanyName ?? vendor?.VendorName
          }
        />

        <AppLoader visible={appLoader} />

        <ScrollView style={styles.scrollViewStyle}>
          <ImageBackground
            source={{ uri: vendor?.VendorImage }}
            style={styles.imageBgStyle}
          />

          <View style={styles.cardWithShadowStyle}>
            <View style={styles.descriptionStyle}>
              <View style={styles.desItemsStyle}>
                <Image
                  source={ImagePaths.IC_LOCATION_PIN}
                  resizeMode={'contain'}
                  style={styles.locationPinStyle}
                />
                <Text style={styles.cardLocationTextStyle}>
                  {vendor?.VendorCompanyData?.CompanyAddress}
                </Text>
              </View>
              <Text style={styles.priceTextStyle}>
                Onwards Rs. {vendor?.MainPrice}
              </Text>
            </View>

            <View style={styles.lineHorizontalViewStyle} />

            <View style={styles.galleryReviewViewStyle}>
              <ButtonWithIcon
                label={'Galleries'}
                leftIcon={ImagePaths.IC_GALLERY}
                leftIconStyle={styles.leftIconStyle}
                labelStyle={styles.cardlabelStyle}
                buttonStyle={styles.galleryButtonStyle}
                onPress={() =>
                  navigation.navigate(
                    NavigationStrings.VENDOR_VIEW_MORE_SCREEN,
                    {
                      title: 'Gallery',
                    },
                  )
                }
              />

              <ButtonWithIcon
                label={'View Review'}
                leftIcon={ImagePaths.IC_ALBUM}
                leftIconStyle={styles.leftIconStyle}
                labelStyle={styles.cardlabelStyle}
                buttonStyle={styles.AddReviewButtonStyle}
                onPress={() =>
                  navigation.navigate(NavigationStrings.FEEDBACK_SCREEN)
                }
              />
            </View>

            <View style={styles.galleryReviewViewStyle}>
              <View style={styles.viewStyle}>
                <Text style={styles.cardlabelStyle}>{vendor?.Rating}</Text>
                <Text style={styles.reviewTextStyle}>
                  {vendor?.Review > 1
                    ? `${vendor?.Review} Reviews`
                    : `${vendor?.Review} Review`}
                </Text>
              </View>

              <View style={styles.lineVeritcalViewStyle} />

              <View style={styles.viewStyle}>
                <TouchableOpacity onPress={onShare}>
                  <Image
                    source={ImagePaths.IC_SHARE_BOLD}
                    resizeMode={'contain'}
                    style={styles.leftIconStyle}
                  />
                </TouchableOpacity>
                <Text style={styles.reviewTextStyle}>Share</Text>
              </View>
            </View>
          </View>

          <View style={styles.offersTabView}>
            <TouchableOpacity activeOpacity={1} style={styles.tabBtnStyle}>
              <Text style={styles.tabTextStyle}>Description</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.lineHorizontalViewStyle} />

          <Text style={styles.descriptionTextStyle}>{vendor?.About}</Text>

          <View style={styles.lineHorizontalViewTwoStyle} />

          <View style={styles.teamGreyStyle}>
            <Text style={styles.teamTextStyle}>Album</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.addIconBtnStyle}
              onPress={() =>
                navigation.navigate(NavigationStrings.VENDOR_VIEW_MORE_SCREEN, {
                  item: vendor?.VendorAlbum,
                  title: 'Album',
                  type: 'array',
                })
              }>
              {vendor?.VendorAlbum?.length ? (
                <Text style={styles.viewMoreTextStyle}>View More</Text>
              ) : (
                <Image source={ImagePaths.IC_ADD} style={styles.addImgStyle} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.teamFlexStyle}>
            {vendor?.VendorAlbum?.slice(0, 2)?.map((item) => {
              return item?.AlbumImage?.slice(0, 1)?.map((img) => (
                <TouchableOpacity
                  key={img}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate(
                      NavigationStrings.VENDOR_VIEW_MORE_SCREEN,
                      {
                        title: 'Album',
                      },
                    )
                  }>
                  <Image source={{ uri: img }} style={styles.galleryImgStyle} />
                  <View style={styles.blurGalleryImgStyle}>
                    <Image
                      source={ImagePaths.IC_GALLERY}
                      style={styles.leftIconStyle}
                      resizeMode={'contain'}
                    />
                    <Text style={styles.tabTextStyle}>
                      +{item?.AlbumImage?.length - 1} Photos
                    </Text>
                  </View>
                  <View style={styles.galleryTextViewStyle}>
                    <Text style={styles.teamUserTextStyle}>
                      <Text style={styles.viewMoreTextStyle}>
                        {item?.AlbumName}
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              ));
            })}
          </View>

          {vendor?.VendorPriceData?.length ? (
            <View>
              <View style={styles.teamGreyStyle}>
                <Text style={styles.teamTextStyle}>Pricing</Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.addIconBtnStyle}
                  onPress={() =>
                    navigation.navigate(
                      NavigationStrings.VENDOR_VIEW_MORE_SCREEN,
                      {
                        title: 'Pricing',
                        type: 'array',
                      },
                    )
                  }>
                  {vendor?.VendorPriceData?.length ? (
                    <Text style={styles.viewMoreTextStyle}>View More</Text>
                  ) : (
                    <Image
                      source={ImagePaths.IC_ADD}
                      style={styles.addImgStyle}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.teamFlexStyle}>
                {vendor?.VendorPriceData?.slice(0, 2)?.map((item) => {
                  return item?.Imagee?.slice(0, 1)?.map((img) => (
                    <TouchableOpacity
                      key={img}
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate(
                          NavigationStrings.VENDOR_VIEW_MORE_SCREEN,
                          {
                            title: 'Pricing',
                          },
                        )
                      }>
                      <View style={styles.galleryTextViewStyle}>
                        <Text style={styles.teamUserTextStyle}>
                          <Text style={styles.viewMoreTextStyle}>
                            {item?.Title}
                          </Text>
                        </Text>
                      </View>
                      <Image
                        source={{ uri: img }}
                        style={styles.galleryImgStyle}
                      />
                      <View style={styles.galleryTextViewStyle}>
                        <Text style={styles.teamUserTextStyle}>
                          Price :{' '}
                          <Text style={styles.viewMoreTextStyle}>
                            Rs.{item?.Price}
                          </Text>
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ));
                })}
              </View>
            </View>
          ) : null}

          <View style={styles.teamGreyStyle}>
            <Text style={styles.teamTextStyle}>Services Video</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.addIconBtnStyle}
              onPress={() =>
                navigation.navigate(NavigationStrings.VIDEO_VIEW_MORE_SCREEN, {
                  title: 'Videos',
                  type: 'array',
                })
              }>
              {vendor?.VendorVideoData?.length ? (
                <Text style={styles.viewMoreTextStyle}>View More</Text>
              ) : (
                <Image source={ImagePaths.IC_ADD} style={styles.addImgStyle} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.teamFlexStyle}>
            {vendor?.VendorVideoData?.slice(0, 2)?.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate(
                    NavigationStrings.VIDEO_VIEW_MORE_SCREEN,
                    {
                      item: vendor?.VendorVideoData,
                      title: 'Videos',
                      type: 'array',
                    },
                  )
                }>
                <View>
                  <Image
                    source={{ uri: item?.Thumbnail }}
                    style={styles.galleryImgStyle}
                  />
                  <View style={styles.blurGalleryImgStyle}>
                    <AntDesign name="youtube" size={50} color="red" />
                    <Text style={styles.tabTextStyle}>
                      +{vendor?.VendorVideoData?.length - 2} Videos
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.teamGreyStyle}>
            <Text style={styles.teamTextStyle}>More Info</Text>
            <TouchableOpacity
              style={styles.addIconBtnStyle}
              onPress={() => {
                moreInfo.visible = true;
                setMoreInfo({ ...moreInfo });
              }}
              activeOpacity={0.8}>
              <Image source={ImagePaths.IC_ADD} style={styles.addImgStyle} />
            </TouchableOpacity>
          </View>

          {moreInfoList?.length ? (
            <FlatList
              data={moreInfoList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index?.toString()} // Throw Vitualized Error / Warning Please correct it
              showsVerticalScrollIndicator={false}
            />
          ) : null}

          <Modal
            isVisible={moreInfo.visible}
            animationInTiming={700}
            animationOutTiming={1000}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            onBackButtonPress={() => {
              moreInfo.visible = false;
              setMoreInfo({ ...moreInfo });
            }}>
            <View style={styles.moreInfoViewStyle}>
              <View style={styles.highlightStyle} />
              <TextInput
                label={'Title'}
                theme={inputTheme}
                style={styles.inputStyle}
                error={moreInfo.titleError}
                underlineColor={Colors.blackOpacity25}
                activeUnderlineColor={Colors.blackOpacity50}
                onChangeText={(text) => {
                  moreInfo.title = text;
                  if (moreInfo.title?.length > 2) {
                    moreInfo.titleError = false;
                  }
                  setMoreInfo({ ...moreInfo });
                }}
                value={moreInfo.title}
              />
              <TextInput
                label={'Description'}
                theme={inputTheme}
                style={styles.inputStyle}
                error={moreInfo.descriptionError}
                underlineColor={Colors.blackOpacity25}
                activeUnderlineColor={Colors.blackOpacity50}
                onChangeText={(text) => {
                  moreInfo.description = text;
                  if (moreInfo.description?.length > 2) {
                    moreInfo.descriptionError = false;
                  }
                  setMoreInfo({ ...moreInfo });
                }}
                value={moreInfo.description}
              />
              <ButtonWithIcon
                label={'SUBMIT'}
                labelStyle={styles.submitlabelStyle}
                buttonStyle={styles.submitBtnStyle}
                onPress={onSubmit}
              />
            </View>
          </Modal>

          <Modal
            isVisible={moreInfo.visible2}
            animationInTiming={700}
            animationOutTiming={1000}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            onBackButtonPress={() => {
              moreInfo.visible2 = false;
              setMoreInfo({ ...moreInfo });
            }}>
            <View style={styles.moreInfoViewStyle}>
              <View style={styles.highlightStyle} />
              <TextInput
                label={'Question'}
                theme={inputTheme}
                style={styles.inputStyle}
                error={moreInfo.questionError}
                underlineColor={Colors.blackOpacity25}
                activeUnderlineColor={Colors.blackOpacity50}
                onChangeText={(text) => {
                  moreInfo.question = text;
                  if (moreInfo.question?.length > 2) {
                    moreInfo.questionError = false;
                  }
                  setMoreInfo({ ...moreInfo });
                }}
                value={moreInfo.question}
              />
              <TextInput
                label={'Answer'}
                theme={inputTheme}
                style={styles.inputStyle}
                error={moreInfo.answerError}
                underlineColor={Colors.blackOpacity25}
                activeUnderlineColor={Colors.blackOpacity50}
                onChangeText={(text) => {
                  moreInfo.answer = text;
                  if (moreInfo.answer?.length > 2) {
                    moreInfo.answerError = false;
                  }
                  setMoreInfo({ ...moreInfo });
                }}
                value={moreInfo.answer}
              />
              <ButtonWithIcon
                label={'SUBMIT'}
                labelStyle={styles.submitlabelStyle}
                buttonStyle={styles.submitBtnStyle}
                onPress={onSubmitFaq}
              />
            </View>
          </Modal>

          <View
            style={
              vendor?.VendorReviewData?.length < 3
                ? { ...styles.teamGreyStyle, ...styles.marginTop30Style }
                : { ...styles.teamGreyStyle }
            }>
            <Text style={styles.teamTextStyle}>Review</Text>

            {vendor?.VendorReviewData?.length > 2 ? (
              <TouchableOpacity
                style={styles.addIconBtnStyle}
                activeOpacity={0.8}>
                <Text style={styles.viewMoreTextStyle}>View More</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {vendor?.VendorReviewData?.slice(0, 2)?.map((item, index) => {
            let userImg = item?.Image
              ? { uri: item?.Image }
              : ImagePaths.IC_OFFER_USER_IMG;
            return (
              <View key={index} style={styles.reviewCardStyle}>
                <View style={styles.reviewImgViewStyle}>
                  <Image
                    source={userImg}
                    resizeMode={'contain'}
                    style={styles.reviewImgStyle}
                  />
                </View>

                <View style={styles.reviewContentStyle}>
                  <View style={styles.ratingStyle}>
                    <AirbnbRating
                      count={5}
                      size={15}
                      isDisabled
                      reviewColor={Colors.white}
                      selectedColor={Colors.theme}
                      reviewSize={15}
                      defaultRating={item?.Rating}
                    />
                  </View>
                  <Text style={styles.teamUserTextStyle}>{item?.Name}</Text>
                  <Text style={styles.teamUserTextStyle}>{item?.Review}</Text>
                </View>
              </View>
            );
          })}

          <View style={styles.teamGreyStyle}>
            <Text style={styles.teamTextStyle}>FAQ's</Text>
            <TouchableOpacity
              style={styles.addIconBtnStyle}
              onPress={() => {
                moreInfo.visible2 = true;
                setMoreInfo({ ...moreInfo });
              }}
              activeOpacity={0.8}>
              <Image source={ImagePaths.IC_ADD} style={styles.addImgStyle} />
            </TouchableOpacity>
          </View>

          <View style={styles.faqViewStyle}>{renderFaq()}</View>
        </ScrollView>
      </View>
    );
  }
};

export default DashboardDetailScreen;
