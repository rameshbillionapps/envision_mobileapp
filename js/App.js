/**
 * https://stackoverflow.com/questions/33553112/react-native-asyncstorage-fetches-data-after-rendering
 */

import React, { Component } from 'react';
import Router from './router';
import { StatusBar, Text, Platform, View, ActivityIndicator, StyleSheet, BackHandler,Alert, Image, Dimensions, TouchableOpacity} from 'react-native';
import { globalColors ,globalImages, api,setToken,saveKey,getKey} from './helper';
import DeviceInfo from 'react-native-device-info';
import Constants from './constants';
import store from './store';
import stylecust from './component/helper/resfont';

var backhardware = false;
export default class App extends Component<{}> {

    constructor() {
        super();
        this.state = {
          hasToken: false,
          hasNoAccess:false,
          isLoaded: false,
          isLandscape:DeviceInfo.isLandscape(),
          isTablet:DeviceInfo.isTablet(),
          width:Dimensions.get('window').width,
          height:Dimensions.get('window').height,backhardware:false
        };
        Dimensions.addEventListener('change', () => {
          //alert("hi"+DeviceInfo.isLandscape());
          this.setState({
              isLandscape:DeviceInfo.isLandscape(),
              isTablet:DeviceInfo.isTablet(),
              width:Dimensions.get('window').width,
              height:Dimensions.get('window').height
          })
        });
        this.handleBackButton = this.handleBackButton.bind(this);
    }
    handleBackButton = () => {
      if(this.backhardware){
        Alert.alert(
          'Exit',
          'Exiting the application?',
          [
            {text: 'Cancel', onPress: () => {console.log('Cancel Pressed'); this.backhardware=false;return true;}, style: 'cancel'},
            {text: 'OK', onPress: () =>{ console.log('OK Pressed'); BackHandler.exitApp(); this.backhardware=false;return false;}},
            ],
          { cancelable: false }
      );
      return true;
     }else{
      this.backhardware = true;
      return true;
     }
    }
    componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      this.loadData();
    }
    loadData=async()=>{
      this.setState({isLoaded:true});
      try{
        var user = JSON.parse(await getKey('isLogged'));
        //console.log("this.state.isLoaded1dd "+ JSON.stringify(user));
      }catch(e){
        this.setState({isLoaded:false});
      }

      try{
         this.setState({isLoaded:true});
         const loginData = JSON.parse(await getKey('loginData'));
         //console.log("this.state.isLoaded1 "+ JSON.stringify(user));
         //console.log("this.state.isLoadedloginData1 "+ loginData.access_token);
         //console.log("this.state.isLoadedloginData1 "+ loginData.isAccess);
        // console.log("this.state.isLoadedloginData1 "+ JSON.stringify(loginData.expiresOn));

         if (user) {

            /* let today = new Date();
             let expiresOn = new Date(loginData.expiresOn);
             let expiresOnDate = new Date();
             var year = expiresOn.getFullYear(); var mon = expiresOn.getMonth();var dat = expiresOn.getDate()
             expiresOnDate.setFullYear(year, mon, dat);
             console.log(expiresOnDate+"  -- "+today+" checked "+(expiresOnDate.getTime() < today.getTime()));
             if ((expiresOnDate.getTime() === today.getTime())||(expiresOnDate.getTime() < today.getTime())){
               Alert.alert('Alert','Login details are expired. Please login again to get latest details.',[{text: 'OK', onPress: () => {console.log('OK Pressed'); this.setState({hasToken:false,isLoaded:false}); }}],{cancelable:false});
              */

              /* let dataForm = {
                   "email":"vels@coreforce.com",
                   "password":"pearls123!!!"
               }
               //alert(this.state.active+" "+this.state.actMail);
               var formBody = [];

               for (var property in dataForm) {
                 var encodedKey = encodeURIComponent(property);
                 var encodedValue = encodeURIComponent(dataForm[property]);
                 formBody.push(encodedKey + "=" + encodedValue);
               }
               formBody = formBody.join("&");

               this.getToken(formBody).then((responseJson) => {
                   try{
                       //  DeviceStorage.save('loginData', responseJson);
                       if(responseJson && responseJson.status =="ok"){
                         store.updateUser(responseJson);
                         setToken(responseJson.token);
                         saveKey("loginData",responseJson);
                         saveKey("isLogged",responseJson.token);
                         this.setState({isLoaded:false,hasToken:true});
                       } else{
                         this.setState({isLoaded:false,hasToken:false});
                       }
                   }catch(e){
                       console.log(e);
                       this.setState({isLoaded:false});
                   }
               });*/

             //}else{
            //   console.log("DeviceStorage else " +loginData.isAccess);
               setToken(user);
               store.updateUser(loginData);
               store.hasNoAccess = loginData.isAccess?false:true;
               store.hasNoAccessMsg = loginData.isAccessMsg?loginData.isAccessMsg:"You currently have no access to Envision Mobile, please contact your company management to request access";
               this.setState({isLoaded:false,hasToken:true,hasNoAccess:loginData.isAccess?false:true});
             //}
         }else{
            store.hasNoAccess = false;
            store.hasNoAccessMsg = "You currently have no access to Envision Mobile, please contact your company management to request access";
            this.setState({hasToken:false,isLoaded:false,hasNoAccess:false});

           //console.log("DeviceStorage "+DeviceStorage.get('loginData'));
          /*this.setState({isLoaded:true});
           let dataForm = {
               "email":"vels@coreforce.com",
               "password":"pearls123!!!"
           }
           //alert(this.state.active+" "+this.state.actMail);
           var formBody = [];

           for (var property in dataForm) {
             var encodedKey = encodeURIComponent(property);
             var encodedValue = encodeURIComponent(dataForm[property]);
             formBody.push(encodedKey + "=" + encodedValue);
           }
           formBody = formBody.join("&");

           this.getToken(formBody).then((responseJson) => {
               try{
                   //  DeviceStorage.save('loginData', responseJson);
                   if(responseJson && responseJson.status == "ok"){
                     console.log("hitted "+JSON.stringify(responseJson));
                     store.updateUser(responseJson);
                     setToken(responseJson.token);
                     saveKey("loginData",responseJson);
                     saveKey("isLogged",responseJson.token);
                     this.setState({isLoaded:false,hasToken:true});
                   } else{
                     this.setState({isLoaded:false,hasToken:false});
                   }
               }catch(e){
                   console.log(e);
                   this.setState({isLoaded:false});
               }
           });*/
            /*let responseJson = {
                "status": "ok",
                "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiZjcwMWE5NC1iYWIyLTExZTgtYjI1ZC0wMDE1NWQxZTk2MDAiLCJjb21wYW55SWQiOjksImV4cGlyZXNPbiI6IjIwMTktMDMtMDdUMDc6NDU6NDIuNTU2WiJ9.0U_WEUvTxLqmS1cMMrCKDFsjFIYeyMpVfF4H-2kMtMc",
                "expiresOn": "2019-03-07T07:45:42.556Z"
            };
           saveKey("loginData",responseJson);
           saveKey("isLogged","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiZjcwMWE5NC1iYWIyLTExZTgtYjI1ZC0wMDE1NWQxZTk2MDAiLCJjb21wYW55SWQiOjksImV4cGlyZXNPbiI6IjIwMTktMDMtMDdUMDc6NDU6NDIuNTU2WiJ9.0U_WEUvTxLqmS1cMMrCKDFsjFIYeyMpVfF4H-2kMtMc")
           */
         }
      }catch(e){
        console.log(e);
        this.setState({isLoaded:false});
      }
    }
    /*getToken=async(formBody)=>{
      try{
      //console.log("responseformBody "+JSON.stringify(formBody)+" "+Constants.url.login);
          //let response = await api.post(Constants.url.login,formBody);
          return fetch(Constants.url.base+Constants.url.login,{
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json', // <-- Specifying the Content-Type
                }),
                body:JSON.stringify({
                  email:"vels@coreforce.com",
                  password:"pearls123!!!"
                })
              })
              .then((response) => response.json())
              .then(function (response) {

                console.log("response "+JSON.stringify(response));
                return response;
              })
              .catch(function (error) {
                 //this.toggleLoaderOFF();
                //Alert.alert('Error', 'Please try again later.', [{ text: 'ok' }]);
                console.log(error);
                return null;
              });
        //  console.log("response "+JSON.stringify(response));
          //return response;
      }catch(e){
        console.log("error "+e);
        this.setState({isLoaded:false});
      }
    }*/
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillReceiveProps(){
      //setTimeout(()=>{this.setState({isLoaded:true})},100);
    }
    retryBtn=()=>{
      this.setState({isLoaded:true});
      this.loadData();

      /*this.getToken("").then((responseJson) => {
          try{
              //  DeviceStorage.save('loginData', responseJson);
              if(responseJson && responseJson.status =="ok"){
                store.updateUser(responseJson);
                this.setState({isLoaded:false,hasToken:true});
              } else{
                this.setState({isLoaded:false,hasToken:false});
              }
          }catch(e){
              console.log(e);
              this.setState({isLoaded:false});
          }
      });<Image  resizeMode="cover" source={globalImages.splashScreen.splashScreen}
      style={[styles.backgroundImage,{width: (this.state.isLandscape)?this.state.height/1.5:this.state.width/1.5, height: (this.state.isLandscape)?this.state.height/2:this.state.width/2}]} />
      */
    }
    render() {
        // console.log('log ' + this.state.isLoaded + " " + this.state.hasToken);
        if (this.state.isLoaded) {
            return (
                <View style={{flex:1,justifyContent: 'center',
                alignItems: 'center',backgroundColor:"#ffffff"}}>
                     <ActivityIndicator animating={true}
                      size="large"
                      color="#000000"
                      style={styles.loader} />
                </View>
            )
        } else {//if(!this.state.hasToken){
            // console.log('log 2 ' + this.state.isLoaded + " " + this.state.hasToken);
            return (
                <Router randmId={Math.random()} hasToken={this.state.hasToken} hasNoAccess={this.state.hasNoAccess}/>
            );
        } /*else {
          return (
              <View style={{flex:1,justifyContent: 'center',
              alignItems: 'center',backgroundColor:"#ffffff"}}>
                  <Image  resizeMode="cover" source={globalImages.splashScreen.splashScreen}
                style={[styles.backgroundImage,{width: (this.state.isLandscape)?this.state.height/1.5:this.state.width/1.5, height: (this.state.isLandscape)?this.state.height/2:this.state.width/2}]} />
                  <ActivityIndicator animating={this.state.isLoaded}
                    color= {globalColors.searchBtnBck}
                    size="large"
                    style={styles.loader} />
                  {!this.state.hasToken && <View style={{marginTop:5,marginBottom:10}}><Text style={styles.textStyle}>Error to get token details. Please try again later!.</Text></View>}
                  {!this.state.hasToken && <View style={styles.btn}><TouchableOpacity onPress={()=>this.retryBtn()}><Text style={styles.txtBtn}>Retry</Text></TouchableOpacity></View>}
              </View>
          )
        }*/
    }

}

const styles = StyleSheet.create({
    loader: {
    },
    backgroundImage:{
      backgroundColor:'transparent',
      overflow: 'hidden',
      justifyContent:'center'
    },
    textStyle:{
      fontSize:stylecust.em(1),
      fontFamily:"Roboto-Regular",
      fontWeight:"normal"
    },
    btn:{
      padding:10,
      borderRadius:20,
      backgroundColor:globalColors.headerBck
    },
    txtBtn:{
      fontSize:stylecust.em(1),
      fontFamily:"Roboto-Regular",
      fontWeight:"normal"
    }
});
