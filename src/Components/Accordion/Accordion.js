import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  TextInput,
  UIManager,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';

import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { ActionTypes, ImagePaths } from '../../Constants';

import Colors from '../../Styles/Colors';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Accordion = ({ title, body, vendorId, faqId, accessToken }) => {
  const disptach = useDispatch();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(body);

  const onPress = () => {
    LayoutAnimation.linear();
    setOpen(!open);

    if (open === false) {
      setValue(body);
    }
  };

  const deleteFaq = () => {
    disptach({
      type: ActionTypes.DELETE_VENDOR_FAQ,
      payload: {
        authorization: accessToken,
        VendorID: vendorId,
        FaqID: faqId,
      },
    });
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.accordionHeader}
        onPress={onPress}>
        <Text style={styles.accordionHeaderText}>{title}</Text>

        <AntDesign
          name="up"
          size={16}
          color="black"
          style={{ transform: [{ rotate: open ? '360deg' : '180deg' }] }}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.accordionBody}>
          <TextInput
            maxLength={20}
            placeholder="write here..."
            style={styles.accordionBodyText}
            value={value}
            onChangeText={(text) => setValue(text)}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.btnDeleteStyle,
              {
                marginEnd:
                  body !== value ? moderateScale(-22) : moderateScale(-11),
              },
            ]}
            onPress={deleteFaq}>
            <Image source={ImagePaths.IC_DELETE} style={styles.icDeleteStyle} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateVerticalScale(12),
    borderRadius: moderateScale(6),
    marginTop: moderateVerticalScale(12),
    marginHorizontal: moderateScale(6),
    backgroundColor: Colors.theme,
  },
  accordionHeaderText: {
    flexShrink: moderateScale(1),
    fontSize: scale(14),
    fontWeight: 'bold',
    lineHeight: moderateScale(24),
    textAlign: 'left',
    color: Colors.blackOpacity80,
  },
  accordionBody: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateVerticalScale(12),
    borderBottomLeftRadius: moderateScale(6),
    borderBottomRightRadius: moderateScale(6),
    marginHorizontal: moderateScale(6),
  },
  accordionBodyText: {
    flex: 1,
    fontSize: scale(13),
    textAlign: 'left',
    color: Colors.blackOpacity80,
    backgroundColor: Colors.whiteOpacity25,
  },
  btnAddStyle: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(35),
    height: moderateVerticalScale(35),
    top: moderateScale(-5),
  },
  btnDeleteStyle: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(35),
    height: moderateVerticalScale(35),
    marginEnd: moderateScale(-22),
    top: moderateScale(-5),
  },
  icDeleteStyle: {
    width: moderateScale(15),
    height: moderateVerticalScale(15),
  },
  icAddStyle: {
    width: moderateScale(12),
    height: moderateVerticalScale(12),
  },
});
