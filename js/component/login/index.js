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
import {_emailValidation} from '../helper/validate';
import IphoneHeader from '../header/iphonexhr';
import TextField from '../helper/textField';
import CheckBox from '../helper/checkbox';
import DeviceInfo from 'react-native-device-info';
import Constants from '../../constants';
import store from '../../store';
import {Actions} from 'react-native-router-flux';
import Login from 'react-native-login-keycloak';


type Props = {};


class SelectedArray
{
    constructor()
    {
        selectedItemsArray = [];
    }

    setItem(option)
    {
        selectedItemsArray.push(option);
    }

    getArray()
    {
        return selectedItemsArray;
    }
}


export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state={
      isLandscape:DeviceInfo.isLandscape(),
      isTablet:DeviceInfo.isTablet(),
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
      emailAddress:"",
      password:"",
      focus:false,
      focusPsw:false,
      checked:false,
      uploading:false,
      hidePlacePsw:true,
      hidePlace:true,checkedNew:0,
      showPassword:true,
      IMAGE_HEIGHT: 108,
      IMAGE_HEIGHT_SMALL: 80,
      keyboardFocus:false,
      selection: { start: 1, end: 1 },
      selectionpsw: { start: 0, end: 0 },
    }
    Dimensions.addEventListener('change', () => {
      let height = this.state.isTablet?(this.state.isLandscape?Dimensions.get('window').width/8:Dimensions.get('window').height/8):(this.state.isLandscape?Dimensions.get('window').width/6:Dimensions.get('window').height/6);
      let orgHeight = this.state.isTablet?height*1.5:height;
      this.setState({
        isLandscape:DeviceInfo.isLandscape(),
        isTablet:DeviceInfo.isTablet(),
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        IMAGE_HEIGHT:orgHeight
      });
    });
    selectedArrayRef = new SelectedArray();
    let height = this.state.isTablet?(this.state.isLandscape?this.state.width/8:this.state.height/8):(this.state.isLandscape?this.state.width/6:this.state.height/6);
    let orgHeight = this.state.isTablet?height*1.5:height;
    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(orgHeight);
    this.opacityuser =  new Animated.Value(1);
    this.opacitypsw =  new Animated.Value(1);

    this.setState({
      IMAGE_HEIGHT:orgHeight
    });
  }
  componentWillMount () {


    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
  keyboardWillShow = (event) => {

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: this.state.IMAGE_HEIGHT_SMALL,
     }),
    ]).start();
  };

  keyboardWillHide = (event) => {

    let height = this.state.isTablet?(this.state.isLandscape?this.state.width/8:this.state.height/8):(this.state.isLandscape?this.state.width/6:this.state.height/6);
    let orgHeight = this.state.isTablet?height*1.5:height;

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: orgHeight,
      })
    ]).start();
  };

  getSelectedItems = () =>
  {
    if( selectedArrayRef.getArray().length == 0 )
    {
      //alert('No Item(s) Selected!');
      this.setState({
          checkedNew:0
      });
      return 0;
    }
    else
    {
      this.setState({
          checkedNew:1
      });
    //  alert(" Item(s) Selected!");
      return 1;
    }
  }
  toggleLoader=(uploaded)=>{
    this.setState({
        uploading: uploaded
    })
  }
  componentDidMount(){
    this.loadData();
  }
  loadData=async()=>{
    this.setState({uploading:true});
    try{
      var user = JSON.parse(await getKey('username'));
      var password = JSON.parse(await getKey('password'));
      //console.log("user "+user+" password "+password);
      this.setState({
        emailAddress : user?user:"",
        password:password?password:"",
        uploading:false,
        checked:true,
        hidePlace:user?false:true,
        hidePlacePsw:password?false:true,
        checkedNew:password?1:0,
        previousInputValue:""
      });
    }catch(e){
      this.setState({uploading:false});
    }
  }

  loginSubmit = () =>{
    let height = this.state.isTablet?(this.state.isLandscape?this.state.width/8:this.state.height/8):(this.state.isLandscape?this.state.width/6:this.state.height/6);
    let orgHeight = this.state.isTablet?height*1.5:height;

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: 100,
        toValue: 0,
      }),
      Animated.timing(this.imageHeight, {
        duration: 100,
        toValue: orgHeight,
      })
    ]).start();

      if(this.state.emailAddress==""){
          Alert.alert("Username cannot be empty. Please enter.");
      } else if(this.state.password==""){
          Alert.alert("Password cannot be empty. Please enter.");
      }else{
        this.toggleLoader(true);
        let val = this.getSelectedItems();
        let dataForm = {
            "username":(this.state.emailAddress).trim(),//vels@coreforce.com
            "password":this.state.password,
        }
        //alert(this.state.active+" "+this.state.actMail);
        /*
        "grant_type":"password",
        "client_secret":"N_IHxITIyCYZzQ1GxroYoEK7h2Zpg-LHSsTzU6wp",
        "client_id":"887b6f98-d5a8-4d2c-bca6-6bcd3597e207"//pearls123!!!*/
        var formBody = [];

        for (var property in dataForm) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(dataForm[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        //console.log("this.state.formBody "+formBody);
        /*if(val==1){
            saveKey("username",this.state.emailAddress);
            saveKey("password",this.state.password);
        }else{
          saveKey("username","");
          saveKey("password","");
        }
        let responseJson = {
            "status": "ok",
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiZjcwMWE5NC1iYWIyLTExZTgtYjI1ZC0wMDE1NWQxZTk2MDAiLCJjb21wYW55SWQiOjksImV4cGlyZXNPbiI6IjIwMTktMDMtMDdUMDc6NDU6NDIuNTU2WiJ9.0U_WEUvTxLqmS1cMMrCKDFsjFIYeyMpVfF4H-2kMtMc",
            "expiresOn": "2019-03-07T07:45:42.556Z"
        };
        store.updateUser(responseJson);
        setToken(responseJson.token);
        saveKey("loginData",responseJson);
        saveKey("isLogged",responseJson.token);
        this.setState({uploading:false});

        Actions.homemenu();*/

        this.getToken(formBody).then((responseJson) => {
            try{
                //  DeviceStorage.save('loginData', responseJson);
                console.log("response "+JSON.stringify(responseJson));
              //  console.log("response "+(responseJson.isAccess));

                if(responseJson && responseJson.access_token){
                  console.log("response "+responseJson.isAccess);
                  if(val==1){
                      saveKey("username",this.state.emailAddress);
                      saveKey("password",this.state.password);
                  }else{
                    saveKey("username","");
                    saveKey("password","");
                  }

                  store.updateUser(responseJson);
                  setToken(responseJson.access_token);
                  store.hasNoAccess = responseJson.isAccess?false:true;
                  store.hasNoAccessMsg = responseJson.isAccessMsg?responseJson.isAccessMsg:"You currently have no access to Envision Mobile, please contact your company management to request access";
                  saveKey("loginData",responseJson);
                  saveKey("isLogged",responseJson.access_token);
                  this.setState({uploading:false});
                  Actions.homemenu();
                } else {
                  this.setState({uploading:false});
                  store.hasNoAccess = false;
                  store.hasNoAccessMsg = "You currently have no access to Envision Mobile, please contact your company management to request access";
                  if(responseJson == null){
                    Alert.alert("Alert", "Invalid Username or Password. Please enter valid details.");
                  }else if(responseJson && responseJson.error_description){
                    Alert.alert("Alert", "Invalid Username or Password. Please enter valid details.");
                  }else{
                    Alert.alert("Alert", "Invalid Username or Password. Please enter valid details.");
                  }
                  //Actions.homemenu();
                }
            }catch(e){
                console.log(e);
                this.setState({uploading:false});
                Actions.homemenu();
            }
        });
      }
  }
  getToken=async(formBody)=>{
    try{
    //alert("RequestData "+JSON.stringify(formBody)+"  API :  "+Constants.url.base+Constants.url.login);
        //let response = await api.post(Constants.url.login,formBody);
        return fetch(Constants.url.base+Constants.url.login,{
              method: 'POST',
              headers: new Headers({
                  'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
              }),
              body:formBody
            })
            .then((response) => response.json())
            .then(function (response) {
            //alert("response "+JSON.stringify(response));
              return response;
            })
            .catch(function (error) {
               //this.toggleLoaderOFF();
              //Alert.alert('Error', 'Please try again later.', [{ text: 'ok' }]);
              //alert("errorerror "+error);
              return null;
            });
      //  console.log("response "+JSON.stringify(response));
        //return response;
    }catch(e){
      //alert("error "+e);
      this.setState({uploading:false});
    }
  }
  onPress(checked){
    Keyboard.dismiss();
    if(Platform.OS==='android'){
      let height = this.state.isTablet?(this.state.isLandscape?this.state.width/8:this.state.height/8):(this.state.isLandscape?this.state.width/6:this.state.height/6);
      let orgHeight = this.state.isTablet?height*1.5:height;

      Animated.parallel([
        Animated.timing(this.keyboardHeight, {
          duration: 100,
          toValue: 0,
        }),
        Animated.timing(this.imageHeight, {
          duration: 100,
          toValue: orgHeight,
        })
      ]).start();
    }
  }
  componentDidUpdate() {
   // workaround to allow TextInput to return to end of selection after toggling secureTextEntry
   if (this.state.previousInputValue) {
     this.setState({ password: this.state.previousInputValue, previousInputValue: null });
   }
 }
  onSelectionChange = ({ nativeEvent: { selectionusr, text } }) => {
    //  alert("selec"+text+" "+JSON.stringify(selectionusr));
     this.setState({ selection:selectionusr });
   };
   onSelectionChangepsw = ({ nativeEvent: { selection, text } }) => {
     //console.log("sele22c "+this.state.password.length+" selection "+JSON.stringify(selection));
     this.refs.psw._textInput.setNativeProps({ selection:{ start:this.state.password.length, end:this.state.password.length } })
     this.setState({ selectionpsw:selection});
   };
   onFocusMtdPsw=(e)=>{
      if(Platform.OS==='android'){
         //this.onSelectionChangepsw(e);
         this.setState({focusPsw:true,hidePlacePsw:true,selectionpsw:{"start":this.state.password.length,"end":this.state.password.length}});
         e.target.value = (this.state.password).trim();
         Animated.parallel([
           Animated.timing(this.keyboardHeight, {
             duration: 100,
             toValue: 30,
           }),
           Animated.timing(this.imageHeight, {
             duration: 100,
             toValue: 50,
          }),
         ]).start();
       }else{
        //  this.onSelectionChangepsw(e);
          this.setState({focusPsw:true,hidePlacePsw:true});
       }
   }
   onBlurMtdPsw=(e)=>{
       if(Platform.OS==='android'){
           Animated.timing(
            this.opacityuser, {
              toValue: 1,
              duration: 50
            }
          ).start(()=>{
              this.setState({focusPsw:false,hidePlacePsw:(this.state.password=="")?true:false});
            });
      }else{
        this.setState({focusPsw:false,hidePlacePsw:(this.state.password=="")?true:false});
      }

   }
   onFocusMtd=(e)=>{
      if(Platform.OS==='android'){
         this.setState({focus:true,hidePlace:true});
         Animated.parallel([
           Animated.timing(this.keyboardHeight, {
             duration: 100,
             toValue: 30,
           }),
           Animated.timing(this.imageHeight, {
             duration: 100,
             toValue: 50,
          }),
         ]).start();
       }else{
         this.setState({focus:true,hidePlace:true});
       }
   }
   onBlurMtd=(e)=>{
    if(Platform.OS==='android'){
     Animated.timing(
      this.opacitypsw, {
        toValue: 1,
        duration: 50
      }
     ).start(()=>{
        this.setState({focus:false,hidePlace:(this.state.emailAddress=="")?true:false});
      });
    }else{
      this.setState({focus:false,hidePlace:(this.state.emailAddress=="")?true:false});
    }

   }
   touchPress=()=>{
     if(Platform.OS==='android'){
       let height = this.state.isTablet?(this.state.isLandscape?this.state.width/8:this.state.height/8):(this.state.isLandscape?this.state.width/6:this.state.height/6);
       let orgHeight = this.state.isTablet?height*1.5:height;
       Animated.parallel([
         Animated.timing(this.keyboardHeight, {
           duration: 100,
           toValue: 0,
         }),
         Animated.timing(this.imageHeight, {
           duration: 100,
           toValue: orgHeight,
         })
       ]).start();
     }
   }
  render() {
    let width = this.state.isTablet?(this.state.isLandscape?this.state.height/6:this.state.width/6):(this.state.isLandscape?this.state.height/4:this.state.width/4);
    let height = this.state.isTablet?(this.state.isLandscape?this.state.width/8:this.state.height/8):(this.state.isLandscape?this.state.width/6:this.state.height/6);

    return (

      <Animated.View style={[styles.container,{ paddingBottom: this.keyboardHeight }]}>
        <TouchableWithoutFeedback onPress={()=>{this.touchPress();Keyboard.dismiss()}}>
        <View style={{ flex: 1}}>
          <IphoneHeader />
          <ScrollView ref={'scrollView'}
                keyboardDismissMode='interactive'
                keyboardShouldPersistTaps='always' >

                <View style={{marginLeft:stylecust.em(2),marginRight:stylecust.em(2)}}>
                  <View style={[styles.imageStyleone,{ marginBottom:this.state.isTablet?stylecust.em(1):(this.state.isLandscape)?stylecust.em(0.5):stylecust.em(0.5), marginTop:this.state.isTablet?(Platform.OS=='android')? ((this.state.focus||this.state.focusPsw)?20:stylecust.em(7)):stylecust.em(7):(this.state.isLandscape)?(Platform.OS=='android')? ((this.state.focus||this.state.focusPsw)?20:stylecust.em(3)):stylecust.em(3):(Platform.OS=='android')? ((this.state.focus||this.state.focusPsw)?20:stylecust.em(5)):stylecust.em(5)}]}>
                    <Animated.Image resizeMode='contain' source={globalImages.loginImg.logo} style={{width:this.state.isTablet?width*1.5:width,height:this.imageHeight}}/>
                  </View>
                  <View>
                      <View style={[styles.SectionStyle,{marginTop:this.state.isTablet?stylecust.em(1):stylecust.em(0.5),borderColor:this.state.focus?globalColors.txtLineClr:globalColors.txtLineClrOnnotFocus}]}>
                        {this.state.focus &&<Animated.Text allowFontScaling={false} style={{opacity:(Platform.OS==="android")?this.opacityuser:1,marginLeft:5,marginTop:10, position:'absolute',left:(this.state.isTablet)?31:(Platform.OS=="android")?37:32,bottom:0,top:this.state.focus?(this.state.isTablet?-10:5):(this.state.isTablet?38:33),fontSize:this.state.focus?stylecust.em(1):stylecust.em(1),color:this.state.focus?globalColors.placeholderClrOnFocus:globalColors.placeholderClr,justifyContent:"flex-end",alignItems:'flex-end'}}> Username </Animated.Text>}
                        <Image source={globalImages.loginImg.user} style={[styles.ImageStyle,{margin:(this.state.isTablet)?0:5,width:this.state.isTablet?25:20,height:this.state.isTablet?25:20}]} />
                        <TextField ref={'accmail'}
                           keyboardType='default'
                           returnKeyType='next'
                           onSubmitEditing={() => { this.refs.psw._textInput.focus();}}
                           onChangeText={emailAddress => {this.setState({ emailAddress:emailAddress });if(emailAddress==""){this.setState({hidePlace:true})}}}
                           underlineColorAndroid="transparent"
                           style={{flex:1,fontSize:stylecust.em(1.2),fontFamily:'Roboto-Regular',marginBottom:(Platform.OS=='ios')?1:-11}}
                           onFocus={(e)=>this.onFocusMtd(e)}
                           onBlur={(e)=>this.onBlurMtd(e)}
                           multiline={false}
                           placeholderTextColor= {this.state.focus?globalColors.placeholderClrOnFocus:globalColors.placeholderClr}
                           value={this.state.emailAddress}
                           placeholder={this.state.focus?"":"Username"}
                           autoCapitalize="false"
                           selectionColor={globalColors.txtLineClr}/>
                      </View>
                      <View style={[styles.SectionStyle,{height:this.state.isTablet?80:70,marginTop:this.state.isTablet?stylecust.em(1.5):stylecust.em(0.5),borderColor:this.state.focusPsw?globalColors.txtLineClr:globalColors.txtLineClrOnnotFocus}]}>
                        {this.state.focusPsw && <Animated.Text allowFontScaling={false} style={{opacity:(Platform.OS==="android")?this.opacitypsw:1,marginLeft:5,marginTop:10, position:'absolute',left:(this.state.isTablet)?31:(Platform.OS=="android")?37:34,bottom:0,top:this.state.focusPsw?(this.state.isTablet?-10:-5):(this.state.isTablet?38:25),fontSize:this.state.focusPsw?stylecust.em(1):stylecust.em(1),color:this.state.focusPsw?globalColors.placeholderClrOnFocus:globalColors.placeholderClr,justifyContent:"flex-end",alignItems:'flex-end'}}> Password </Animated.Text>}
                        <Image source={globalImages.loginImg.password} style={[styles.ImageStyle,{margin:(this.state.isTablet)?0:5,width:this.state.isTablet?25:20,height:this.state.isTablet?25:20}]} />
                        <TextField ref={'psw'}
                           keyboardType='default'
                           returnKeyType='go'
                           onSubmitEditing={()=>this.loginSubmit()}
                           secureTextEntry={this.state.showPassword}
                           onChangeText={password => {this.setState({ password:password,previousInputValue:password });if(password==""){this.setState({hidePlacePsw:true})}}}
                           underlineColorAndroid="transparent"
                           style={{flex:1,fontSize:stylecust.em(1.2),fontFamily:'Roboto-Regular',marginBottom:(Platform.OS=='ios')?1:-11}}
                           onFocus={(e)=>{this.onFocusMtdPsw(e)}}
                           onBlur={(e)=>this.onBlurMtdPsw(e)}
                           multiline={false}
                           placeholder={this.state.focusPsw?"":"Password"}
                           placeholderTextColor= {this.state.focusPsw?globalColors.placeholderClrOnFocus:globalColors.placeholderClr}
                           value={this.state.password}
                           onSelectionChange={(e)=>this.onSelectionChangepsw(e)}
                           selection={this.state.selectionpsw}
                           selectionColor={globalColors.txtLineClr}/>
                        <TouchableOpacity onPress={()=>{this.setState({showPassword:!this.state.showPassword,password:"",previousInputValue:this.state.password,selectionpsw:{"start":this.state.password.length,"end":this.state.password.length}})}} style={{marginTop:-15,marginBottom:0}}><Image source={this.state.showPassword?globalImages.loginImg.EyeiconHide:globalImages.loginImg.eyeicon} style={{width:this.state.isTablet?25:25,height:this.state.isTablet?25:25}} /></TouchableOpacity>

                      </View>
                      <View style={{marginTop:this.state.isTablet?stylecust.em(2):stylecust.em(1),marginLeft:this.state.isTablet?15:15}}>
                          {(this.state.checkedNew==0)  && <CheckBox
                            size = { this.state.isTablet?25:20 }
                            keyValue = { 1 }
                            selectedArrayObject = { selectedArrayRef }
                            checked = {false}
                            color =  {this.state.checked?globalColors.txtLineClrOnnotFocus:globalColors.txtLineClr}
                            label = "Remember Me"
                              onPress={(checked)=>this.onPress(checked)}
                          />}
                          {(this.state.checkedNew==1) && <CheckBox
                            size = { this.state.isTablet?25:20 }
                            keyValue = { 1 }
                            selectedArrayObject = { selectedArrayRef }
                            checked = {true}
                            color =  {this.state.checked?globalColors.txtLineClrOnnotFocus:globalColors.txtLineClr}
                            label = "Remember Me"
                              onPress={(checked)=>this.onPress(checked)}
                          />}
                      </View>
                      <View>
                        <TouchableOpacity onPress={()=>this.loginSubmit()} underlayColor = "rgba(0,0,0,0.6)" style = {[styles.selectedArrayItemsBtn,{marginTop:this.state.isTablet?stylecust.em(2):stylecust.em(1),padding:this.state.isTablet?20:15}]}>
                          <Text style = { styles.btnText }>SIGN IN</Text>
                        </TouchableOpacity>
                      </View>

                  </View>

        </View>
        </ScrollView>
        {this.state.uploading && <View style={styles.overlay}>
              <ActivityIndicator
                  animating={true}
                  color='#ffffff'
                  size="large"
                  style={[styles.activityIndicator,{opacity: this.state.uploading ? 3.0 : 0.0}]}/>
          </View>}
        </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}
/*  <View style={{marginTop:stylecust.em(2),justifyContent:"center",alignItems:'center'}}>
      <Text style={styles.txt}> Don't have an account?<Text style={styles.txtBtn}> Sign Up</Text></Text>
  </View><View style={{marginTop:(this.state.isTablet)?stylecust.em(4):stylecust.em(2),justifyContent:"flex-end",alignItems:'center',marginBottom:stylecust.em(1),}}>
    <TouchableOpacity onPress = { this.getSelectedItems }>
      <Image resizeMode='cover' source={globalImages.loginImg.forgotpsw} style={{width:(this.state.isTablet)?45:25,height:(this.state.isTablet)?45:25}}/>
    </TouchableOpacity>
</View>*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.contentListBck,
  },
  imageStyleone:{
    justifyContent:'center',
    alignItems:'center',
  },
  textBoxStyle:{
    marginTop:10,
    marginBottom:10,
    borderBottomWidth:2,
    marginLeft:10,
    marginRight:10,
    fontSize:stylecust.em(1),
    fontFamily:"Roboto-Regular"
  },
  SectionStyle: {
   flexDirection: 'row',
   justifyContent: 'flex-end',
   alignItems: 'flex-end',
   backgroundColor: '#fff',
   borderBottomWidth:2,
   borderColor: '#000',
   height: 80,
   padding:10,
   marginTop:stylecust.em(3)
},

ImageStyle: {
   marginRight:7,
   height: 25,
   width: 25,
   resizeMode : 'stretch',
   alignItems: 'center'
},
 selectedArrayItemsBtn:
  {
    marginTop: stylecust.em(1),
    padding: 25,
    backgroundColor: globalColors.btnBck ,
    borderRadius:50,
    alignItems: 'center',
    marginLeft:stylecust.em(0.5),
    marginRight:stylecust.em(0.5)
  },

  btnText:
  {
    color: 'white',
    alignItems: 'center',
    justifyContent:'center',
    fontSize: stylecust.em(1.2),
    fontFamily:'Roboto-Bold',
    fontWeight:'bold'
  },
  txt:{
    fontSize: stylecust.em(1.1),
    fontFamily:"Roboto-Regular",
    color:globalColors.textLoginColor,
    paddingLeft: 10
  },
  txtBtn:{
    fontSize: stylecust.em(1.1),
    fontFamily:"Roboto-Bold",
    fontWeight:'bold',
    color:globalColors.txtLineClr,
    paddingLeft: 10
  },
  overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: '#444444',
      opacity: 0.7,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width, justifyContent: 'center',
      alignItems: 'center',
  },activityIndicator: {
      justifyContent: 'center',
      alignItems: 'center',
      height:  Dimensions.get('window').height,
  }
});
