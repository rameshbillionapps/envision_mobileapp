/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions,TouchableOpacity} from 'react-native';
import Icon from '../icon';
import { globalImages, globalColors } from '../../helper';
import { ifIphoneX , isIphoneX} from 'react-native-iphone-x-helper';
import stylecust from '../helper/resfont';
import DeviceInfo from 'react-native-device-info';

import IconFont from 'react-native-vector-icons/FontAwesome';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
      super(props);
     this.state = {
          isLandscape:DeviceInfo.isLandscape(),
          isTablet:DeviceInfo.isTablet(),
          width:Dimensions.get('window').width,
          height:Dimensions.get('window').height,
      }
      Dimensions.addEventListener('change', () => {
        this.setState({
            isLandscape:DeviceInfo.isLandscape(),
            isTablet:DeviceInfo.isTablet(),
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height
        })
      });

  }
  onPressed=()=>{
    if(this.props.identify){
      Actions.pop()
    }else{
      this.props.onPressed();
    }
  }
  isBackButton=()=>{
   if(this.props.isBack){
     return(
        <View style={styles.headerPop}>
         <TouchableOpacity onPress={this.props.onPressed} style={{}}>
           <View style={{alignItems:"center",flexDirection:"row",borderWidth:1,paddingLeft:8,paddingRight:8,paddingTop:4,paddingBottom:4,borderRadius:3,borderColor:globalColors.headerTxt}}>
             <IconFont name="angle-left" size={this.state.isTablet?28:25} color={globalColors.headerTxt} style={{marginTop:-1}} />
             <Text style={{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(0.9), marginLeft:stylecust.em(0.3),color:globalColors.headerTxt, fontFamily:'Roboto-Bold', fontWeight:"bold",}}>Back</Text>
           </View>
         </TouchableOpacity>
        </View>
         )
   }else{
     return(
       <View style={styles.headerPop}>
         <TouchableOpacity onPress={this.props.onPressed} style={{}}>
           <View style={{alignItems:"center",flexDirection:"row"}}>
             <Icon icon={this.props.img?this.props.img:globalImages.header.menuicon} size={this.state.isTablet? 27: 23}/>
             {this.props.isBack && <Text style={[styles.headerText,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1)}]}>BACK</Text>}
           </View>
         </TouchableOpacity>
       </View>
       )
   }
  }
  render() {
    return (
      <View style={[styles.container,{height:this.state.isTablet?100:70}]}>

        {this.isBackButton()}
        <View style={{}}>
          <Text style={[styles.headerText,{fontSize:this.state.isTablet?stylecust.em(1.5):stylecust.em(1.3)}]}>{this.props.headerText?this.props.headerText:'Home'}</Text>
        </View>
      </View>
    );
  }
}
/*<TouchableOpacity onPress={this.props.onPressed} style={{flex:this.props.isBack?(this.state.isTablet?1.5:2):1.5,marginLeft:stylecust.em(0.5),marginRight:stylecust.em(0.5)}}>
  <View style={{alignItems:"center",flexDirection:"row",borderWidth:this.props.isBack?1:0,paddingLeft:8,paddingRight:8,paddingTop:this.state.isTablet?8:5,paddingBottom:this.state.isTablet?8:5,borderColor:globalColors.contentListBck}}>
    <Icon icon={this.props.img?this.props.img:globalImages.header.menuicon} size={this.state.isTablet?this.props.isBack?25:27:this.props.isBack?15:23}/>
    {this.props.isBack && <Text style={[styles.headerText,{fontSize:this.state.isTablet?stylecust.em(1):stylecust.em(1)}]}>BACK</Text>}
  </View>
</TouchableOpacity>*/
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: globalColors.headerBck,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'center',
    ...ifIphoneX({
        paddingTop:  (Platform.OS === 'ios') ? 5 : 0,
        height: 70,
      },
      {
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        height: 70
      })
  },
  headerPop:{
    position:'absolute',
    left:15,
    justifyContent:'center',
    ...ifIphoneX({
      top:(Platform.OS === 'ios') ? 5 : 0,
    },
    {
      top:(Platform.OS === 'ios') ? 15 : 0,
    }),
    bottom:0,
    alignItems:"center",
  },
  headerText:{
    color:globalColors.headerTxt,
    fontFamily:'Roboto-Bold',
    fontWeight:"bold",
  }
});
