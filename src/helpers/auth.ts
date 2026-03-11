import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAuth = async () => {
  const auth = await AsyncStorage.getItem("auth");

  return auth ? JSON.parse(auth) : null;
};

export const saveAuth = async (auth: any) => {
  await AsyncStorage.setItem("auth", JSON.stringify(auth));
};
