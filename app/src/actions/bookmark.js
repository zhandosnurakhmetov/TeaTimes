import { AsyncStorage } from 'react-native';

export const bookmarkPressed = async book => {
  try {
    const { id } = book;
    const value = await AsyncStorage.getItem(id);
    if (value !== null) {
      console.log('removed');
      await AsyncStorage.removeItem(id);
      return false;
    }
    try {
      console.log('saved');
      await AsyncStorage.setItem(id, JSON.stringify(book));
    } catch (error) {
      console.log('ERROR IN SAVING OBJECT');
    }
    return true;
  } catch (error) {
    console.log('ERROR IN BOOKMARK ACTION');
  }
};

export const isBookInFavorite = async book => {
  const { id } = book;
  const value = await AsyncStorage.getItem(id);

  return value !== null;
};
