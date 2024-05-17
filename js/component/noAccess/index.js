/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StatusBar,ScrollView,StyleSheet, Text,View, Image,TouchableWithoutFeedback,Keyboard,
  TouchableOpacity, TextInput, Dimensions, ActivityIndicator, Alert, Animated} from 'react-native';
import { globalColors ,globalImages, api,setToken,saveKey,getKey} from '../../helper';
import stylecust from '../helper/resfont';
import IphoneHeader from '../header/iphonexhr';
import DeviceInfo from 'react-native-device-info';
import {Actions} from 'react-native-router-flux';
import store from '../../store';


export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state={
      isLandscape:DeviceInfo.isLandscape(),
      isTablet:DeviceInfo.isTablet(),
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
      hasNoAccessMsg:store.hasNoAccessMsg
    }
    Dimensions.addEventListener('change', () => {
      this.setState({
        isLandscape:DeviceInfo.isLandscape(),
        isTablet:DeviceInfo.isTablet(),
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
      });
    });
  }
  render() {
    return (
        <TouchableWithoutFeedback onPress={()=>{this.touchPress();Keyboard.dismiss()}}>
          <View style={{ flex: 1, marginTop:stylecust.em(2)}}>
                <Text style={styles.itemHeader}> {store.hasNoAccessMsg?store.hasNoAccessMsg:"You currently have no access to Envision Mobile, please contact your company management to request access"}</Text>
          </View>
        </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.contentListBck,
  },
  itemHeader:{
      fontFamily:'Roboto-Regular',
      fontWeight:'normal',
      fontSize:stylecust.em(1),
      color:globalColors.headerSearchTxt,
      marginBottom:stylecust.em(0.7),
      textAlign:'center',
      marginLeft:7,marginRight:7
    },
});
