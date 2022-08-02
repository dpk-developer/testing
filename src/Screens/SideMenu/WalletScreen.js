import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppHeader, ButtonWithIcon } from '../../Components';
import { ActionTypes, AsyncStrings, ImagePaths } from '../../Constants';
import Colors from '../../Styles/Colors';
import styles from './Styles';
import RazorpayCheckout from 'react-native-razorpay';
import { getStorage } from '../../Helpers/Storage';

const inputTheme = {
  colors: {
    text: Colors.darkBlack,
  },
  roundness: 0,
};

const WalletScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState({
   
  });

  const { appLoader, accessToken, walletInfo ,paymentResponse} = useSelector(
    (state) => ({
      appLoader: state?.commonReducer?.appLoader,
      accessToken: state?.authReducer?.accessToken,
      walletInfo: state?.dashboardReducer?.walletSuccess,
      paymentResponse: state?.dashboardReducer?.paymentResponse,
    }),
    shallowEqual,
  );

  console.log('paymentResponse',paymentResponse);
  const [wallet, setWallet] = useState({
    amount: '',
    amountError: false,
  });

  useEffect(() => {
    getStorage(AsyncStrings.USER_DETAILS)
      .then((response) => {
        let result = JSON.parse(response);
        customerData.fullName = result?.VendorName;
        customerData.email = result?.Email?.trim();
        customerData.phone = result?.Phone?.trim();
        setCustomerData({ ...customerData });
      })
      .catch((error) =>
        console.error(`error with ${AsyncStrings.USER_DETAILS}`, error),
      );

    return () => setCustomerData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(customerData);
  useEffect(() => {
    if (walletInfo?.Status === 1) {
      payNow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletInfo]);

  const addToWallet = () => {
    console.log('inside add to wallet');
    if (
      !wallet.amount?.length ||
      (wallet.amount?.length === 1 && wallet.amount === '0')
    ) {
      wallet.amountError = true;
      setWallet({ ...wallet });
      return;
    }

    dispatch({
      type: ActionTypes.ADD_TO_WALLET,
      payload: {
        authorization: accessToken,
        VendorID: route?.params?.VendorID,
        Amount: wallet?.amount,
      },
    });
  };

  console.log('walletInfo',walletInfo);
  const payNow = () => {
   
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: walletInfo?.RazorPayKey,
      amount: walletInfo?.Amount*100,
      name: 'Wedbee Pvt Ltd.',
      prefill: {
        email: customerData?.email,
        contact: customerData?.phone,
        name: customerData?.fullName
      },
      theme: {color: '#53a20e'}
    }

    console.log('options===>',options);
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
      dispatch({
        type: ActionTypes.SEND_PAYMENT_RESPONSE,
        payload: {
          authorization: accessToken,
          VendorID: route?.params?.VendorID,
          Amount: walletInfo?.Amount,
          OrderID:walletInfo?.OrderID,
          PaymentResponse:'Success',
          PaymentData:data.razorpay_payment_id
        },
      });
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
      console.log(`Error: ${error.code} | ${error.description}`);
    });
    RazorpayCheckout.onExternalWalletSelection(data => {
      alert(`External Wallet Selected: ${data.external_wallet} `);
    });
  
    dispatch({
      type: ActionTypes.ADD_TO_WALLET_SUCCESS,
      payload: {},
    });
  };

  return (
    <ScrollView style={styles.container}>
      <AppHeader navigation={navigation} leftImg={ImagePaths.IC_BACK_TWO} />

      <ImageBackground
        source={ImagePaths.IC_APP}
        resizeMode="contain"
        style={styles.logoStyles}
      />

<View style={styles.balanceViewStyle}>
        <Text style={styles.availBalanceTextStyle}>Available Balance</Text>
        <Text style={styles.balanceTextStyle}>₹ 10000/-</Text>
      </View>

      <View style={styles.loginSignupViewStyles}>
        <TextInput
          label={'Enter Amount'}
          theme={inputTheme}
          error={wallet.amountError}
          style={styles.inputStyle}
          underlineColor={Colors.blackOpacity25}
          activeUnderlineColor={Colors.blackOpacity50}
          onChangeText={(text) => {
            wallet.amount = text?.trim();
            if (!wallet.amount && wallet.amount !== '0') {
              wallet.amountError = false;
            }
            setWallet({ ...wallet });
          }}
          value={wallet.amount}
        />

        <ButtonWithIcon
          label={'Add Money To Wallet'}
          labelStyle={styles.loginLabelStyle}
          buttonStyle={styles.loginBtnStyle}
          onPress={addToWallet}
        />
      </View>
    </ScrollView>
  );
};

export default WalletScreen;
