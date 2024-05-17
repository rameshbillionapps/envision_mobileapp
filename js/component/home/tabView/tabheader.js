import React, { Component, PureComponent } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Platform
} from 'react-native';
import envision from '../../home';
import stylecust from '../../helper/resfont';
const { width } = Dimensions.get('window');
import { globalImages, globalColors } from '../../../helper';
import DeviceInfo from 'react-native-device-info';
import store from '../../../store';

class TabHeader extends Component {

  constructor(props) {
      super(props);
      this.state = {
          widthDevice:Dimensions.get('window').width,
          isTablet:DeviceInfo.isTablet()
      }
      //console.log(" stylecust "+stylecust.DEVICE_WIDTH+ "  "+this.state.widthDevice);
      Dimensions.addEventListener('change', () => {
        //alert("hi");
           this.setState({
              widthDevice:Dimensions.get('window').width,
              isTablet:DeviceInfo.isTablet()
          });
      });
      //console.log(" stylecust "+stylecust.DEVICE_WIDTH+ "  "+this.state.widthDevice);

  }

  state = {
      tabWidth: 0
  }

  tabWidthCalculator = (e) => {
      this.setState({
          tabWidth: e.nativeEvent.layout.width
      })
  }
  navigateToPage = (e) => {
      this.props.gotoPage(this.props.index);
  }
  render() {
      const tabTextStyle = this.props.activeTab == this.props.index ? styles.tabTextActiveStyle : styles.tabTextInactiveStyle;
      return (
          <TouchableOpacity onPress={this.navigateToPage}>
              <View onLayout={this.tabWidthCalculator} style={[styles.tabStyle,{height:this.state.isTablet?70:60,width:this.state.widthDevice/2}]}>
                  <Text style={[tabTextStyle,{fontSize:this.state.isTablet?stylecust.em(1.2):stylecust.em(1.1),marginLeft:(Platform.OS=='ios')?stylecust.em(1):stylecust.em(0.5)}]} >{this.props.tab}</Text>
                  {
                      this.props.activeTab === this.props.index &&
                      <View style={[styles.underline, {marginLeft:(Platform.OS=='ios')?stylecust.em(0):stylecust.em(0), width: this.state.tabWidth }]} />
                  }
              </View>
          </TouchableOpacity>
      )
  }
}

export default class BTabView extends Component {
    constructor(props) {
        super(props);
        this.tabs = ['Product Search', 'Order Search'];
        this.state = {
            activeTab: this.props.activeTab,
            containerWidth: 0,
            tabBarWidth: 0,
            widthDevice:Dimensions.get('window').width,
            isTablet:DeviceInfo.isTablet(),
        }
        //console.log(" stylecust "+stylecust.DEVICE_WIDTH+ "  "+this.state.widthDevice);
        Dimensions.addEventListener('change', () => {
          //alert("hi");
             this.setState({
                widthDevice:Dimensions.get('window').width,
                isTablet:DeviceInfo.isTablet(),
            });
        });
        //console.log(" stylecust "+stylecust.DEVICE_WIDTH+ "  "+this.state.widthDevice);

    }
    gotoPage = (index) => {
        this.setState({
            activeTab: index
        }, () => {
            route = ""
            switch(index){
                case 0: route = "product";break;
                case 1: route = "myorder";break;
                default:
                    route = "product";
            }
          //  console.log("route "+route);
            this.props.updateRoute(route);
            store.currentroute = route;
            //console.log("route "+route+" "+store.currentroute);
            store.currentIndex = index;
        })
    }

    renderHeader() {
        return (
            <View style={styles.tabBar} onLayout={this.headerSizeChange}>
                <ScrollView
                    horizontal={true}
                    onContentSizeChange={this.tabBarContentSize}
                    showsHorizontalScrollIndicator={false}>
                    {
                        this.tabs.map((val, index) =>
                            <TabHeader
                                key={index}
                                tab={val}
                                index={index}
                                activeTab={this.state.activeTab}
                                gotoPage={this.gotoPage} />
                        )
                    }
                </ScrollView>
            </View>
        )
    }

    renderChildren() {
        return (
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}>
                <View style={{ width: width }}>
                  <envision.product />
                </View>
            </ScrollView>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    tabBar: {
        alignItems: 'flex-start',
        borderBottomWidth:1,
        borderColor:globalColors.borderTabClr
    },

    underline: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: globalColors.tabbarClr,
        height: 4,
    },
    tabStyle: {
        height: 60,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center',
        alignItems:'center'
    },
    tabTextActiveStyle: {
        color: globalColors.selectedClr,
        fontFamily: 'Roboto-Bold',
        fontWeight:'bold',
        fontSize: (Platform.OS=='ios')?stylecust.em(1.1):stylecust.em(1)
    },
    tabTextInactiveStyle: {
        color: globalColors.unSelectedClr,
        fontFamily: 'Roboto-Regular',
        fontWeight:'bold',
        fontSize: (Platform.OS=='ios')?stylecust.em(1.1):stylecust.em(1)
    }
})
