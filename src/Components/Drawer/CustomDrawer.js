import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Share,
  Linking,
  Alert,
} from 'react-native';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

import {
  ImagePaths,
  ActionTypes,
  AsyncStrings,
  ApiEndPoints,
  NavigationStrings,
} from '../../Constants';
import { ButtonWithIcon } from '../';
import Colors from '../../Styles/Colors';
import { getStorage } from '../../Helpers/Storage';

const CustomDrawer = (props) => {
  const dispatch = useDispatch();

  const { navigation } = props;

  const [userData, setUserData] = useState({
    userName: 'Hello Guest!',
    userPicture: '',
    userId: '',
  });

  useEffect(() => {
    getStorage(AsyncStrings.USER_DETAILS)
      .then((response) => {
        let result = JSON.parse(response);
        userData.userName = result?.VendorName;
        userData.userPicture = result?.ProfilePic;
        userData.userId = result?.VendorID;
        setUserData({ ...userData });
      })
      .catch((error) =>
        console.error(`error with ${AsyncStrings.USER_DETAILS}`, error),
      );

    return () => setUserData('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      navigation.closeDrawer();
    } catch (error) {
      console.error(error.message);
    }
  };

  const onLogout = () => {
    Alert.alert(
      'WedBee',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return;
          },
        },
        {
          text: 'Confirm',
          onPress: () => dispatch({ type: ActionTypes.RESET_APP }),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <DrawerContentScrollView
      style={{ backgroundColor: Colors.theme }}
      {...props}>
      <View style={styles.userProfileStyle}>
        {userData.userPicture?.length ? (
          <Image
            source={{ uri: userData.userPicture }}
            resizeMode={'contain'}
            style={styles.userImgStyle}
          />
        ) : (
          <Image
            source={ImagePaths.IC_USER_PIC}
            resizeMode={'contain'}
            style={styles.userImgStyle}
          />
        )}
        <View>
          <Text style={styles.userNameStyle}>{userData.userName}</Text>
        </View>
      </View>
      <View style={styles.lineStyle} />
      <DrawerItem
        label={'Wallet'}
        labelStyle={styles.labelStyle}
        onPress={() => {
          navigation.navigate(NavigationStrings.WALLET_SCREEN, {
            VendorID: userData.userId,
          });

          navigation.closeDrawer();
        }}
        icon={() => (
          <Image
            source={ImagePaths.IC_WALLET}
            resizeMode={'contain'}
            style={styles.iconStyle}
          />
        )}
      />
      <DrawerItem
        label={'Offers'}
        labelStyle={styles.labelStyle}
        onPress={() => {
          navigation.navigate(NavigationStrings.OFFERS_SCREEN);

          navigation.closeDrawer();
        }}
        icon={() => (
          <Image
            source={ImagePaths.IC_OFFERS}
            resizeMode={'contain'}
            style={styles.iconStyle}
          />
        )}
      />
      <DrawerItem
        label={'Share'}
        labelStyle={styles.labelStyle}
        onPress={onShare}
        icon={() => (
          <Image
            source={ImagePaths.IC_SHARE}
            resizeMode={'contain'}
            style={styles.iconStyle}
          />
        )}
      />
      <DrawerItem
        label={'Customer Support'}
        labelStyle={styles.labelStyle}
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate(NavigationStrings.CUSTOMER_SUPPORT_SCREEN);
        }}
        icon={() => (
          <Image
            source={ImagePaths.IC_CUSTOMER_SUPPORT}
            resizeMode={'contain'}
            style={styles.iconStyle}
          />
        )}
      />
      <DrawerItem
        label={'Rate Us'}
        labelStyle={styles.labelStyle}
        onPress={() => {
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.whatsapp.w4b',
          );

          navigation.closeDrawer();
        }}
        icon={() => (
          <Image
            source={ImagePaths.IC_RATE_US}
            resizeMode={'contain'}
            style={styles.iconStyle}
          />
        )}
      />
      <Text style={styles.appInfoStyle}>APP INFO</Text>
      <DrawerItem
        label={'About'}
        labelStyle={styles.labelStyle}
        onPress={() => {
          navigation.navigate(NavigationStrings.WEBVIEW_SCREEN, {
            url: ApiEndPoints.ABOUT_US_WEBVIEW_URL,
          });

          navigation.closeDrawer();
        }}
        icon={() => (
          <Image
            source={ImagePaths.IC_ABOUT}
            resizeMode={'contain'}
            style={styles.iconStyle}
          />
        )}
      />
      <DrawerItem
        label={'Privacy'}
        labelStyle={styles.labelStyle}
        onPress={() => {
          navigation.navigate(NavigationStrings.WEBVIEW_SCREEN, {
            url: ApiEndPoints.PRIVACY_WEBVIEW_URL,
          });

          navigation.closeDrawer();
        }}
        icon={() => (
          <Image
            source={ImagePaths.IC_PRIVACY}
            resizeMode={'contain'}
            style={styles.iconStyle}
          />
        )}
      />
      <ButtonWithIcon
        label={'Logout'}
        labelStyle={styles.btnLabelStyle}
        buttonStyle={styles.buttonStyle}
        onPress={onLogout}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontWeight: '500',
    color: Colors.darkBlack,
    fontSize: scale(13),
    marginStart: moderateScale(-20),
  },
  userNameStyle: {
    color: Colors.darkBlack,
    fontWeight: '500',
    fontSize: scale(16),
    marginStart: moderateScale(10),
  },
  editProfileStyle: {
    color: Colors.darkBlack,
    fontWeight: '500',
    fontSize: scale(12),
    marginStart: moderateScale(10),
  },
  userProfileStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: moderateScale(18),
    marginTop: moderateVerticalScale(25),
  },
  userImgStyle: {
    width: moderateScale(80),
    height: moderateVerticalScale(80),
    borderColor: Colors.white,
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(360),
  },
  lineStyle: {
    width: '100%',
    height: moderateVerticalScale(1),
    backgroundColor: Colors.white,
    marginTop: moderateVerticalScale(20),
    marginStart: moderateScale(18),
    marginBottom: moderateVerticalScale(5),
  },
  iconStyle: {
    width: moderateScale(25),
    height: moderateVerticalScale(20),
  },
  appInfoStyle: {
    fontWeight: '500',
    color: Colors.darkBlack,
    fontSize: scale(20),
    marginTop: moderateVerticalScale(25),
    marginStart: moderateScale(18),
    marginBottom: moderateVerticalScale(18),
  },
  btnLabelStyle: {
    color: Colors.darkBlack,
    fontWeight: '500',
    fontSize: scale(14),
  },
  buttonStyle: {
    width: '82.5%',
    alignSelf: 'flex-end',
    height: moderateVerticalScale(40),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(39),
    marginTop: moderateVerticalScale(25),
    marginBottom: moderateVerticalScale(50),
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
  },
});

export default CustomDrawer;
