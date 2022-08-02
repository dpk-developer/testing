import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { ButtonWithIcon, AppLoader } from '../../Components';
import { ActionTypes, AsyncStrings } from '../../Constants';
import { getStorage } from '../../Helpers/Storage';
import Colors from '../../Styles/Colors';

import styles from './Styles';

const inputTheme = {
  colors: {
    text: Colors.darkBlack,
  },
  roundness: 0,
};

const CustomerSupportScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { appLoader } = useSelector(
    (state) => ({
      appLoader: state?.commonReducer?.appLoader,
    }),
    shallowEqual,
  );

  const [customerData, setCustomerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    fullNameError: false,
    emailError: false,
    phoneError: false,
    subjectError: false,
    msgError: false,
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

  const onSubmit = () => {
    if (customerData.fullName?.length < 3) {
      customerData.fullNameError = true;
      setCustomerData({ ...customerData });
      return;
    }
    if (customerData.email?.length < 3) {
      customerData.emailError = true;
      setCustomerData({ ...customerData });
      return;
    }
    if (customerData.phone?.length < 3) {
      customerData.phoneError = true;
      setCustomerData({ ...customerData });
      return;
    }
    if (customerData.subject?.length < 3) {
      customerData.subjectError = true;
      setCustomerData({ ...customerData });
      return;
    }
    if (customerData.message?.length <= 9) {
      customerData.msgError = true;
      setCustomerData({ ...customerData });
      return;
    }

    navigation.goBack();

    dispatch({
      type: ActionTypes.CUSTOMER_SUPPORT,
      payload: {
        Name: customerData.fullName,
        Email: customerData.email,
        Phone: customerData.phone,
        Subject: customerData.subject,
        Message: customerData.message,
      },
    });
  };

  return (
    <Modal
      isVisible={true}
      animationInTiming={700}
      animationOutTiming={1000}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onBackButtonPress={() => navigation.goBack()}>
      <AppLoader visible={appLoader} />

      <View style={styles.customerContainerStyle}>
        <View style={styles.highlightStyle} />
        <TextInput
          label={'Full Name'}
          theme={inputTheme}
          error={customerData.fullNameError}
          style={styles.inputStyle}
          underlineColor={Colors.blackOpacity25}
          activeUnderlineColor={Colors.blackOpacity50}
          onChangeText={(text) => {
            customerData.fullName = text?.trim();
            if (customerData.fullName?.length > 2) {
              customerData.fullNameError = false;
            }
            setCustomerData({ ...customerData });
          }}
          value={customerData.fullName}
        />
        <TextInput
          label={'Email'}
          theme={inputTheme}
          error={customerData.emailError}
          style={styles.inputStyle}
          underlineColor={Colors.blackOpacity25}
          activeUnderlineColor={Colors.blackOpacity50}
          onChangeText={(text) => {
            customerData.email = text?.trim();
            if (customerData.email?.length > 2) {
              customerData.emailError = false;
            }
            setCustomerData({ ...customerData });
          }}
          value={customerData.email}
        />
        <TextInput
          label={'Phone'}
          maxLength={10}
          theme={inputTheme}
          style={styles.inputStyle}
          underlineColor={Colors.blackOpacity25}
          activeUnderlineColor={Colors.blackOpacity50}
          onChangeText={(text) => {
            customerData.phone = text?.trim();
            if (customerData.phone?.length === 10) {
              customerData.phoneError = false;
            }
            setCustomerData({ ...customerData });
          }}
          value={customerData.phone}
        />
        <TextInput
          label={'Subject'}
          error={customerData.subjectError}
          style={styles.inputStyle}
          theme={inputTheme}
          underlineColor={Colors.blackOpacity25}
          activeUnderlineColor={Colors.blackOpacity50}
          onChangeText={(text) => {
            customerData.subject = text;
            if (customerData.subject?.length > 2) {
              customerData.subjectError = false;
            }
            setCustomerData({ ...customerData });
          }}
        />
        <TextInput
          multiline
          numberOfLines={4}
          maxLength={250}
          label={'Message'}
          theme={inputTheme}
          error={customerData.msgError}
          style={styles.inputMsgStyle}
          underlineColor={Colors.blackOpacity25}
          activeUnderlineColor={Colors.blackOpacity50}
          right={
            <TextInput.Affix text={`${customerData?.message?.length}/250`} />
          }
          onChangeText={(text) => {
            customerData.message = text;
            if (customerData.message?.length >= 10) {
              customerData.msgError = false;
            }
            setCustomerData({ ...customerData });
          }}
        />
        <View style={styles.buttonMenuStyle}>
          <ButtonWithIcon
            label={'CANCEL'}
            labelStyle={styles.labelStyle}
            buttonStyle={styles.cancelBtnStyle}
            onPress={() => navigation.goBack()}
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
  );
};

export default CustomerSupportScreen;
