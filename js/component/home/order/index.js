/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, TouchableWithoutFeedback,TouchableHighlight, StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity, Keyboard,ActivityIndicator} from 'react-native';
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
type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
      super(props);
      //console.log(' inside actc ' + JSON.stringify(this.props));
     this.state = {
          tabBarWidth: 0,
          loading: false,
          fetchMore: false,
          data: [],
          active:"customer_po",
          activeTxt:"Customer PO",
          randomId:Math.random(),
          actMail:"",
          focus:false,
          isLandscape:DeviceInfo.isLandscape(),
          isTablet:DeviceInfo.isTablet(),
          width:Dimensions.get('window').width,
          height:Dimensions.get('window').height,
          focusTxt:false,
          fetching:false,
          checked:true,
          clicked:false,
          submitActMail:"",
          submitchecked:true
      }
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
    this.props.updateLoading(true);
  }
  toggleLoaderOFF=()=>{
    this.props.updateLoading(false);
  }
  openFilter = (value,txt) =>{
    // Alert.alert("heloooshai "+ value);
    this.setState({active:value,activeTxt:txt,actMail:"",data:[],checked:true});
     store.myorder = {
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
       Alert.alert('Alert',  this.state.activeTxt+' cannot be empty.');
     } else{
       try{
       this.toggleLoaderON();
       this.setState({submitchecked:this.state.checked?1:0,submitActMail:this.state.actMail})
       /*let dataForm = {
         'order_key':this.state.active,
         'order_value':this.state.actMail
       }
       //alert(this.state.active+" "+this.state.actMail);
       var formBody = [];

       for (var property in dataForm) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(dataForm[property]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");*/
        //this.setState({ animating: false, isLoading: false });
       //this.toggleLoader();
      //  alert("store.tokenLogin.token "+store.tokenLogin.access_token)
       this.setState({
       }, () => {
         this.getProductNumber().then((responseJson) => {
             //  this._toast.show(data.msg);operation=loginUser&log=Admin&pwd=zYn5LWYbgCJ@VpSs8kA$PLkd&device_udid=52053213asdf2213asdfadsf&device_type=android
             //alert("data " + " " + responseJson);
             //let loginData = responseJson.data.groups;
             //console.log("this.setState({data:[]});");
             this.toggleLoaderOFF();
             if(responseJson && responseJson.data && responseJson.data.data){
                store.updateRouteData("myorder",responseJson.data,this.state.active,this.state.activeTxt,this.state.actMail);
                if(responseJson.data.data.length>0){
                  if(responseJson.data.data[0]=="fail"){
                    Alert.alert("Alert","No results for this "+this.state.activeTxt+". Please try with a valid one. ")
                  }else{
                    this.setState({data:responseJson.data.data});
                    this.setState({focus:true});
                  }
                }else{
                  this.setState({data:[]});
                  if(responseJson.data.data.message){
                    Alert.alert("Alert",responseJson.data.data.message)
                  }else{
                     Alert.alert("Alert","No results for this "+this.state.activeTxt+". Please try with a valid one. ")
                  }
                }

             }else if(responseJson){
               this.setState({data:[]});
               if(responseJson && responseJson.data && responseJson.data.data){
                 Alert.alert("Alert",responseJson.data.message)
               }else{
                  Alert.alert("Alert","No results for this "+this.state.activeTxt+". Please try with a valid one. ")
               }
             }else{
                this.setState({data:[]});
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
     }catch(e){
       this.setState({data:[]});
       this.toggleLoaderOFF();
     }
     }
   }

   async getProductNumber(data) {
     try {
             let RouteData = store.getRouteData('myorder');
             let page = 1;
             if(this.state.fetching && RouteData['next_page']==0){
                page = 0;
             }else if(this.state.fetching && RouteData['next_page']){
                page = RouteData['next_page'];
             }
             //let val = this.state.checked?1:0;
            //console.log(val+" RouteData['next_page'] "+val);
             if(page>0){
           let dataForm = {
             'order_key':this.state.active,
             'order_value':(this.state.submitActMail).trim(),
             'page':page,
             'per_page':5,
             'shipped':this.state.submitchecked
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
         const response = await api.post(Constants.url.orders,formBody);
         /*let response = {"data":[{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60086","orderItemDisp":"60086-WSL","shipItemNum":"60086","shipItemDisp":"60086-WSL","imageLocation":"https://envision.coreforce.com/BINOImages/60086WSL.JPG","orderItems":{"sku":"60086","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"60","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"WSL            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"10.2"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60086","orderItemDisp":"60086-CLR","shipItemNum":"60086","shipItemDisp":"60086-CLR","imageLocation":"https://envision.coreforce.com/BINOImages/60086CLR.JPG","orderItems":{"sku":"60086","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"60","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"CLR            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"10.2"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60041","orderItemDisp":"60041-WSL","shipItemNum":"60041","shipItemDisp":"60041-WSL","imageLocation":"https://envision.coreforce.com/BINOImages/60041WSL.JPG","orderItems":{"sku":"60041","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"96","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"WSL            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"4"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60041","orderItemDisp":"60041-CLR","shipItemNum":"60041","shipItemDisp":"60041-CLR","imageLocation":"https://envision.coreforce.com/BINOImages/60041CLR.JPG","orderItems":{"sku":"60041","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"72","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"CLR            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"4"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60037","orderItemDisp":"60037-WSL","shipItemNum":"60037","shipItemDisp":"60037-WSL","imageLocation":"https://envision.coreforce.com/BINOImages/60037WSL.JPG","orderItems":{"sku":"60037","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"132","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"WSL            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"4.95"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60037","orderItemDisp":"60037-CLR","shipItemNum":"60037","shipItemDisp":"60037-CLR","imageLocation":"https://envision.coreforce.com/BINOImages/60037CLR.JPG","orderItems":{"sku":"60037","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"96","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"CLR            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"4.95"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60035","orderItemDisp":"60035-WSL","shipItemNum":"60035","shipItemDisp":"60035-WSL","imageLocation":"https://envision.coreforce.com/BINOImages/60035WSL.JPG","orderItems":{"sku":"60035","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"132","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"WSL            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"3.5"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60036","orderItemDisp":"60036-WSL","shipItemNum":"60036","shipItemDisp":"60036-WSL","imageLocation":"https://envision.coreforce.com/BINOImages/60036WSL.JPG","orderItems":{"sku":"60036","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"60","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"WSL            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"7.5"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60036","orderItemDisp":"60036-CLR","shipItemNum":"60036","shipItemDisp":"60036-CLR","imageLocation":"https://envision.coreforce.com/BINOImages/60036CLR.JPG","orderItems":{"sku":"60036","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"60","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"CLR            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"7.5"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60035","orderItemDisp":"60035-CLR","shipItemNum":"60035","shipItemDisp":"60035-CLR","imageLocation":"https://envision.coreforce.com/BINOImages/60035CLR.JPG","orderItems":{"sku":"60035","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"60","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"CLR            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"3.5"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60034","orderItemDisp":"60034-WSL","shipItemNum":"60034","shipItemDisp":"60034-WSL","imageLocation":"https://envision.coreforce.com/BINOImages/60034WSL.JPG","orderItems":{"sku":"60034","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"168","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"WSL            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"6.85"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60034","orderItemDisp":"60034-CLR","shipItemNum":"60034","shipItemDisp":"60034-CLR","imageLocation":"https://envision.coreforce.com/BINOImages/60034CLR.JPG","orderItems":{"sku":"60034","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"132","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"CLR            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"6.85"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60031","orderItemDisp":"60031-WSL","shipItemNum":"60031","shipItemDisp":"60031-WSL","imageLocation":"https://envision.coreforce.com/BINOImages/60031WSL.JPG","orderItems":{"sku":"60031","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"192","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"WSL            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"6.95"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60018","orderItemDisp":"60018-WSL","shipItemNum":"60018","shipItemDisp":"60018-WSL","imageLocation":"https://envision.coreforce.com/BINOImages/60018WSL.JPG","orderItems":{"sku":"60018","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"66","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"WSL            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"7.5"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60031","orderItemDisp":"60031-CLR","shipItemNum":"60031","shipItemDisp":"60031-CLR","imageLocation":"https://envision.coreforce.com/BINOImages/60031CLR.JPG","orderItems":{"sku":"60031","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"168","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"CLR            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"6.95"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"10060","orderItemDisp":"10060-CLR","shipItemNum":"10060","shipItemDisp":"10060-CLR","imageLocation":"https://envision.coreforce.com/BINOImages/10060CLR.JPG","orderItems":{"sku":"10060","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"96","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"CLR            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"4.5"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60018","orderItemDisp":"60018-CLR","shipItemNum":"60018","shipItemDisp":"60018-CLR","imageLocation":"https://envision.coreforce.com/BINOImages/60018CLR.JPG","orderItems":{"sku":"60018","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"96","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"CLR            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"7.5"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60017","orderItemDisp":"60017-WSL","shipItemNum":"60017","shipItemDisp":"60017-WSL","imageLocation":"https://envision.coreforce.com/BINOImages/60017WSL.JPG","orderItems":{"sku":"60017","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"96","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"WSL            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"6.15"}},{"company":"BNO","orderId":"7000141","wareHouse":"ALW","orderType":"R","customer_po":"10378902","customerReferenceId":"HGB001  ","orderDate":"21-MAR-16","orderEnteredDate":"21-MAR-16","department":"52             ","orderClass":"R","orderSource":"S","shippingPoint":"CA      ","slsrepId":{"":"202"},"enteredBy":"H.G. BUYING GROUP","orderStatus":"SHIPPED","orderItemNum":"60017","orderItemDisp":"60017-CLR","shipItemNum":"60017","shipItemDisp":"60017-CLR","imageLocation":"https://envision.coreforce.com/BINOImages/60017CLR.JPG","orderItems":{"sku":"60017","startShipDate":"21-MAR-16","startCancelDate":"25-MAR-16","qtyalot":"0","qtypick":"0","qtyship":"66","qtyCan":"0","qtyDel":"0","qtyopen":"0","color":"CLR            "},"stores":{"orderStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "},"billToStore":{"storeNum":"0000    ","name":"HOMEGOODS BUYING CORP","address1":"ATTN: ACCOUNTS PAYABLE 2AN","address2":"ATTN: ACCOUNTS PAYABLE 2AN","city":"MALBORO","state":"MA","zipCode":"01752       ","country":"US "},"shipToStore":{"storeNum":"0881    ","name":"HOME GOODS DC 881","address1":"C/O PERFORMANCE TEAM","address2":"C/O PERFORMANCE TEAM","city":"SAN PEDRO","state":"CA","zipCode":"90731       ","country":"US "}},"orderTotals":{"totalAmount":"6.15"}}]};*/
           //console.log("HI "+JSON.stringify(response));
            //store.updateRouteData("myorder",response,this.state.active,this.state.activeTxt,this.state.actMail);
         try{
              //console.log("data 231 " + " " + JSON.stringify(response));
              return response;
         }catch(Error){
           //console.log("data 3 responseJson21 "+Error);
           this.toggleLoaderOFF();
            this.setState({data:[]})
          // Alert.alert('Alert', 'Please try again later.', [{ text: 'ok' }]);
           return "";
         }
       }else{
          this.setState({data:[]})
         return "";
       }
     }
     catch (error) {
         //console.error(error);
          //console.log("data 3 responseJson2 "+error);
         this.toggleLoaderOFF();
         this.setState({data:[]})
         Alert.alert('Alert', 'Please search with more specific input to get the results appropriately.', [{ text: 'ok' }]);
          return "";
     }
   }
   componentDidMount(){
    // alert("didmount");
    /*if(store.currentroute=="myorder"){
        //console.log("getRouteDatad order "+JSON.stringify(store.getRouteData(store.currentroute)));
       // alert("didmount");
       //console.log("store.productDetails "+JSON.stringify(store.productDetails));
       let dataRoute = store.getRouteData(store.currentroute);
      // console.log("store.currentroute "+store.currentroute+" dataRoute.activeNumber "+dataRoute.activeNumber+" dataRoute "+dataRoute.data.length);
       if(dataRoute && dataRoute.activeNumber!=""){
          this.setState({
             data:dataRoute.data,
             active:dataRoute.active,
             activeTxt:dataRoute.activeTxt,
             actMail:dataRoute.activeNumber
          });
        }
    }*/
   /*
    console.log("getRoutesddsdsdData "+JSON.stringify(store.getRouteData(store.currentroute)));
     if(this.state.actMail!=""){
       this.getProductNumber(this.state.actMail).then((responseJson) => {
         //  this._toast.show(data.msg);operation=loginUser&log=Admin&pwd=zYn5LWYbgCJ@VpSs8kA$PLkd&device_udid=52053213asdf2213asdfadsf&device_type=android
         //alert("data " + " " + responseJson);
         //let loginData = responseJson.data.groups;
         this.toggleLoaderOFF();
         if(responseJson && responseJson.data && responseJson.data.length>0){
             store.updateRouteData(store.currentroute, responseJson.data, this.state.active, this.state.activeTxt, this.state.actMail);
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
      /* });
     }*/
   }
   loadMethod=()=>{
     this.setState({focus:!this.state.focus});
   }
   openNextPage=(data,list,index)=>{
      //console.log("data,list,index "+data+","+list+","+index)
      //if(!this.state.clicked){


      Actions.push('OrderDetailsView',{data:data,list:list,index:index,checked:(this.state.checked?1:0)});
      //this.setState({clicked:true})
    //}
   }
   dynamicListnew=()=>{
     let width = this.state.isTablet?(this.state.isLandscape?this.state.height/6:this.state.width/6):(this.state.isLandscape?this.state.height/4:this.state.width/4);
     let height = this.state.isTablet?(this.state.isLandscape?this.state.width/8:this.state.height/8):(this.state.isLandscape?this.state.width/6:this.state.height/6);
     if(this.state.data && this.state.data.length>0)
     {
       return( <View style={{justifyContent:"center"}}>
              {this.state.data.map((val,index)=>{
                  return( <TouchableWithoutFeedback key={index}  onPress={()=>{this.openNextPage(this.state.data,val,index)}}>
                        <View style={{marginLeft:-10,marginRight:-10,backgroundColor:globalColors.subHeaderBck}}>
                        <View style={{marginLeft:10,marginRight:10, marginBottom:this.state.isTablet?30:15}}>
                          <View style={{flex:1,backgroundColor:globalColors.contentListBck,flexDirection:"row"}}>
                            <View style={{flex:1,marginLeft:stylecust.em(0.5),marginRight:stylecust.em(0.3),marginTop:(Platform.OS=="ios")?((this.state.isTablet)?stylecust.em(2):stylecust.em(1)):stylecust.em(0.95),marginBottom:stylecust.em(0.95),flexDirection:"column"}}>
                                 <View style={styles.newListOne}>
                                     <View style={[styles.newListSubOneT,{flex:0.5}]}>
                                       <View style={{flexDirection:"row" }}>
                                             <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.4):stylecust.em(0.2)}]}>Order Number</Text></View>
                                       </View>
                                       <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                             <View style={{flexWrap:'wrap',marginRight:10,marginLeft:0}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8)}]}>{val.orderId}</Text></View>
                                       </View>
                                     </View>
                                     <View style={[this.state.isTablet?styles.newListSubTwoTT:styles.newListSubTwoT,{flex:0.5}]}>
                                       <View style={{flexDirection:"row" }}>
                                           <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.4):stylecust.em(0.2)}]}>Customer Name</Text></View>
                                       </View>
                                       <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                           <View style={{flexWrap:'wrap',marginRight:10,marginLeft:0}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8)}]}>{val.customer_name}</Text></View>
                                       </View>
                                     </View>
                                 </View>
                                 <View style={{borderBottomWidth:(this.state.isTablet)?1:0.5,marginLeft:-8,marginRight:-5,borderColor:globalColors.heaBorderClr,marginTop:12,marginBottom:3}}/>

                                <View style={{flex:1,flexDirection:"row", marginTop:10}}>
                                     <View style={[this.state.isTablet?styles.newListSubThreeTT:styles.newListSubThreeT,{flex:0.5}]}>
                                       <View style={{flexDirection:"row" }}>
                                           <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.4):stylecust.em(0.2)}]}>Customer PO</Text></View>
                                       </View>
                                       <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                           <View style={{flexWrap:'wrap',marginRight:10,marginLeft:0}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8)}]}>{val.customer_po}</Text></View>
                                       </View>
                                     </View>
                                     <View style={[styles.newListSubOneT,{flex:0.5}]}>
                                       <View style={{flexDirection:"row" }}>
                                             <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.4):stylecust.em(0.2)}]}>Status</Text></View>
                                       </View>
                                       <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                             <View style={{flexWrap:'wrap',marginRight:10,marginLeft:0}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8)}]}>{val.orderStatus?(val.orderStatus).trim() : ""}</Text></View>
                                       </View>
                                     </View>
                                 </View>
                                 <View style={{borderBottomWidth:(this.state.isTablet)?1:0.5,marginLeft:-8,marginRight:-5,borderColor:globalColors.heaBorderClr,marginTop:12,marginBottom:3}}/>
                                 <View style={{flex:1,flexDirection:"row", marginTop:10}}>
                                 <View style={[this.state.isTablet?styles.newListSubTwoTT:styles.newListSubTwoT,{flex:0.5}]}>
                                   <View style={{flexDirection:"row" }}>
                                       <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.4):stylecust.em(0.2)}]}>Ship & Cancel Date</Text></View>
                                   </View>
                                   <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                       <View style={{flexWrap:'wrap',marginRight:10,marginLeft:0}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8)}]}>{val.startShipDate} & {val.startCancelDate}</Text></View>
                                   </View>
                                 </View>
                                 <View style={[this.state.isTablet?styles.newListSubThreeTT:styles.newListSubThreeT,{flex:0.5}]}>
                                   <View style={{flexDirection:"row" }}>
                                       <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.4):stylecust.em(0.2)}]}>Total Price</Text></View>
                                   </View>
                                   <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                       <View style={{flexWrap:'wrap',marginRight:10,marginLeft:0}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8)}]}>${val.totalAmount}</Text></View>
                                   </View>
                                 </View>
                                 </View>
                           </View>
                              </View>
                            </View>
                       </View></TouchableWithoutFeedback>);
                })
              }
         </View>
         );
     }
   }

   loadPagination=()=>{

     let RouteData = store.getRouteData('myorder');
     if(RouteData['next_page']==0){
        page = 0;
     }else if(RouteData['next_page']){
        page = RouteData['next_page'];
     }
     if(page>0){

     if(!this.state.fetching){
        this.setState({fetching:true},()=>{

          this.getProductNumber().then((response) => {
              //console.log("inside members 3"+JSON.stringify(response.data));
              this.toggleLoaderOFF();
            if(response && response.data){
              if(response.data.data.length>0){
                let RouteData = store.getRouteData('myorder');
                //console.log("inside members 3"+JSON.stringify(RouteData));
                response.data['data'] = RouteData['data'].concat(response.data['data']);
                 this.setState({
                     data:response.data['data'],
                     fetching:false
                 });
                 store.updateRouteData("myorder",response.data,this.state.active,this.state.activeTxt,this.state.actMail);
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
   onPress(checked){
     //alert("hiai"+checked);
     this.setState({checked:checked})
   }
  render() {
    return (
      <View style={styles.container}>
      {!this.state.focus && <View style={{marginLeft:this.state.isTablet?stylecust.em(3):stylecust.em(1.5),marginRight:this.state.isTablet?stylecust.em(3):stylecust.em(1.5),marginTop:this.state.isTablet?25:(Platform.OS=='android')?10:20,marginBottom:30}}>
            <View>
              <FilterMenu identify={1} openFilter={this.openFilter} active={this.state.active} activeTxt={this.state.activeTxt} />
            </View>
              <View style={{marginTop:this.state.isTablet?25:(Platform.OS=='android')?3:20}}>
              <TextField ref={'accmail'}
                 keyboardType='default'
                 returnKeyType='go'
                  onSubmitEditing={()=>this.subGeneral()}
                 onChangeText={actMail => {this.setState({ actMail });
                 if(actMail==""){
                    //console.log("Changed  "+actMail);
                   store.myorder = {
                      next_page: 0,
                      active:'customer_po',
                      activeTxt:'Customer PO',
                      activeNumber:"",
                      @observable data: []
                   }
                 }
                 }}
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
                  <Text style = {[ cbstyles.checkBoxLabel, { color:!this.state.checked?globalColors.textLoginColor:globalColors.txtLineClr}]}>Shipped</Text>
               </View>
            </TouchableHighlight>


            </View>
            <View style={{}}>

              <TouchableOpacity onPress={()=>this.subGeneral()} style={{justifyContent:'center',alignSelf:'center'}}>
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
              <View>{this.dynamicListnew()}</View>
        </View>}
        {this.state.loading && <View style={[styles.overlay,{height: this.state.height, width:this.state.width}]}>
                  <ActivityIndicator
                      color='#ffffff'
                      animating={true}
                      size="large"
                      style={[styles.activityIndicator,{height: this.state.height,opacity: this.state.loading ? 3.0 : 0.0}]}/>
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
    fontSize:stylecust.em(1),
    color:globalColors.contentTxtClr,
  },
  itemNumber:{
    fontFamily:'Roboto-Bold',
    fontWeight:'bold',
    fontSize:stylecust.em(0.9),
    color:globalColors.headerSearchTxt,
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
      flex:1,flexDirection:"row"
    },
    newListTwo:{
      flex:1, backgroundColor:globalColors.listColorTwo,flexDirection:"row"
    },
    newListSubOne:{
      flex:0.5,marginTop:stylecust.em(1),marginBottom:stylecust.em(0.5)
    },
    newListSubTwo:{
      flex:0.5,marginTop:stylecust.em(1),marginBottom:stylecust.em(0.5)
    },
    newListSubOneT:{
      marginLeft:stylecust.em(0.3),flex:0.34
    },
    newListSubTwoT:{
      marginLeft:stylecust.em(0.3),flex:0.36
    },
    newListSubTwoTT:{
      marginLeft:stylecust.em(0.3),flex:0.36
    },
    newListSubThreeT:{
      marginLeft:stylecust.em(0.3),flex:0.3
    },
    newListSubThreeTT:{
      marginLeft:stylecust.em(0.3),flex:0.3
    }

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
