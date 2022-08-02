import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { AppHeader, AppLoader, DataNotFound } from '../../Components';
import { ActionTypes, ImagePaths, NavigationStrings } from '../../Constants';

import styles from './Styles';

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { appLoader, accessToken, venderList } = useSelector(
    (state) => ({
      appLoader: state?.commonReducer?.appLoader,
      accessToken: state?.authReducer?.accessToken,
      venderList: state?.dashboardReducer?.venderListSuccess,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch({
      type: ActionTypes.GET_VENDOR_LIST,
      payload: {
        authorization: accessToken,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.deatilCategoryCardStyle}
      onPress={() =>
        navigation.navigate(NavigationStrings.DASHBOARD_DETAIL_SCREEN, {
          VendorID: item?.VendorID,
        })
      }>
      <ImageBackground
        source={{
          uri: item?.Image,
        }}
        style={styles.detailCategoryImgtyle}>
        <View style={styles.ratingViewStyle}>
          <Image
            resizeMode={'contain'}
            source={ImagePaths.IC_STAR}
            style={styles.ratingIcStyle}
          />

          <Text style={styles.ratingTextStyle}>{item?.Rating}</Text>
        </View>
      </ImageBackground>

      <View style={styles.detailCategoryDescStyle}>
        <Text style={styles.categoryTextStyle}>{item?.Name}</Text>
      </View>

      <View style={styles.detailCategoryDescThreeStyle}>
        <View style={styles.addressViewStyle}>
          <Image
            resizeMode={'contain'}
            source={ImagePaths.IC_LOCATION_PIN}
            style={styles.locationIcStyle}
          />

          <Text style={styles.locationTextStyle}>{item?.Location}</Text>
        </View>

        <Text style={styles.resultTextStyle}>{item?.ReviewCount} Review</Text>
      </View>

      <View style={styles.lineStyle} />

      <View style={styles.detailCategoryVerifiedViewStyle}>
        <Image
          resizeMode={'contain'}
          source={ImagePaths.IC_VERIFIED}
          style={styles.verifiedIcStyle}
        />

        <Text style={styles.verifiedTextStyle}>Verified</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.detailContainer}>
      <AppLoader visible={appLoader} />

      <DataNotFound visible={!venderList?.length} />

      <AppHeader
        navigation={navigation}
        leftImg={ImagePaths.IC_MENU}
        headerImg={ImagePaths.IC_APP}
        rightTitleStyle={styles.rightTitleStyle}
        onPressLeft={() => navigation.toggleDrawer()}
        onPress={() => {}}
      />

      <FlatList
        data={venderList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DashboardScreen;
