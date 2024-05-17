/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Alert,
    Dimensions,Platform
} from 'react-native';
import Icon from '../icon';
import Constants from '../../constants';
import { Actions } from 'react-native-router-flux';
import store from '../../store';
import { observable} from 'mobx'; ;
import { api, setToken, deleteKey } from '../../helper';
import { globalImages, globalColors } from '../../helper';
import stylecust from '../helper/resfont';
import IphoneHeader from '../header/iphonexhr';
import DeviceInfo from 'react-native-device-info';

function DrawerItem(props) {
    let text = props.text;
    let icon = props.icon;

    const active = props.activeItem == props.index;
    if (active){
      if(props.index==0){
          icon = globalImages.icons.activity.product;
      }else if(props.index==1){
          icon = globalImages.icons.activity.product;
      }else{
        icon = globalImages.icons.activity.logout;
      }

    }
    else{
      if(props.index==0){
          icon = globalImages.icons.theme.product;
      }else if(props.index==1){
          icon = globalImages.icons.theme.product;
      }else{
          icon = globalImages.icons.theme.logout;
      }
    }

    setActiveItem = () => {
        props.setActiveItem(props.index);
        if(props.index==0){
          store.currentIndex = 0;
          store.currentroute = "product";
          if(!store.hasNoAccess){
            Actions.home();
          }else{
            Actions.NoAccess();
          }
        }else if(props.index==1){
          store.currentIndex = 1;
          store.currentroute = "myorder";
          if(!store.hasNoAccess){
            Actions.home();
          }else{
            Actions.NoAccess();
          }
        }else{

          Alert.alert(
          'Alert',
          'Do you really want to logout?.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {console.log('OK Pressed');

                deleteKey('loginData');
                deleteKey('isLogged');
                store.tokenLogin = {
                  access_token: "",
                  token_type: "",
                  expires_in: "",
                  resource: "",
                  refresh_token: "",
                  refresh_token_expires_in: "",
                  scope: "",
                  id_token: ""
                };
                store.hasToken = false;
                store.hasNoAccess = false;
                store.hasNoAccessMsg = "You currently have no access to Envision Mobile, please contact your company management to request access";
                store.product = {
                   next_page: 0,
                   active:'item_num',
                   activeTxt:'Item Number',
                   activeNumber:"",
                   @observable data: []
                }
                store.myorder = {
                   next_page: 0,
                   active:'order_num',
                   activeTxt:'Order Number',
                   activeNumber:"",
                   @observable data: []
                }
                store.currentroute = "product";
                store.currentIndex = 0;
                Actions.login();

            }},
          ],
          {cancelable: false},
        );
        }

    }
    return (
        <TouchableOpacity onPress={setActiveItem} style={[styles.item, active && styles.activeItem]}>

            <Icon icon={icon} size={20} />
            <Text style={[styles.itemText, active && styles.activeText]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}
/*{active && <View style={styles.orangeBar} />}*/
export default class Drawer extends Component<{}> {
    constructor(props) {
        super(props);
        console.log("Drawer constructor store.currentIndex",store.currentIndex)
        this.drawerItems = [
            {
              icon: globalImages.icons.activity.product, text: "PRODUCT SEARCH"
            },{
              icon: globalImages.icons.activity.product, text: "ORDER SEARCH"
            },{
               icon: globalImages.icons.activity.logout, text: "LOGOUT"
           }
        ]
        this.state = {
            activeItem: store.currentIndex?store.currentIndex:0,
            isLandscape:DeviceInfo.isLandscape(),
            isTablet:DeviceInfo.isTablet(),
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height,
        };
        Dimensions.addEventListener('change', () => {
          this.setState({
              isLandscape:DeviceInfo.isLandscape(),
              isTablet:DeviceInfo.isTablet(),
              width:Dimensions.get('window').width,
              height:Dimensions.get('window').height
          })
        });
    }
    componentWillReceiveProps(){
      this.setState({
          activeItem: store.currentIndex?store.currentIndex:0
      });
    }
    componentDidMount(){

    }
    setActiveItem = (index) => {
        this.setState({
            activeItem: index
        });
    }
    /*renderImage() {
      //  const avatar = store.photo.avatar;
        if (store && store.photo && store.photo.avatar){
            return (<Avatar img={{uri: store.photo.avatar}} size={50}/>);
        }
        return (
            <Avatar img={require('../../img/dp.png')} size={50}/>
        );
    }*/
    renderName() {
        const avatar = store.memberprofile.Name;
        if (avatar){
            return (<Text allowFontScaling={false} style={styles.name}>{store.memberprofile.Name}</Text>);
        }
        return (
          <Text allowFontScaling={false}  style={styles.name}></Text>
        );
    }
    async removePlayerID() {
      console.log("clicked")
    }
    gotoHomePage = () =>{
      Actions.home(Math.random());
    }
    renderImage(){
      let width = this.state.isTablet?120:80;
      let height = this.state.isTablet?120:80;
      return(<View style={[styles.header,{ height:height}]}>
            <Image source={globalImages.loginImg.logo}
                style={[styles.backgroundImage,{width:width,height:height}]} resizeMode={"cover"}/>
        </View>)
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: globalColors.contentSearchBck}}>
            <IphoneHeader />
            {this.renderImage()}
            <View style={{borderBottomWidth:2,borderColor:globalColors.headerBck,marginBottom:-3}} />
              <View style={{ height:2, backgroundColor:globalColors.contentSearchBck}} />
                <ScrollView style={styles.container}>
                    {this.drawerItems.map((item, index) =>
                        <DrawerItem
                            key={index}
                            setActiveItem={this.setActiveItem}
                            activeItem={this.state.activeItem}
                            index={index}
                            icon={item.icon}
                            text={item.text}
                            logout={() => this.removePlayerID()}
                            />)
                    }


                </ScrollView>

            </View>

        );
    }
}
/*<Text style={styles.versionText}>{global.installedVersion}</Text>*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 80,
        marginBottom: 25,
        marginTop:(Platform.OS=="ios")?35:35,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column'
    },
    backgroundImage: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        paddingBottom:20
    },
    name: {
        color: globalColors.headerBck,
        fontFamily: 'Roboto-Bold',
        paddingLeft: 10
    },
    item: {
        flexDirection: 'row',
        padding: 18,
        paddingLeft: 20,
        paddingRight: 20
    },
    activeItem: {
        backgroundColor: globalColors.headerBck
    },
    activeText: {
        color: globalColors.contentListBck,
        fontFamily: 'Roboto-Regular',
        fontSize: stylecust.em(0.9)
    },
    itemText: {
        paddingLeft: 15,
        color: globalColors.headerBck,
        fontFamily: 'Roboto-Regular',
        fontSize: stylecust.em(0.9),
        marginTop:2
    },
    orangeBar: {
        position: 'absolute',
        height: 50,
        width: 3,
        backgroundColor: '#ed8b00'
    },
    dropdown: {
        flex: 1, alignItems: 'flex-end'
    },
    versionText:{
        color:globalColors.headerBck,
        position:'absolute',
        left: 20,
        bottom: 20,
        fontSize: stylecust.em(1),
        fontFamily: 'Roboto-Bold',
        justifyContent:'flex-end',
        alignItems:'flex-start'
    }
});
