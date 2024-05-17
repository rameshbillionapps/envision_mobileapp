/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, TouchableWithoutFeedback, TouchableHighlight,StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity, Keyboard,ActivityIndicator} from 'react-native';
import FilterMenu from '../../filtermenu';
import TextField from '../../helper/textField';
import Icon from '../../icon';
import { api,globalImages, globalColors } from '../../../helper';
import stylecust from '../../helper/resfont';
import Constants from '../../../constants';
import DeviceInfo from 'react-native-device-info';
import store from '../../../store';
import {Actions} from 'react-native-router-flux';
import {observable} from 'mobx';
import axios from 'axios';
import CheckBox from '../../helper/checkbox';

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

  constructor(props) {
      super(props);
      //console.log(' inside actc ' + JSON.stringify(this.props));
     this.state = {
          tabBarWidth: 0,
          loading: false,
          fetchMore: false,
          data: [],
          active:"item_num",
          activeTxt:"Item Number",
          randomId:Math.random(),
          actMail:"",
          focus:false,
          isLandscape:DeviceInfo.isLandscape(),
          isTablet:DeviceInfo.isTablet(),
          width:Dimensions.get('window').width,
          height:Dimensions.get('window').height,
          focusTxt:false,
          fetching:false,
          checked:true,checkedNew:0,loaded:true,
          submitActMail:"",
          submitchecked:true
      }
      selectedArrayRef = new SelectedArray();
      //  alert("hibr " +Dimensions.get('window').height);
      this.openFilter = this.openFilter.bind(this);
      Dimensions.addEventListener('change', () => {
        //alert("hi " +Dimensions.get('window').height);
        this.setState({
            isLandscape:DeviceInfo.isLandscape(),
            isTablet:DeviceInfo.isTablet(),
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height
        })
      });

  }

  toggleLoaderON=()=>{
    //this.setState({loading:true});
    this.props.updateLoading(true);
  }
  toggleLoaderOFF=()=>{
  //  this.setState({loading:false});
    this.props.updateLoading(false);
  }
  openFilter = (value,txt) =>{
     //Alert.alert("heloooshai "+ value);
     this.setState({active:value,activeTxt:txt,actMail:"",data:[],checked:true});
     store.product = {
        next_page: 0,
        active:value,
        activeTxt:txt,
        activeNumber:"",
        @observable data: []
     }
   }
   subGeneral=()=>{
     Keyboard.dismiss();
     if (this.state.loading)
       return;


     if(this.state.active==""){
        Alert.alert('Alert', 'Please select the value to search.');
     }else if(!this.state.actMail){
       Alert.alert('Alert', this.state.activeTxt+' cannot be empty.');
     }else if(this.state.actMail==""){
       Alert.alert('Alert', this.state.activeTxt+' cannot be empty.');
     } else{
       this.toggleLoaderON();
       this.setState({submitchecked:this.state.checked?1:0,submitActMail:this.state.actMail})
       /*let dataForm = {
         'item_key':this.state.active,
         'item_value':this.state.actMail
       }
       //alert(this.state.active+" "+this.state.actMail);
       var formBody = [];

       for (var property in dataForm) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(dataForm[property]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");
         console.log("this.state.formBody "+formBody);*/
        //this.setState({ animating: false, isLoading: false });
       //this.toggleLoader();
       //alert("store.tokenLogin.token "+store.tokenLogin.access_token)
       this.setState({
       }, () => {
         this.getProductNumber().then((responseJson) => {
             //  this._toast.show(data.msg);operation=loginUser&log=Admin&pwd=zYn5LWYbgCJ@VpSs8kA$PLkd&device_udid=52053213asdf2213asdfadsf&device_type=android
             //alert("data " + " " + responseJson);
             //let loginData = responseJson.data.groups;
             this.toggleLoaderOFF();
             if(responseJson && responseJson.data){
                store.updateRouteData("product",responseJson.data,this.state.active,this.state.activeTxt,this.state.actMail);
                if(responseJson.data.data.length>0){
                  this.setState({data:responseJson.data.data});
                  this.setState({focus:true});
                }else{
                  this.setState({data:[]});
                  if(responseJson.data){
                    Alert.alert("Alert",responseJson.data.data.message)
                  }else{
                     Alert.alert("Alert","No results for this "+this.state.activeTxt+". Please try with a valid one.")
                  }
                }
                 //console.log("getRouteData "+JSON.stringify(store.getRouteData(store.currentroute)));
             }else if(responseJson){
               this.setState({data:[]});
               if(responseJson.data){
                 Alert.alert("Alert",responseJson.data.message)
               }else{
                  Alert.alert("Alert","No results for this "+this.state.activeTxt+". Please try with a valid one.")
               }
             }

             /*if (loginData != null && loginData.message) {
               Alert.alert('Success', loginData.message, [{ text: 'OK', onPress: () => {console.log('success')}}]);
             } else {
               //this.toggleLoader();
               if (loginData != null && loginData.message) {
                 Alert.alert("Error", loginData.message);
               } else {
                 Alert.alert("Error" , loginData.pass_error);
               }
             }*/
           });
       });
     }
   }

   async getProductNumber() {
     try {
             let RouteData = store.getRouteData('product');
             let page = 1;
             //console.log(this.state.fetching+" RouteData['next_page'] "+RouteData['next_page']);
             if(this.state.fetching && RouteData['next_page']==0){
                page = 0;
             }else if(this.state.fetching && RouteData['next_page']){
                page = RouteData['next_page'];
             }
             //let val = this.state.checked?1:0;
            //console.log(val+" RouteData['next_page'] "+this.state.checkedNew);
            if(page>0){

                 let dataForm = {
                   'item_key':this.state.active,
                   'item_value':(this.state.submitActMail).trim(),
                   'page':page,
                   'per_page':5,
                   'availability':this.state.submitchecked
                 }
                 //alert(this.state.active+" "+this.state.actMail);
                 var formBody = [];

                 for (var property in dataForm) {
                   var encodedKey = encodeURIComponent(property);
                   var encodedValue = encodeURIComponent(dataForm[property]);
                   formBody.push(encodedKey + "=" + encodedValue);
                 }
                 formBody = formBody.join("&");
                  //console.log("this.state.formBody "+formBody);


                  const response = await api.post(Constants.url.product, formBody);
              /* let response={"data":[{"company":"BNO","parentSku":"10003","descriptionShort":" UNIVERSAL TRAY","descriptionLong":"UNIVERSAL TRAY","sbuId":"BNO","commodity":"PSC","prodLine":"B2  ","genderId":"U","supplierNum":null,"itemClass":"BATH","invnetoryType":"S","itemGroupId":"GEN","category":null,"material":"PS   ","materialDescription":"100% PS","imageLocation":"10003CLR.JPG","color":"CLR            ","size":"NS   ","colorDescription":"CLEAR","dimensions":{"carton":{"length":"16","width":"9","height":"13.79"},"piece":{"length":"12.752","width":"8.5","height":"3.5"},"weight":{"carton":"11","piece":"1.833"}},"pack":{"masterPack":"6","innerPack1":"1","innerPack2":null},"totalAvailToSell":"0","totalAvailNow":"0","variants":{"sku":"10003-CLR-B2BU","custNum":"BCF010  ","parentUpcNum":"841179101132","price":{"sellPrice":"6","retailPrice":"13"},"retailerCommodity":"PSC","finiteInventory":"N","availability":{"availNow":"ALW#0","availToSell":"ALW#0"}}},{"company":"BNO","parentSku":"10003","descriptionShort":" UNIVERSAL TRAY","descriptionLong":"UNIVERSAL TRAY","sbuId":"BNO","commodity":"PSC","prodLine":"E   ","genderId":"U","supplierNum":null,"itemClass":"BATH","invnetoryType":"S","itemGroupId":"GEN","category":null,"material":"PS   ","materialDescription":"100% PS","imageLocation":"10003CLR.JPG","color":"CLR            ","size":"NS   ","colorDescription":"CLEAR","dimensions":{"carton":{"length":"17.5","width":"14","height":"10.2"},"piece":{"length":"12.75","width":"8.5","height":"3.5"},"weight":{"carton":"10.2","piece":"1.49"}},"pack":{"masterPack":"6","innerPack1":"3","innerPack2":null},"totalAvailToSell":"0","totalAvailNow":"0","variants":{"sku":"10003-CLR-FE","custNum":"FRE001  ","parentUpcNum":null,"price":{"sellPrice":"6.5","retailPrice":"13"},"retailerCommodity":"PSC","finiteInventory":"N","availability":{"availNow":"ALW#0,DIR#0","availToSell":"ALW#0,DIR#0"}}},{"company":"BNO","parentSku":"10003","descriptionShort":" UNIVERSAL TRAY","descriptionLong":"UNIVERSAL TRAY","sbuId":"BNO","commodity":"PSC","prodLine":"E   ","genderId":"U","supplierNum":null,"itemClass":"TBD ","invnetoryType":"S","itemGroupId":"GEN","category":null,"material":"PS   ","materialDescription":"100% PS","imageLocation":"10003CLREROP2.JPG","color":"CLR            ","size":"NS   ","colorDescription":"CLEAR","dimensions":{"carton":{"length":"16.25","width":"9.25","height":"13.125"},"piece":{"length":"12.75","width":"8.5","height":"3.5"},"weight":{"carton":"10.95","piece":"1.825"}},"pack":{"masterPack":"6","innerPack1":"1","innerPack2":null},"totalAvailToSell":"0","totalAvailNow":"0","variants":{"sku":"10003-CLR-EROP2","custNum":"ROS001  ","parentUpcNum":null,"price":{"sellPrice":"6.5","retailPrice":"13"},"retailerCommodity":"PSC","finiteInventory":"N","availability":{"availNow":"ALW#0","availToSell":"ALW#0"}}},{"company":"BNO","parentSku":"10003","descriptionShort":" UNIVERSAL TRAY","descriptionLong":"UNIVERSAL TRAY","sbuId":"BNO","commodity":"PSC","prodLine":"E   ","genderId":"U","supplierNum":null,"itemClass":"TBD ","invnetoryType":"S","itemGroupId":"GEN","category":null,"material":"PS   ","materialDescription":"100% PS","imageLocation":"10003CLREROP1.JPG","color":"CLR            ","size":"NS   ","colorDescription":"CLEAR","dimensions":{"carton":{"length":"16.142","width":"9.055","height":"13.78"},"piece":{"length":"12.835","width":"8.268","height":"3.543"},"weight":{"carton":"11.012","piece":"1.835"}},"pack":{"masterPack":"6","innerPack1":"1","innerPack2":null},"totalAvailToSell":"0","totalAvailNow":"0","variants":{"sku":"10003-CLR-EROP1","custNum":"ROS001  ","parentUpcNum":null,"price":{"sellPrice":"6.5","retailPrice":"13"},"retailerCommodity":"PSC","finiteInventory":"N","availability":{"availNow":"ALW#0,DIR#0,LA #0","availToSell":"ALW#0,DIR#0,LA #0"}}},{"company":"BNO","parentSku":"10003","descriptionShort":" UNIVERSAL TRAY","descriptionLong":"UNIVERSAL TRAY","sbuId":"BNO","commodity":"PSC","prodLine":"E   ","genderId":"U","supplierNum":null,"itemClass":"BATH","invnetoryType":"S","itemGroupId":"GEN","category":null,"material":"PS   ","materialDescription":"100% PS","imageLocation":"10003CLR.JPG","color":"CLR            ","size":"L    ","colorDescription":"CLEAR","dimensions":{"carton":{"length":"9.252","width":"14.567","height":"16.142"},"piece":{"length":null,"width":null,"height":null},"weight":{"carton":"12.125","piece":"2.021"}},"pack":{"masterPack":"6","innerPack1":"1","innerPack2":null},"totalAvailToSell":"0","totalAvailNow":"0","variants":{"sku":"10003-CLR-ERO-L","custNum":"ROT001  ","parentUpcNum":null,"price":{"sellPrice":"6.5","retailPrice":"13"},"retailerCommodity":"PSC","finiteInventory":"N","availability":{"availNow":"ALW#0","availToSell":"ALW#0"}}},{"company":"BNO","parentSku":"10003","descriptionShort":" UNIVERSAL TRAY","descriptionLong":"UNIVERSAL TRAY","sbuId":"BNO","commodity":"PSC","prodLine":"E   ","genderId":"U","supplierNum":null,"itemClass":"BATH","invnetoryType":"S","itemGroupId":"GEN","category":null,"material":"PS   ","materialDescription":"100% PS","imageLocation":"10003CLR.JPG","color":"CLR            ","size":"NS   ","colorDescription":"CLEAR","dimensions":{"carton":{"length":"16.25","width":"9.25","height":"14.5"},"piece":{"length":"12.835","width":"8.268","height":"3.543"},"weight":{"carton":"10","piece":"1.667"}},"pack":{"masterPack":"6","innerPack1":"1","innerPack2":null},"totalAvailToSell":"0","totalAvailNow":"0","variants":{"sku":"10003-CLR-EP1","custNum":"Z9999   ","parentUpcNum":null,"price":{"sellPrice":"6.5","retailPrice":"13"},"retailerCommodity":"PSC","finiteInventory":"N","availability":{"availNow":"ALW#0","availToSell":"ALW#0"}}},{"company":"BNO","parentSku":"10003","descriptionShort":" UNIVERSAL TRAY","descriptionLong":"UNIVERSAL TRAY","sbuId":"BNO","commodity":"PSC","prodLine":"E   ","genderId":"U","supplierNum":null,"itemClass":"TBD ","invnetoryType":"S","itemGroupId":"GEN","category":null,"material":"PS   ","materialDescription":"100% PS","imageLocation":"10003CLREDDP2.JPG","color":"CLR            ","size":"NS   ","colorDescription":"CLEAR","dimensions":{"carton":{"length":"15.75","width":"9.5","height":"13.75"},"piece":{"length":null,"width":null,"height":null},"weight":{"carton":"11","piece":"1.833"}},"pack":{"masterPack":"6","innerPack1":"1","innerPack2":null},"totalAvailToSell":"0","totalAvailNow":"0","variants":{"sku":"10003-CLR-EDDP2","custNum":"DDS001  ","parentUpcNum":null,"price":{"sellPrice":"6.5","retailPrice":"13"},"retailerCommodity":"PSC","finiteInventory":"N","availability":{"availNow":"ALW#0,FON#0","availToSell":"ALW#0,FON#0"}}},{"company":"BNO","parentSku":"10003","descriptionShort":" UNIVERSAL TRAY","descriptionLong":"UNIVERSAL TRAY","sbuId":"BNO","commodity":"PSC","prodLine":"E   ","genderId":"U","supplierNum":null,"itemClass":"TBD ","invnetoryType":"S","itemGroupId":"GEN","category":null,"material":"PS   ","materialDescription":"Acrylic 99% 5% Rubber","imageLocation":"10003CLR.JPG","color":"CLR            ","size":"NS   ","colorDescription":"CLEAR","dimensions":{"carton":{"length":"9.252","width":"14.567","height":"16.142"},"piece":{"length":null,"width":null,"height":null},"weight":{"carton":"12.125","piece":"2.021"}},"pack":{"masterPack":"6","innerPack1":"1","innerPack2":null},"totalAvailToSell":"0","totalAvailNow":"0","variants":{"sku":"10003-CLR-EBU","custNum":"LXL001  ","parentUpcNum":null,"price":{"sellPrice":"6.5","retailPrice":"13"},"retailerCommodity":"PSC","finiteInventory":"N","availability":{"availNow":null,"availToSell":null}}},{"company":"BNO","parentSku":"10003","descriptionShort":" UNIVERSAL TRAY","descriptionLong":"UNIVERSAL TRAY","sbuId":"BNO","commodity":"PSC","prodLine":"E   ","genderId":"U","supplierNum":null,"itemClass":"BATH","invnetoryType":"S","itemGroupId":"GEN","category":null,"material":"PS   ","materialDescription":"100% PS","imageLocation":"10003CLR.JPG","color":"CLR            ","size":"NS   ","colorDescription":"CLEAR","dimensions":{"carton":{"length":"16.13","width":"9","height":"13.88"},"piece":{"length":null,"width":null,"height":null},"weight":{"carton":"10.85","piece":"1.808"}},"pack":{"masterPack":"6","innerPack1":"1","innerPack2":null},"totalAvailToSell":"0","totalAvailNow":"0","variants":{"sku":"10003-CLR-E","custNum":"Z9999   ","parentUpcNum":"841179101132","price":{"sellPrice":"6.5","retailPrice":"13"},"retailerCommodity":"PSC","finiteInventory":"N","availability":{"availNow":"ALW#0,FON#0","availToSell":"ALW#0,FON#0"}}},{"company":"BNO","parentSku":"10003","descriptionShort":" UNIVERSAL TRAY","descriptionLong":"UNIVERSAL TRAY","sbuId":"BNO","commodity":"PSC","prodLine":"B   ","genderId":"U","supplierNum":null,"itemClass":"BATH","invnetoryType":"S","itemGroupId":"GEN","category":null,"material":"PS   ","materialDescription":"100% PS","imageLocation":"10003CLR.JPG","color":"CLR            ","size":"NS   ","colorDescription":"CLEAR","dimensions":{"carton":{"length":"16.142","width":"9.055","height":"13.78"},"piece":{"length":"12.75","width":"8.5","height":"3.5"},"weight":{"carton":"11.012","piece":"1.835"}},"pack":{"masterPack":"6","innerPack1":"1","innerPack2":null},"totalAvailToSell":"807","totalAvailNow":"807","variants":{"sku":"10003-CLR","custNum":"Z9999   ","parentUpcNum":"841179101132","price":{"sellPrice":"6.5","retailPrice":"13"},"retailerCommodity":"PSC","finiteInventory":"N","availability":{"availNow":"ALW#807","availToSell":"ALW#807"}}}]}
      */
                // store.updateRouteData("product",response,this.state.active,this.state.activeTxt,this.state.actMail);
               try{
                 //console.log("data 13 " + " " + JSON.stringify(response));
                 //console.log("data 1 " + " " + this.state.active);
                  //  selectedArrayRef = new SelectedArray();
                  return response;


               }catch(Error){
                 //console.log("data 3 responseJson2 "+Error);
                 this.toggleLoaderOFF();
                 //Alert.alert('Alert', 'Please try again later.', [{ text: 'ok' }]);
                 return "";
               }
        }else{
          return "";
        }
     }
     catch (error) {
          //console.log("data 3 responseJson1 "+error);
         this.toggleLoaderOFF();
         //Alert.alert('Alert', 'Please try again later.', [{ text: 'ok' }]);
         Alert.alert('Alert', 'Please search with more specific input to get the results appropriately.', [{ text: 'ok' }]);
          return "";
     }
   }

   componentDidMount(){
//alert("hai"+this.getSelectedItems())
       /*if(store.currentroute=="product"){
        //  console.log("getRouteDatad Product "+JSON.stringify(store.getRouteData(store.currentroute)));
          // alert("didmount");

          let dataRoute = store.getRouteData(store.currentroute);
         console.log("store.currentroute "+store.currentroute+" dataRoute.activeNumber "+dataRoute.active+" dataRoute "+dataRoute.data.length);

          if(dataRoute && dataRoute.activeNumber!=""){
            this.setState({data:dataRoute.data,
              active:dataRoute.active,
              activeTxt:dataRoute.activeTxt,
              actMail:dataRoute.activeNumber});
          }
        }*/
      /*if(this.state.actMail!=""){
       this.getProductNumber(this.state.actMail).then((responseJson) => {
         //  this._toast.show(data.msg);operation=loginUser&log=Admin&pwd=zYn5LWYbgCJ@VpSs8kA$PLkd&device_udid=52053213asdf2213asdfadsf&device_type=android
         //alert("data " + " " + responseJson);
         //let loginData = responseJson.data.groups;
         this.toggleLoaderOFF();
         if(responseJson && responseJson.data && responseJson.data.length>0){
             this.setState({data:responseJson.data});
         }else if(responseJson){
           this.setState({data:[]});
           Alert.alert("Success","No data to display. Please try again later!.")
         }

         /*if (loginData != null && loginData.message) {
           Alert.alert('Success', loginData.message, [{ text: 'OK', onPress: () => {console.log('success')}}]);
         } else {
           //this.toggleLoader();
           if (loginData != null && loginData.message) {
             Alert.alert("Error", loginData.message);
           } else {
             Alert.alert("Error" , loginData.pass_error);
           }
         }*/
       /*});
     }*/
   }
   loadMethod=()=>{
     //alert("hai "+this.state.checkedNew)
     this.setState({focus:!this.state.focus});
   }
   openNextPage=(data,list,index)=>{
      //console.log("data,list,index "+data+","+list+","+index)
      Actions.push('ProductDetailsView',{list:data ,index:index});
   }
   dynamicListNew=()=>{

      let width = this.state.isTablet?(this.state.isLandscape?this.state.height/3.15:this.state.width/2.9):(this.state.isLandscape?this.state.height/4:this.state.width/3);
      let height = this.state.isTablet?(this.state.isLandscape?this.state.width/6:this.state.height/8.3):(this.state.isLandscape?this.state.width/6:this.state.height/5.5);
      if(this.state.data && this.state.data.length>0)
      {
        return( <View style={{justifyContent:"center"}}>
               {this.state.data.map((val,index)=>{
                   var imageInx = val.imageLocation.lastIndexOf("/");
                   var imageInxFin = val.imageLocation.substring(imageInx+1);
                   var imageFlag = (imageInxFin.indexOf(".")>-1)?true:false;

                   console.log("this.state.data "+val.imageLocation+"imageInxFin "+imageInxFin);
                   return(<TouchableWithoutFeedback  onPress={()=>{this.openNextPage(this.state.data[index],index)}}>
                             <View style={{marginLeft:-10,marginRight:-10,backgroundColor:globalColors.subHeaderBck}}>
                                 <View style={{marginLeft:10,marginRight:10,marginBottom:this.state.isTablet?30:15}}>
                                     <View style={{flex:1,backgroundColor:globalColors.contentListBck,flexDirection:"row"}}>
                                         <View style={{flex:0.4,marginLeft:10,marginRight:10}}>
                                               {(imageInxFin.indexOf(".")>-1 && this.state.loaded) && <View style={[styles.overlay,{  flex: 1,top:(Platform.OS=="ios")?15:20,bottom:10,backgroundColor:"#ccc",width:(this.state.isTablet)?((Platform.OS=='ios')?200:120):100,height:(this.state.isTablet)?120:100}]}>
                                                <Text allowFontScaling={false} style={{fontFamily: 'Lato-Regular',color:"#595959",fontSize: 14, textAlign:'center'}} > Loading ... </Text>
                                               </View>}
                                               {imageFlag && <Image
                                                 key = {val.imageLocation}
                                                 style={{
                                                 flex: 1,
                                                 width: null,
                                                 height: null,
                                                 resizeMode: this.state.isTablet?'contain':'contain'}}
                                                 source={{uri:val.imageLocation,cache: 'force-cache'}}
                                                 onLoadStart={() => {
                                                    this.setState({loaded:(imageInxFin.indexOf(".")>-1)?true:false})
                                                 }}
                                                 onLoad={()=>{
                                                   this.setState({loaded:false})
                                                 }}/>}
                                                 {!imageFlag && <Image
                                                   key = {val.imageLocation}
                                                   style={{
                                                   flex: 1,
                                                   width: null,
                                                   height: null,
                                                   resizeMode: this.state.isTablet?'contain':'contain'}}
                                                   source={globalImages.icons.activity.no_image_icon}
                                                   onLoadStart={() => {
                                                      this.setState({loaded:(imageInxFin.indexOf(".")>-1)?true:false})
                                                   }}
                                                   onLoad={()=>{
                                                     this.setState({loaded:false})
                                                   }}/>}

                                         </View>
                                         <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,borderColor:globalColors.heaBorderClr}}/>
                                         <View style={styles.newListOne}>
                                              <View style={{flexDirection:"column",flex:(this.state.isTablet)?1:1,paddingTop:15,paddingBottom:10}}>
                                                <View style={{marginLeft:this.state.isTablet?stylecust.em(1.5):10}}>
                                                   <View style={{flexDirection:"row"}}>
                                                       <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Item Number </Text></View>
                                                       <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-15,marginBottom:-20,marginLeft:10,marginRight:15,borderColor:globalColors.heaBorderClr}}/>
                                                       <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8)}]}>{val.item_num_display}</Text></View>
                                                   </View>
                                                   <View style={{flexDirection:"row"}}>
                                                       <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Color </Text></View>
                                                       <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-20,marginBottom:-20,marginLeft:10,marginRight:15,borderColor:globalColors.heaBorderClr}}/>
                                                       <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8)}]}>{val.colorDescription?val.colorDescription:""} </Text></View>
                                                   </View>
                                                   <View style={{flexDirection:"row"}}>
                                                       <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Available to Sell </Text></View>
                                                       <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-20,marginBottom:-20,marginLeft:10,marginRight:15,borderColor:globalColors.heaBorderClr}}/>
                                                       <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8)}]}>{val.available_to_sell?val.available_to_sell:""} </Text></View>
                                                   </View>
                                                   <View style={{flexDirection:"row"}}>
                                                       <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Available Now </Text></View>
                                                       <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-20,marginBottom:-20,marginLeft:10,marginRight:15,borderColor:globalColors.heaBorderClr}}/>
                                                       <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8)}]}>{(val.available_now>0) ? val.available_now:"0"}  </Text></View>
                                                   </View>
                                                   <View style={{flexDirection:"row"}}>
                                                       <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Description </Text></View>
                                                       <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-20,marginBottom:-10,marginLeft:10,marginRight:15,borderColor:globalColors.heaBorderClr}}/>
                                                       <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8)}]}>{val.descriptionShort?((val.descriptionShort).trim()):""} </Text></View>
                                                   </View>
                                                </View>
                                              </View>

                                          </View>

                                     </View>
                                 </View>
                            </View>
                        </TouchableWithoutFeedback>);
                 })
               }
          </View>
          );
      }

   }

   loadPagination=()=>{
     let RouteData = store.getRouteData('product');
     if(RouteData['next_page']==0){
        page = 0;
     }else if(RouteData['next_page']){
        page = RouteData['next_page'];
     }
    // console.log("inside members 3dd");
     if(page>0){
     if(!this.state.fetching){
      //console.log("inside members 1");
        this.setState({fetching:true},()=>{

          this.getProductNumber().then((response) => {
              //console.log("inside members 3"+JSON.stringify(response.data));
              this.toggleLoaderOFF();
            if(response && response.data){
              if(response.data.data.length>0){
                let RouteData = store.getRouteData('product');
                //console.log("inside members 3"+JSON.stringify(RouteData));
                response.data['data'] = RouteData['data'].concat(response.data['data']);
                 this.setState({
                     data:response.data['data'],
                     fetching:false
                 });
                 store.updateRouteData("product",response.data,this.state.active,this.state.activeTxt,this.state.actMail);
            }else{
              this.setState({
                  fetching:false
              });
            }
             //this.props.updateEvents(true);
          }else{
            this.setState({
              fetching:false
            });
            if(response && response.data.error){
              //Alert.alert(response.data.error);
            }
            //this.props.updateEvents(true);
          }
          });

        })
      }
    }
   }
   getSelectedItems = () =>
   {
     //console.log("JSON "+JSON.stringify(selectedArrayRef.getArray()));

     if(selectedArrayRef.getArray().length == 0 )
     {

       return 0;
     }
     else
     {

       return 1;
     }
   }
   onPress(checked){
     //alert("hiai"+checked);
     this.setState({checked:checked})
   }
  render() {
    return (
      <View style={styles.container}>
        {!this.state.focus && <View style={{marginLeft:this.state.isTablet?stylecust.em(3):stylecust.em(1.5),marginRight:this.state.isTablet?stylecust.em(3):stylecust.em(1.5),marginTop:this.state.isTablet?25:(Platform.OS=='android')?10:20,marginBottom:30}}>
            <View>
              <FilterMenu openFilter={this.openFilter} active={this.state.active} activeTxt={this.state.activeTxt} />
            </View>
            <View style={{marginTop:this.state.isTablet?25:(Platform.OS=='android')?3:20}}>
              <TextField ref={'accmail'}
                 keyboardType='default'
                 returnKeyType='go'
                 onSubmitEditing={()=>this.subGeneral()}
                 onChangeText={actMail => {
                   this.setState({ actMail });

                   if(actMail==""){
                      //console.log("Changed  "+actMail);
                     store.product = {
                        next_page: 0,
                        active:'item_num',
                        activeTxt:'Item Number',
                        activeNumber:"",
                        @observable data: []
                     }
                   }
                  }
                 }
                 underlineColorAndroid="transparent"
                 style={[styles.textBoxStyle,{fontSize:this.state.focusTxt?stylecust.em(1.1):stylecust.em(1.1),color:this.state.focusTxt?globalColors.txtClr:globalColors.txtClr,borderColor:this.state.focusTxt?globalColors.txtLineClrOnnotFocus:globalColors.txtLineClrOnnotFocus}]}
                 multiline={false}
                 textAlignVertical={'top'}
                 numberOfLines={1}
                 onFocus={()=>this.setState({focusTxt:true})}
                 onBlur={()=>this.setState({focusTxt:false})}
                 placeholder={"Type "+this.state.activeTxt+" to Search"}
                 placeholderTextColor={this.state.focusTxt?globalColors.txtLineClrOnnotFocus:globalColors.txtLineClrOnnotFocus}
                 value={this.state.actMail}
                 selectionColor={this.state.focusTxt?globalColors.txtLineClrOnnotFocus:globalColors.txtLineClrOnnotFocus}/>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:this.state.isTablet?stylecust.em(1.1):(Platform.OS=='android')?stylecust.em(0.7):stylecust.em(0.7),marginBottom:stylecust.em(1.1) }}>

            <TouchableHighlight onPress = {()=>this.onPress(!this.state.checked)} underlayColor = "transparent" style = { cbstyles.checkBoxButton }>
               <View style = { cbstyles.checkBoxHolder }>
                  <View style = {{ width: 20, height: 20, backgroundColor: !this.state.checked?globalColors.txtLineClrOnnotFocus:globalColors.txtLineClr, padding: 3 }}>
                  {
                     (this.state.checked)
                     ?
                        (<View style = { cbstyles.checkedView }>
                           <Image source = {globalImages.checkbox.check} style = { cbstyles.checkedImage }/>
                        </View>)
                     :
                        (<View style = { cbstyles.uncheckedView }/>)
                  }
                  </View>
                  <Text style = {[ cbstyles.checkBoxLabel, { color:!this.state.checked?globalColors.textLoginColor:globalColors.txtLineClr}]}>Availability</Text>
               </View>
            </TouchableHighlight>


            </View>
            <View style={{}}>

              <TouchableOpacity onPress={()=>this.subGeneral()} style={{justifyContent:'center',alignSelf:'center',}}>
              <View style={[styles.buttonStyle,{padding:this.state.isTablet?stylecust.em(1):stylecust.em(0.8),marginLeft:5,marginRight:5}]}>
                <View style={{marginLeft:2,marginTop:(Platform.OS=='ios')?(this.state.isTablet?stylecust.em(0.2):stylecust.em(0.2)):stylecust.em(0.2),marginRight:5}}><Icon icon={globalImages.icons.activity.Searchicon} size={this.state.isTablet?stylecust.em(1.2):stylecust.em(1.2)}/></View>
                <Text style={[styles.searchTxt,{marginTop:(Platform.OS=='ios')?stylecust.em(0.2):0}]}>SEARCH</Text>
              </View>
              </TouchableOpacity>

            </View>
        </View>}
        {(this.state.data && this.state.data.length>0) &&
           <View style={{marginLeft:10,marginRight:10,marginTop:this.state.focus?0:(this.state.isTablet)?20:0,marginBottom:20}}>
              <View style={{marginLeft:this.state.focus?-10:0,marginRight:this.state.focus?-10:0,backgroundColor:this.state.focus?globalColors.searchBtnBck:globalColors.contentSearchBck}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    {this.state.focus && <View style={{marginTop:stylecust.em(2),marginBottom:stylecust.em(0.3)}}><Text style={{color:globalColors.TxtClr,fontSize:stylecust.em(1),fontFamily:'Roboto-Bold'}}>{this.state.activeTxt}</Text></View>}
                    {this.state.focus && <View style={{ marginBottom:stylecust.em(0.8)}}><Text style={{color:globalColors.TxtClr,fontSize:stylecust.em(1),fontFamily:'Roboto-Bold'}}>{(this.state.actMail).trim()}</Text></View>}
                    <View style={[styles.buttonStyleNew,{}]}>
                    <TouchableOpacity onPress={()=>this.loadMethod()}>
                        <View style={{marginLeft:30,marginRight:30,marginTop:this.state.focus?5:0}}>
                          <Icon icon={this.state.focus?globalImages.icons.activity.Whitedownarrow:globalImages.icons.theme.GreenUparrow} size={this.state.isTablet?30:20}/>
                        </View>
                      </TouchableOpacity>
                    </View>
                </View>
              </View>

              <View style={{marginLeft:-10,marginRight:-10,backgroundColor:globalColors.subHeaderBck}}>
                  <View style={{marginTop:17,marginBottom:17,marginLeft:10}}>
                    <Text style={styles.searchHeader}>Search Results</Text>
                  </View>
              </View>
              <View style={{}}>{this.dynamicListNew()}</View>
        </View>}
        {this.state.loading && <View style={[styles.overlay,{height: this.state.height, width:this.state.width}]}>
                  <ActivityIndicator
                      animating={true}
                      color='#ffffff'
                      size="large"
                      style={[styles.activityIndicator,{opacity: this.state.loading ? 3.0 : 0.0,height: this.state.height}]}/>
              </View>}
      {this.state.fetching && <View style={{marginTop:15,marginBottom:10}}><ActivityIndicator size="large"/></View>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:"column",
    backgroundColor:globalColors.contentSearchBck,
  },
  buttonStyle:{
    backgroundColor:globalColors.searchBtnBck,
    borderRadius:5,
    flexDirection:"row"
  },
  imagePost:{
    height:stylecust.em(7)
  },
  buttonStyleNew:{
    padding:10,
    flexDirection:"row"
  },
  searchTxt:{
    fontFamily:'Roboto-Bold',
    fontWeight:'bold',
    fontSize:stylecust.em(1),
    color:globalColors.TxtClr,
    marginRight:5
  },
  searchHeader:{
    fontFamily:'Roboto-Bold',
    fontWeight:'bold',
    fontSize:stylecust.em(1.2),
    color:globalColors.headerSearchTxt,
    marginRight:5
  },
  itemHeader:{
    fontFamily:'Roboto-Regular',
    fontWeight:'normal',
    fontSize:stylecust.em(0.8),
    color:globalColors.contentTxtClr,
    marginBottom:stylecust.em(0.7)
  },
  itemNumber:{
    fontFamily:'Roboto-Regular',
    fontWeight:'normal',
    fontSize:stylecust.em(0.8),
    color:globalColors.headerSearchTxt,
    marginBottom:stylecust.em(0.7)
  },
  textBoxStyle: {
    backgroundColor: globalColors.contentSearchBck,
    marginTop: 5,
    paddingLeft:15,
    marginBottom: 10,
    padding: stylecust.em(0.6),
    borderBottomWidth: 1,
    borderColor: globalColors.txtLineClr,
    paddingRight: 15,
    fontSize:stylecust.em(1.1),
    fontFamily:"Roboto-Regular",
    color:globalColors.txtLineClr,
  },
  overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#444444',
        opacity: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    newListOne:{
      flex:1, backgroundColor:globalColors.listColorOne,flexDirection:"row"
    },
    newListTwo:{
      flex:1, backgroundColor:globalColors.listColorTwo,flexDirection:"row"
    },
    newListSubOne:{
      flex:0.5,marginTop:stylecust.em(1),marginBottom:stylecust.em(0.5)
    },
    newListSubTwo:{
      flex:0.5,alignItems:'flex-start',justifyContent:'center',marginTop:stylecust.em(1),marginBottom:stylecust.em(0.5)
    },

});

const cbstyles = StyleSheet.create(
{
  container:
  {
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  selectedArrayItemsBtn:
  {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch'
  },

  btnText:
  {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'stretch',
    fontSize: 18
  },

  checkBoxButton:
  {
    marginVertical: 10
  },

  checkBoxHolder:
  {
    flexDirection: 'row',
    alignItems: 'center'
  },

  checkedView:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  checkedImage:
  {
    height: '80%',
    width: '80%',
    tintColor: 'white',
    resizeMode: 'contain'
  },

  uncheckedView:
  {
    flex: 1,
    backgroundColor: 'white'
  },

  checkBoxLabel:
  {
    fontSize: stylecust.em(1.1),
    fontFamily:"Roboto-Regular",
    color:globalColors.textLoginColor,
    paddingLeft: 10
  }
});
