import AsyncStorage from "@react-native-async-storage/async-storage";

// fonction pour stocker les donnnes localement

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Erreur lors du stockage des donnees", error);
  }
};

// fonction pour recupere les donnes localement

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error("Erreur lors de la recuperation des donnees", error);
  }
  return null;
};
