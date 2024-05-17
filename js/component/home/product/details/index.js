/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {ScrollView, StatusBar, Dimensions, Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { globalImages, globalColors } from '../../../../helper';
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
      loaded:true
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
    if(this.props.list){
    //  this.cartonDime = Math.round(this.props.list.dimensions.carton.length * this.props.list.dimensions.carton.width);
      if(this.props.list.dimensions.carton.length && this.props.list.dimensions.carton.width && this.props.list.dimensions.carton.height){
        this.cartonDime = this.props.list.dimensions.carton.length+" X "+this.props.list.dimensions.carton.width+" X "+this.props.list.dimensions.carton.height;
      }
      //this.pieceDime = Math.round(this.props.list.dimensions.piece.length * this.props.list.dimensions.piece.width);
      if(this.props.list.dimensions.piece.length && this.props.list.dimensions.piece.width && this.props.list.dimensions.piece.height){
        this.pieceDime = this.props.list.dimensions.piece.length+" X "+this.props.list.dimensions.piece.width+" X "+this.props.list.dimensions.piece.height;
      }
      if(this.props.list.imageLocation){
        var imageInx = this.props.list.imageLocation.lastIndexOf("/");
        var imageInxFin = this.props.list.imageLocation.substring(imageInx+1);
        this.imageAvailable = imageInxFin.indexOf(".")>-1;
      }

    }
    this.hfcspace = this.state.isTablet? "":"                 ";
  }
  backPressed = () =>{
    Actions.pop();
  }

  /*
  *
  <View style={{marginLeft:this.state.isTablet?stylecust.em(1.5):10,marginTop:20,marginBottom:10,flex:0.3}}>
        <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(0.9):stylecust.em(0.9),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Style #</Text></View>
      <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(0.9):stylecust.em(0.9),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Color</Text></View>
      <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(0.9):stylecust.em(0.9),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Size</Text></View>
      <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(0.9):stylecust.em(0.9),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Parent SKU</Text></View>
  </View>

  <View style={{marginLeft:this.state.isTablet?stylecust.em(1.5):10,marginTop:20,marginBottom:10,flex:0.3}}>
      <View style={{flexWrap:"wrap",marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.9):stylecust.em(0.9),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.item_num_display}</Text></View>
      <View style={{flexWrap:"wrap",marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.9):stylecust.em(0.9),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.color}</Text></View>
      <View style={{flexWrap:"wrap",marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.9):stylecust.em(0.9),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.size}</Text></View>
      <View style={{flexWrap:"wrap",marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.9):stylecust.em(0.9),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.parentSku}</Text></View>
  </View>
  */
  /*
  <View style={styles.newListOne}>
      <View style={[styles.newListSubOne,{flex:1,marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(2.2):stylecust.em(2.7))}]}>
        <View style={{flexDirection:"row" }}>
            <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Long Description</Text></View>
        </View>
        <View style={{flexDirection:"row",flexWrap:'wrap'}}>
            <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.descriptionLong}</Text></View>
        </View>
      </View>
  </View>*/

  dynamicList=(width,height)=>{
  if(this.props.list.phased.availability){
    return(
      <View>
          <View style={styles.secondHeader}>
                <View style={[styles.secHeaderDetails,{height:height/2}]}>
                    <Text style={styles.subHeaderText}> PHASED AVAILABILITY </Text>
                </View>
          </View>
          {this.props.list.phased.availability.map((val,index)=>{
            return(
              <View style={{paddingLeft:10}}>
                  <View style={styles.newListOne}>
                       <View style={{flexDirection:"column",flex:(this.state.isTablet)?0.5:0.5,paddingTop:20,paddingBottom:20,backgroundColor:((index%2)==0)?globalColors.listColorOne:globalColors.listColorTwo}}>
                         <View style={{marginLeft:this.state.isTablet?stylecust.em(1.5):10,marginTop:0,marginBottom:0}}>
                            <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                                <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Warehouse </Text></View>
                                <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-27,marginBottom:-20,marginLeft:10,marginRight:10,borderColor:globalColors.heaBorderClr}}/>
                                <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8),fontWeight:"normal"}]}>{val.WAREHOUSE_ID}</Text></View>
                            </View>
                            <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                                <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Avail Date </Text></View>
                                <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-20,marginBottom:-20,marginLeft:10,marginRight:10,borderColor:globalColors.heaBorderClr}}/>
                                <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8),fontWeight:"normal"}]}>{(val.Avail_Date).trim()} </Text></View>
                            </View>
                            <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                                <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Available to Sell</Text></View>
                                <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-20,marginBottom:-20,marginLeft:10,marginRight:10,borderColor:globalColors.heaBorderClr}}/>
                                <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8),fontWeight:"normal"}]}>{val.Avail_Sell_Qty} </Text></View>
                            </View>
                            <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                                <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Intransit </Text></View>
                                <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-20,marginBottom:-30,marginLeft:10,marginRight:10,borderColor:globalColors.heaBorderClr}}/>
                                <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8),fontWeight:"normal"}]}>{val.Intransit} </Text></View>
                            </View>
                         </View>
                       </View>
                       <View style={{backgroundColor:((index%2)==0)?globalColors.listColorOne:globalColors.listColorTwo,borderRightWidth:(this.state.isTablet)?1:1,borderColor:globalColors.heaBorderClr}}/>
                      <View style={{flexDirection:"column",flex:(this.state.isTablet)?0.5:0.5,paddingTop:20,paddingBottom:20,backgroundColor:((index%2)==0)?globalColors.listColorOne:globalColors.listColorTwo}}>
                         <View style={{marginLeft:this.state.isTablet?stylecust.em(1.5):10,marginTop:0,marginBottom:0}}>
                            <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                                <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>DueMarker </Text></View>
                                <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-27,marginBottom:-20,marginLeft:10,marginRight:10,borderColor:globalColors.heaBorderClr}}/>
                                <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8),fontWeight:"normal"}]}>{val.Due_Maker} </Text></View>
                            </View>
                            <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                                <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Confirmed </Text></View>
                                <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-20,marginBottom:-20,marginLeft:10,marginRight:10,borderColor:globalColors.heaBorderClr}}/>
                                <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8),fontWeight:"normal"}]}>{val.Confirmed} </Text></View>
                            </View>
                            <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                                {this.state.isTablet? <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>HFC </Text></View>
                                : <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>HFC </Text><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>{this.hfcspace}</Text></View>
                                }
                                <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-20,marginBottom:-20,marginLeft:10,marginRight:10,borderColor:globalColors.heaBorderClr}}/>
                                <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8),fontWeight:"normal"}]}>{val.HFC} </Text></View>
                            </View>
                            <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                                <View style={{flex:0.5}}><Text style={[styles.itemHeader,{fontSize:stylecust.em(0.8)}]}>Picked </Text></View>
                              <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-20,marginBottom:-38,marginLeft:10,marginRight:10,borderColor:globalColors.heaBorderClr}}/>
                                <View style={{flex:0.5,marginRight:7}}><Text style={[styles.itemNumber,{fontSize:stylecust.em(0.8),fontWeight:"normal"}]}>{val.Picked} </Text></View>
                            </View>
                         </View>
                       </View>
                   </View>
                    {(index!=(this.props.list.phased.availability.length-1)) && <View style={[styles.secondHeader,{marginLeft:-4}]}>
                        <View style={[styles.secHeaderDetails,{height:1,backgroundColor:globalColors.heaBorderClr}]}>
                      </View>
                   </View>}
              </View>
               )
            })}
      </View>
    )
  }
  }
  render() {
    let width = this.state.isTablet?(this.state.isLandscape?this.state.height/6:this.state.width/4):(this.state.isLandscape?this.state.height/4:this.state.width/3);
    let height = this.state.isTablet?(this.state.isLandscape?this.state.width/8:this.state.height/11.5):(this.state.isLandscape?this.state.width/6:this.state.height/8);

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
          keyboardShouldPersistTaps='always'
          style={{paddingBottom:50}}>
            <StatusBar backgroundColor={globalColors.statusBarBck} style={{paddingTop:(Platform.OS=='ios')?50:0}} />
            <View>
                <Header isBack={true} identify={1} img={globalImages.icons.activity.backimg} headerText={"Product Details"} onPressed={this.backPressed} />
                <View style={[styles.mainContainer,{paddingTop:5,paddingBottom:5}]}>
                    <View style={{flex:0.4}}>

                    {(this.imageAvailable && this.state.loaded) && <View style={[styles.overlay,{  flex: 1,top:(Platform.OS=="ios")?5:15,bottom:0,left:(this.state.isTablet)?50:10,backgroundColor:"#ccc",height:height,width:width}]}>
                     <Text style={{fontFamily: 'Lato-Regular',color:"#595959",fontSize: 14, textAlign:'center'}} > Loading ... </Text>
                    </View>}
                    {this.imageAvailable && <Image
                      key = {this.props.list.imageLocation}
                      style={{
                      flex: 1,
                      width: null,
                      height: null,
                      resizeMode: this.state.isTablet?'contain':'contain'}}
                      source={{uri:this.props.list.imageLocation,cache: 'force-cache'}}
                      onLoadStart={() => {
                         this.setState({loaded:(this.imageAvailable)?true:false})
                      }}
                      onLoad={()=>{
                        this.setState({loaded:false})
                      }}/>}
                      {!this.imageAvailable && <Image
                        key = {this.props.list.imageLocation}
                        style={{
                        flex: 1,
                        width: null,
                        height: null,
                        resizeMode: this.state.isTablet?'contain':'contain'}}
                        source={globalImages.icons.activity.no_image_icon}
                        onLoadStart={() => {
                           this.setState({loaded:(this.imageAvailable)?true:false})
                        }}
                        onLoad={()=>{
                          this.setState({loaded:false})
                        }}/>}
                    </View>
                    <View style={{borderRightWidth:(this.state.isTablet)?1:0.3,marginTop:-5,marginBottom:-5,borderColor:globalColors.heaBorderClr}}/>
                    <View style={{marginLeft:this.state.isTablet?stylecust.em(1.5):10,marginRight:7,marginTop:10,marginBottom:10,flexDirection:'column',flex:0.6}}>
                        <View style={{flexDirection:"row"}}>
                            <View style={{flex:0.4}}><Text style={styles.itemHeader}>Style #</Text></View>
                            <View style={{flex:0.6,marginLeft:5}}><Text style={styles.itemNumber}>{this.props.list.style_number}</Text></View>
                        </View>
                        <View style={{flexDirection:"row",marginTop:7,marginBottom:7}}>
                            <View style={{flex:0.4}}><Text style={styles.itemHeader}>Color</Text></View>
                            <View style={{flex:0.6,marginLeft:5}}><Text style={styles.itemNumber}>{this.props.list.colorDescription}</Text></View>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <View style={{flex:0.4}}><Text style={styles.itemHeader}>Description</Text></View>
                            <View style={{flex:0.6,marginLeft:5}}><Text style={styles.itemNumber}>{this.props.list.descriptionLong}</Text></View>
                        </View>
                    </View>

                </View>

              <View style={styles.secContainer}>
                <View style={styles.subHeader}>
                    <View style={[styles.subHeaderDetails,{flexDirection:'row',flex:1,height:(this.state.isTablet)?height/1.8:height/1.8}]}>
                        <View style={{marginLeft:10,marginTop:8,marginBottom:5,marginRight:10,flex:0.5,flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                            <View><Text style={styles.headerValue}>AVAILABLE NOW</Text></View>
                            <View><Text style={styles.headerValue}>{(this.props.list.available_now>0)?this.props.list.available_now:"0"}</Text></View>
                        </View>
                        <View style={{borderRightWidth:(this.state.isTablet)?1:0.5,borderColor:globalColors.contentListBck}}/>
                        <View style={{marginLeft:10,marginTop:8,marginBottom:5,marginRight:10,flex:0.5,flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                            <View><Text style={styles.headerValue}>AVAILABLE TO SELL</Text></View>
                            <View><Text style={styles.headerValue}>{(this.props.list.available_to_sell>0)?this.props.list.available_to_sell:"0"}</Text></View>
                        </View>
                    </View>
                </View>
              </View>


            </View>
              <View styles={styles.secContainer}>
                  <View style={styles.subHeader}>


                      <View style={styles.newListTwo}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(2.2):stylecust.em(2.7))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>UPC</Text></View>
                            </View>
                            <View style={{ flexDirection:"row"}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.variants.parentUpcNum}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(1):stylecust.em(1.5))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Product Line</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.prodLine}</Text></View>
                            </View>
                          </View>
                      </View>
                      <View style={styles.newListOne}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(2.2):stylecust.em(2.7))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Gender</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.genderdesc}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(1):stylecust.em(1.5))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>HTS</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.hts}</Text></View>
                            </View>
                          </View>
                      </View>
                      <View style={styles.newListTwo}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(2.2):stylecust.em(2.7))}]}>
                            <View style={{flexDirection:"row" }}>
                                  <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Commodity</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                  <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.commodity}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(1):stylecust.em(1.5))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>CBM</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.cbm}</Text></View>
                            </View>
                          </View>
                      </View>
                      <View style={styles.newListOne}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(2.2):stylecust.em(2.7))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Onhand Qty</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.on_hand}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(1):stylecust.em(1.5))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Sub Commodity</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.sub_commodity}</Text></View>
                            </View>
                          </View>
                      </View>
                      <View style={styles.newListTwo}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(2.2):stylecust.em(2.7))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Selling Price</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>${(this.props.list.variants.price.sellPrice)?this.props.list.variants.price.sellPrice:"0.0"}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(1):stylecust.em(1.5))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Retail Price</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>${(this.props.list.variants.price.retailPrice)?this.props.list.variants.price.retailPrice:"0.0"}</Text></View>
                            </View>
                          </View>
                      </View>

                      <View style={styles.secondHeader}>
                            <View style={[styles.secHeaderDetails,{height:height/2}]}>
                                <Text style={styles.subHeaderText}> DIMENSION </Text>
                            </View>
                      </View>
                      <View style={styles.newListOne}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(2.2):stylecust.em(2.7))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Carton Dimension</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.cartonDime}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(1):stylecust.em(1.5))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Piece Dimension</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.pieceDime}</Text></View>
                            </View>
                          </View>
                      </View>
                      <View style={styles.newListTwo}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(2.2):stylecust.em(2.7))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Carton Weight</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.dimensions.weight.carton}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(1):stylecust.em(1.5))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Piece Weight</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.dimensions.weight.piece}</Text></View>
                            </View>
                          </View>
                      </View>
                      <View style={styles.secondHeader}>
                            <View style={[styles.secHeaderDetails,{height:height/2}]}>
                                <Text style={styles.subHeaderText}> PACK </Text>
                            </View>
                      </View>
                      <View style={styles.newListOne}>
                          <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(2.2):stylecust.em(2.7))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Master Pack</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.pack.masterPack}</Text></View>
                            </View>
                          </View>
                          <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(1):stylecust.em(1.5))}]}>
                            <View style={{flexDirection:"row" }}>
                                <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Inner Pack</Text></View>
                            </View>
                            <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
                                <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.pack.innerPack1}</Text></View>
                            </View>
                          </View>
                      </View>

                    {this.dynamicList(width,height)}
                      <View style={[styles.secondHeader,{marginTop:0}]}>
                            <View style={[styles.secHeaderDetails,{height:5}]}>
                            </View>
                      </View>
                  </View>
              </View>
              <View style={{ marginBottom:stylecust.em(1),marginTop:stylecust.em(1)}}>
                <TouchableOpacity onPress={this.backPressed} style={{justifyContent:"center",alignItems:"center",marginLeft:stylecust.em(0.5),marginRight:stylecust.em(0.5)}}>
                  <View style={{alignItems:"center",flexDirection:"row",borderWidth:1,borderRadius:3,paddingLeft:8,paddingRight:8,paddingTop:this.state.isTablet?8:4,paddingBottom:this.state.isTablet?8:4,borderColor:globalColors.headerBck}}>
                    <IconFont name="angle-left" size={this.state.isTablet?28:25} color={globalColors.headerBck} style={{marginTop:-1}} />
                    <Text style={{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(0.9), marginLeft:stylecust.em(0.3),color:globalColors.headerBck, fontFamily:'Roboto-Bold', fontWeight:"bold",}}>BACK</Text>
                  </View>
                </TouchableOpacity>
              </View>

        </ScrollView>
      </View>

    );
  }


}
/*  <View style={styles.newListTwo}>
      <View style={[styles.newListSubOne,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(2.2):stylecust.em(2.7))}]}>
        <View style={{flexDirection:"row" }}>
            <View style={{}}><Text style={[styles.itemHeader,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>Inner Pack2</Text></View>
        </View>
        <View style={{ flexDirection:"row",flexWrap:'wrap'}}>
            <View style={{flexWrap:'wrap',marginRight:10}}><Text style={[styles.itemNumber,{fontSize:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.8),marginBottom:this.state.isTablet?stylecust.em(0.8):stylecust.em(0.6)}]}>{this.props.list.pack.innerPack2}</Text></View>
        </View>
      </View>
      <View style={[styles.newListSubTwo,{marginLeft:this.state.isTablet?stylecust.em(7.5):((Platform.OS=="ios")?stylecust.em(1):stylecust.em(1.5))}]} />

  </View>*/
const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:"column",
    backgroundColor:globalColors.listColorOne,
  },
  secondHeader:{
      flex:1,
  },
  secHeaderDetails:{
      backgroundColor:globalColors.headerDetails,
      justifyContent:"center",
      alignItems:"center",
      height:stylecust.em(3)
  },
  mainContainer:{
    backgroundColor:globalColors.listColorOne,
    flexDirection:"row",
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
    fontSize:stylecust.em(0.9),
    color:globalColors.contentTxtClr
  },
  itemNumber:{
    fontFamily:'Roboto-Regular',
    fontWeight:'normal',
    fontSize:stylecust.em(0.9),
    color:globalColors.headerSearchTxt
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
    justifyContent:'center',
    alignItems:"center",
    flexDirection:'row'
  },
  headerTwoo:{
    flex:0.5,
    marginLeft:stylecust.em(2),
    marginRight:10,
    justifyContent:'center',
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
    flex:0.5,alignItems:'flex-start',justifyContent:'center',marginTop:stylecust.em(1),marginBottom:stylecust.em(0.5)
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
