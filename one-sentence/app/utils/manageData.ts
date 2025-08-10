import AsyncStorage from "@react-native-async-storage/async-storage";

interface logType {
  id: string;
  date: string | string[];
  content: string | string[];
}

export const storeData = async (value: logType) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(value.id, jsonValue);
  } catch (e) {
    console.log("Error storing data: " + e);
  }
};

export const getAllData = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const allData = await AsyncStorage.multiGet(allKeys);

    allData.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
    console.log("Length of data: " + allData.length);
    console.log(allData);

    return allData;
  } catch (e) {
    console.log("Error getting data: " + e);
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log("Data cleared");
  } catch (error) {
    console.error("Error clearing AsyncStorage: " + error);
  }
};
