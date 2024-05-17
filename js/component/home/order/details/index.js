/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {ScrollView, StatusBar, ActivityIndicator,Dimensions, Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { api, globalImages, globalColors } from '../../../../helper';
import Constants from '../../../../constants';
import stylecust from '../../../helper/resfont';
import DeviceInfo from 'react-native-device-info';
import store from '../../../../store';
import {Actions} from 'react-native-router-flux';
import Header from '../../../header';
import IphoneHeader from '../../../header/iphonexhr';
import Icon from '../../../icon';
import IconFont from 'react-native-vector-icons/FontAwesome';

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    //console.log("props "+JSON.stringify(this.props.list));

    this.state={
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
      isLandscape:DeviceInfo.isLandscape(),
      isTablet:DeviceInfo.isTablet(),
      data:this.props.list.orderitems,
      fetching:false,
      shipped:this.props.checked
    }
    Dimensions.addEventListener('change', () => {
      //alert("hi"+DeviceInfo.isLandscape());
      this.setState({
          isLandscape:DeviceInfo.isLandscape(),
          isTablet:DeviceInfo.isTablet(),
          width:Dimensions.get('window').width,
          height:Dimensions.get('window').height
      })
    });
    this.imageAvailable = false;

  }
  backPressed = () =>{
    Actions.pop();
  }

  componentWillMount(){
      //console.log("JSoncomponentWillMount "+this.props.list.orderitems.length)
    if(this.props.list){
      store.updateItemsData("orderItems",this.props.list,this.props.list.next_page);
    }
  }
  /*<View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontWeight:"normal",fontSize:this.state.isTablet?stylecust.em(0.7):stylecust.em(0.6),marginBottom:this.state.isTablet?stylecust.em(0.2):stylecust.em(0.2)}]}>{val.dim_val} {val.piece_count} {val.item_name}</Text></View>
  <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontWeight:"normal",fontSize:this.state.isTablet?stylecust.em(0.7):stylecust.em(0.6),marginBottom:this.state.isTablet?stylecust.em(0.2):stylecust.em(0.2)}]}>{val.upc_number}</Text></View>
  */
  dynamicList=()=>{
    let width = this.state.isTablet?(this.state.isLandscape?this.state.height/6:this.state.width/6):(this.state.isLandscape?this.state.height/4:this.state.width/4);
    let height = this.state.isTablet?(this.state.isLandscape?this.state.width/8:this.state.height/8):(this.state.isLandscape?this.state.width/6:this.state.height/8);
    //console.log("JSon "+this.state.data.length)
    if(this.state.data && this.state.data.length>0){
     return(
       <View>
         <View style={styles.secContainer}>
           <View style={styles.subHeader}>
               <View style={[styles.subHeaderDetails,{flexDirection:'row',flex:1,height:height/2.5}]}>
                 <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                   <Text style={styles.headerValue}>ITEM LISTING</Text>
                 </View>
               </View>
           </View>
         </View>
          {this.state.data.map((val,index)=>{
            if(val.imageLocation){
              var imageInx = val.imageLocation.lastIndexOf("/");
              var imageInxFin = val.imageLocation.substring(imageInx+1);
              this.imageAvailable = imageInxFin.indexOf(".")>-1;
            }
            return(<View>
             <View style={styles.newListOne}>
                <View style={{flexDirection:"column",flex:(this.state.isTablet)?0.4:0.4,marginTop:0,justifyContent:'center'}}>
                  <View style={{marginLeft:this.state.isTablet?stylecust.em(6):stylecust.em(2)}}>
                      {(this.imageAvailable && this.state.loaded) && <View style={[styles.overlay,{top:5,width:(this.state.isTablet)?((Platform.OS=='ios')?200:120):100,height:(this.state.isTablet)?100:80,backgroundColor:"#ccc"}]}>
                       <Text allowFontScaling={false} style={{fontFamily: 'Lato-Regular',color:"#595959",fontSize: 14, textAlign:'center'}} > Loading ... </Text>
                      </View>}
                      {this.imageAvailable && <Image
                        key = {val.imageLocation}
                        style={{
                        width: width,
                        height: height,
                        resizeMode: this.state.isTablet?'contain':'contain'}}
                        source={{uri:val.imageLocation,cache: 'force-cache'}}
                        onLoadStart={() => {
                           this.setState({loaded:(this.imageAvailable)?true:false})
                        }}
                        onLoad={()=>{
                          this.setState({loaded:false})
                        }}/>}
                        {!this.imageAvailable && <Image
                          key = {val.imageLocation}
                          style={{
                          width: width,
                          height: height,
                          resizeMode: this.state.isTablet?'contain':'contain'}}
                          source={globalImages.icons.activity.no_image_icon}
                          onLoadStart={() => {
                             this.setState({loaded:(this.imageAvailable)?true:false})
                          }}
                          onLoad={()=>{
                            this.setState({loaded:false})
                          }}/>}
                  </View>
                  <View style={{flexDirection:"column",marginTop:7,marginLeft:this.state.isTablet?stylecust.em(6):stylecust.em(2)}}>
                      <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.7),marginBottom:this.state.isTablet?stylecust.em(0.2):stylecust.em(0.2)}]}>{val.orderItemDisp}</Text></View>

                  </View>
                </View>
                <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,borderColor:globalColors.heaBorderClr}}/>
                <View style={{flexDirection:"row",flex:(this.state.isTablet)?0.3:0.3,paddingTop:20,paddingBottom:10,backgroundColor:((index%2)==0)?globalColors.listColorOne:globalColors.listColorTwo}}>
                    <View style={{marginLeft:this.state.isTablet?stylecust.em(1.5):10,marginTop:0,marginBottom:0}}>
                      <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                          <Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Ship Date </Text>
                      </View>
                      <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                          <Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Cancel Date</Text>
                      </View>
                      <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                          <Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Sell Price </Text>
                      </View>
                      <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                          <Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Quantity </Text>
                      </View>
                      <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                          <Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Total Price</Text>
                      </View>
                    </View>
                </View>
                <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,paddingTop:-10,paddingBottom:-10,borderColor:globalColors.heaBorderClr}}/>
                <View style={{flexDirection:"row",flex:(this.state.isTablet)?0.3:0.3,paddingTop:20,paddingBottom:10,backgroundColor:((index%2)==0)?globalColors.listColorOne:globalColors.listColorTwo}}>

                        <View style={{marginLeft:this.state.isTablet?stylecust.em(1.5):10,marginTop:0,marginBottom:0}}>
                          <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                            <Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8),color:globalColors.headerSearchTxt,fontWeight:'bold'}]}>{val.orderItems.startShipDate} </Text>
                          </View>
                          <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                             <Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8),color:globalColors.headerSearchTxt,fontWeight:'bold'}]}>{val.orderItems.startCancelDate}</Text>
                          </View>
                          <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                             <Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8),color:globalColors.headerSearchTxt,fontWeight:'bold'}]}>${val.orderTotals.selling_price}</Text>
                          </View>
                          <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                             <Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8),color:globalColors.headerSearchTxt,fontWeight:'bold'}]}>{val.orderItems.qty}    </Text>
                          </View>
                          <View style={{flexDirection:"row",flexWrap:'wrap',paddingRight:5,marginTop:7,marginBottom:17}}>
                             <Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8),color:globalColors.headerDetails,flexWrap:'wrap',fontWeight:"bold"}]}>${(val.orderTotals.totalAmount).toFixed(2)}</Text>
                          </View>
                      </View>
                </View>

              </View>
              <View style={[styles.secondHeader,{}]}>
                <View style={[styles.secHeaderDetails,{height:1,backgroundColor:globalColors.heaBorderClr}]}>
                </View>
              </View>
            </View>
           )
         })
        }
       </View>
       )
     }
  }

     async getProductNumber(data) {
       try {
             let RouteData = store.getRouteData('orderItems');
             let page = 1;
             if(this.state.fetching && RouteData['next_page']==0){
                page = 0;
             }else if(this.state.fetching && RouteData['next_page']){
                page = RouteData['next_page'];
             }

             if(page>0){
               let dataForm = {
                 'order_key':"order_num",
                 'order_value':this.props.list.orderId,
                 'page':page,
                 'per_page':5,
                 'shipped':this.state.shipped
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
           const response = await api.post(Constants.url.orderItems,formBody);

           try{
                //console.log("data 1 " + " " + JSON.stringify(response));
                return response;
           }catch(Error){
             //console.log("data 3 responseJson "+Error);
             //this.toggleLoaderOFF();
            // Alert.alert('Alert', 'Please try again later.', [{ text: 'ok' }]);
            this.setState({
                fetching:false
            });
             return "";
           }
         }else{
           this.setState({
               fetching:false
           });
           return "";
         }
       }
       catch (error) {
           console.error(error);
           this.setState({
               fetching:false
           });
           //this.toggleLoaderOFF();
          // Alert.alert('Alert', 'Please try again later.', [{ text: 'ok' }]);
            return "";
       }
     }
  loadPagination=()=>{

    let RouteData = store.getRouteData('orderItems');
    if(RouteData['next_page']==0){
       page = 0;
    }else if(RouteData['next_page']){
       page = RouteData['next_page'];
    }
    if(page>0){

    if(!this.state.fetching){
       this.setState({fetching:true},()=>{

         this.getProductNumber().then((response) => {
             //console.log("inside members 3"+JSON.stringify(response.data.data[0]));
            // this.toggleLoaderOFF();
           if(response && response.data){
             if(response.data.data.length>0){

               if(response.data.data[0]=="fail"){
                  //console.log("inside members 4"+JSON.stringify(response.data.data[0]));
                 this.setState({
                     fetching:false
                 });
               }else{
                  //console.log("inside members 5"+JSON.stringify(response.data.data[0]));
                 let RouteData = store.getRouteData('orderItems');
                 //console.log("inside members 6"+JSON.stringify(RouteData));
                 response.data.data[0]['orderitems'] = RouteData['data'].concat(response.data.data[0]['orderitems']);
                 this.setState({
                     data:response.data.data[0]['orderitems'],
                     fetching:false
                 });
                 //console.log("inside members 7"+JSON.stringify(response.data.data));
                 store.updateItemsData("orderItems",response.data.data[0],response.data.data[0].next_page);
               }

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
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 300;
    //console.log("native "+contentSize.height+" - "+layoutMeasurement.height+ " - " +contentOffset.y)
    //console.log("Native event inisde "+((contentSize.height-layoutMeasurement.height - contentOffset.y) <  (paddingToBottom)));
    return contentSize.height-layoutMeasurement.height - contentOffset.y <  paddingToBottom;
  };

  onEndReached = ({ nativeEvent }) => {
    //console.log("Native event "+ nativeEvent);
      if (this.isCloseToBottom(nativeEvent)) {
         this.loadPagination();
      }
  };

  render() {
    let width = this.state.isTablet?(this.state.isLandscape?this.state.height/6:this.state.width/6):(this.state.isLandscape?this.state.height/4:this.state.width/4);
    let height = this.state.isTablet?(this.state.isLandscape?this.state.width/8:this.state.height/8):(this.state.isLandscape?this.state.width/6:this.state.height/6);

    return (
      <View style={styles.container}>
        <IphoneHeader />
        <ScrollView ref={'scrollView'}
            onContentSizeChange={(contentWidth, contentHeight) => {
            //console.log(" _scrollToBottomY "+contentHeight);
              this._scrollToBottomY = contentHeight;
          }}
          onScroll={this.onEndReached}
          scrollEventThrottle={16}
          stickyHeaderIndices={[1]}
          keyboardDismissMode='interactive'
          keyboardShouldPersistTaps='always' >
            <StatusBar backgroundColor={globalColors.statusBarBck} style={{paddingTop:(Platform.OS=='ios')?50:0}} />
            <View>
              <Header isBack={true} identify={1} img={globalImages.icons.activity.backimg} headerText={"Order Details"} onPressed={this.backPressed} />
            </View>
            <View style={styles.secContainer}>
              <View style={styles.subHeader}>
                  <View style={[styles.subHeaderDetails,{flexDirection:'row',flex:1,height:height/2.5}]}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                      <Text style={styles.headerValue}>ORDER SUMMARY</Text>
                    </View>
                  </View>
              </View>
            </View>
            <View style={styles.secContainer}>
              <View style={styles.detailsContatiner}>
                      <View style={styles.newListOne}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):stylecust.em(3)}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Order Status</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.orderStatus}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):stylecust.em(3)}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Customer Name</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.customer_name}</Text></View>
                            </View>
                          </View>
                      </View>
                      <View style={styles.newListTwo}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):stylecust.em(3)}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Order Date</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.orderDate}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):stylecust.em(3)}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Customer PO</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.customer_po}</Text></View>
                            </View>
                          </View>
                      </View>
                      <View style={styles.newListOne}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):stylecust.em(3)}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Order #</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.orderId}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):stylecust.em(3)}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Salesrep</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.salesrep}</Text></View>
                            </View>
                          </View>
                      </View>
                      <View style={styles.newListTwo}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):stylecust.em(3)}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Order Quantity</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.total_order_qty}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):stylecust.em(3)}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Order Price</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>${this.props.list.totalAmount}</Text></View>
                            </View>
                          </View>
                      </View>
                      <View style={styles.newListOne}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):stylecust.em(3)}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Tracking Number</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.tracking_number}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):stylecust.em(3)}]} />
                      </View>
                     {this.dynamicList()}
              </View>
          </View>
          {this.state.fetching && <View style={{marginTop:15,marginBottom:10}}><ActivityIndicator size="large"/></View>}
          <View style={{ marginBottom:stylecust.em(1),marginTop:stylecust.em(1)}}>
            <TouchableOpacity onPress={this.backPressed} style={{justifyContent:"center",alignItems:"center",marginLeft:stylecust.em(0.5),marginRight:stylecust.em(0.5)}}>
              <View style={{alignItems:"center",flexDirection:"row",borderWidth:1,borderRadius:3,paddingLeft:8,paddingRight:8,paddingTop:4,paddingBottom:4,borderColor:globalColors.headerBck}}>
                <IconFont name="angle-left" size={this.state.isTablet?28:25} color={globalColors.headerBck} style={{marginTop:-1}} />
                <Text style={{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(0.9), marginLeft:stylecust.em(0.3),color:globalColors.headerBck, fontFamily:'Roboto-Bold', fontWeight:"bold",}}>Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    );
  }

}
/*
<View style={styles.newListTwo}>
    <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):stylecust.em(3)}]}>
      <View style={{flexDirection:"row" }}>
          <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Order Type</Text></View>
      </View>
      <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
          <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.orderType}</Text></View>
      </View>
    </View>
    <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):stylecust.em(3)}]}>

    </View>
</View>*/

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:"column",
    backgroundColor:globalColors.listColorOne,
  },
  secondHeader:{
      flex:1
  },
  secHeaderDetails:{
    backgroundColor:globalColors.headerDetails,
    justifyContent:"center",
    alignItems:"center",
    height:stylecust.em(3)
  },
  mainContainer:{
    marginLeft:5 ,
    marginRight:5,
    backgroundColor:globalColors.listColorOne,
    flexDirection:"row",
    marginBottom:10,
    marginTop:10
  },
  detailsContatiner:{
    flex:1,
    flexDirection:"column",
    flexWrap:"wrap",
    marginLeft:-8,marginRight:-5,
  },
  secContainer:{
    backgroundColor:globalColors.listColorOne,
    flexDirection:"column",
    marginBottom:5
  },
  mainTextContatiner:{
    justifyContent:"center",
    marginLeft:10,
    flexDirection:"column",
    flex:1
  },
  mainTextHeader:{
    flexDirection:"row",
    marginBottom:5
  },
  mainTextDetails:{
    flexDirection:"row"
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
  subHeaderText:{
    fontFamily:'Roboto-Bold',
    fontWeight:'bold',
    fontSize:stylecust.em(1.1),
    color:globalColors.headerTxt,
  },
  subHeader:{
    flex:1,
    marginLeft:-5,marginRight:-5,
  },
  subHeaderDetails:{
    backgroundColor:globalColors.headerTwo,
    flexDirection:"row",
    height:stylecust.em(3)
  },
  headerOne:{
    flex:0.5,
    marginLeft:stylecust.em(2),
    marginRight:10,
    justifyContent:'flex-start',
    alignItems:"center",
    flexDirection:'row'
  },
  headerTwoo:{
    flex:0.5,
    marginLeft:stylecust.em(2),
    marginRight:10,
    justifyContent:'flex-start',
    alignItems:"center",
    flexDirection:'row'
  },
  headerValue:{
    fontFamily:'Roboto-Bold',
    fontWeight:'bold',
    fontSize:stylecust.em(0.9),
    color:globalColors.headerTxt,
    marginRight:10
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
    flex:0.5,marginTop:stylecust.em(1),marginBottom:stylecust.em(0.5)
  },
  newListSubOneT:{
    flex:0.35,marginTop:stylecust.em(1),marginBottom:stylecust.em(0.5)
  },
  newListSubTwoT:{
    flex:0.3,marginTop:stylecust.em(1),marginBottom:stylecust.em(0.5)
  },
  newListSubTwoTT:{
    flex:0.2,marginTop:stylecust.em(1),marginBottom:stylecust.em(0.5)
  },
  newListSubThreeT:{
    flex:0.35,marginTop:stylecust.em(1),marginBottom:stylecust.em(0.5),marginLeft:stylecust.em(1)
  },
  newListSubThreeTT:{
    flex:0.5,marginTop:stylecust.em(1),marginBottom:stylecust.em(0.5),marginLeft:stylecust.em(6)
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
  }
});
