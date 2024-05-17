import axios from 'axios';
import Constants from '../constants';
import DeviceInfo from 'react-native-device-info';

const api = axios.create({
    baseURL: Constants.url.base,
    timeout: 12000,
    header:{
      'Content-Type':'application/x-www-form-urlencoded'
    }
});
/*const apiMul = axios.create({
    baseURL: Constants.url.base,
    timeout: 60000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    },
    params: {
      'device_brand'       :  (DeviceInfo.getBrand())?DeviceInfo.getBrand():"",
      'device_model'       :  (DeviceInfo.getModel())?DeviceInfo.getModel():"",
      'system_name'        :  (DeviceInfo.getSystemName())?DeviceInfo.getSystemName():"",
      'system_version'     :  (DeviceInfo.getSystemVersion())?DeviceInfo.getSystemVersion():"",
      'android_appVersion' :  "1.0.16",
      'ios_appVersion'     :  "1.0.12",
      'device_name'        :  (DeviceInfo.getDeviceName())?DeviceInfo.getDeviceName():"",
      'device_local'       :  (DeviceInfo.getDeviceLocale())?DeviceInfo.getDeviceLocale():"",
      'device_country'     :  (DeviceInfo.getDeviceCountry())?DeviceInfo.getDeviceCountry():"",
      'time_zone'          :  (DeviceInfo.getTimezone())?DeviceInfo.getTimezone():"",
      'is_emulator'        :  (DeviceInfo.isEmulator())?DeviceInfo.isEmulator():false,
      'is_tablet'          :  (DeviceInfo.isTablet())?DeviceInfo.isTablet():false,
      'is_landscape'       :  (DeviceInfo.isLandscape())?DeviceInfo.isLandscape():false,
   },
});*/
 global.devicetype = true;
 global.per_page = 5;
 global.group_per_page = 5;
 global.search_per_page = global.devicetype ? 7 : 4;
 global.members_per_page = global.devicetype ? 20 :15;
 global.search_blg_per_page = 3;
 global.installedVersion = "1.2"; // have to main correct version based on build taken android or ios.

 global.eventURL = null;
 global.scheme = "https";
 global.annualPage = false;


function setToken(AUTH_TOKEN) {
    //console.log(AUTH_TOKEN);
    //api.defaults.headers.common['token'] = AUTH_TOKEN;
    api.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
    //api.defaults.headers.common['Content-Type'] ='application/x-www-form-urlencoded; charset=UTF-8';
    //api.defaults.headers.common['Accept'] ='application/x-www-form-urlencoded; charset=UTF-8';
}
function cancelToken(){
  var CancelToken = axios.CancelToken;
  var source = CancelToken.source();
}

export {
    api,
    setToken
}
