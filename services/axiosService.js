import axios from "axios";
import { webapibaseurl, datacapturewebapibaseurl } from "../constants/global";
import { AsyncStorage } from "react-native";
var axiosInstance = axios.create({
  baseURL: webapibaseurl
  /* other custom settings */
});
var datacaptureaxiosInstance = axios.create({
  baseURL: datacapturewebapibaseurl
  /* other custom settings */
});
export const getdatacaptureaxious = () => {
  return datacaptureaxiosInstance;
};
export const getaxious = () => {
  return axiosInstance;
};
export const getauthorizationheaderconfig = () => {
  return (async () => {
    const jsonstring = await AsyncStorage.getItem("userToken");
    const json = JSON.parse(jsonstring);
    const headers = {
      Authorization: `Bearer ${json.access_token}`
    };
    return headers;
  })();
};
