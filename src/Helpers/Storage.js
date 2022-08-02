import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value);
  } catch (error) {
    return error;
  }
};

export const getStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    if (value) {
      return value;
    }
  } catch (error) {
    return error;
  }
};

export const removeStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value);
  } catch (error) {
    return error;
  }
};
