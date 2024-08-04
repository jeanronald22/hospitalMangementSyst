import { login, getUserInfo } from "../api/dataService";
import { getData, storeData } from "./stockage";

export const authenticateUser = async (username, password) => {
  try {
    const data = await login(username, password);
    // stokage dans le local storage
    await storeData("newToken", data.access);
    await storeData("newTokenRefresh", data.refresh);
    // recupereations des info
    const token = await getData("newToken");
    const userInfo = await getUserInfo(token);
    return userInfo;
  } catch (error) {
    throw new Error("authentification echouer", error);
  }
};
