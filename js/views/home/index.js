/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StatusBar, TouchableOpacity,ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, Platform, Keyboard,
   Animated, Dimensions, ActivityIndicator} from 'react-native';
import Header from '../../component/header';
import IphoneHeader from '../../component/header/iphonexhr';
import TabView from '../../component/home/tabView';
import { globalImages, globalColors } from '../../helper';
import {Actions} from 'react-native-router-flux';
import store from '../../store';

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state={scrollY: new Animated.Value(0),uploading:false,route:store.currentroute?store.currentroute:"product",activeTab:store.currentIndex?store.currentIndex:0}
    this._scrollToBottomY = 0;
    this.ScrollPosition = 0;
    console.log("store.hasNoAcces "+store.hasNoAccess)
    if(store.hasNoAccess){
      Actions.NoAccess();
      return;
    }
  }
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 200;
    console.log("Native event inisde "+((contentSize.height-layoutMeasurement.height - contentOffset.y) <  (paddingToBottom)));
    return contentSize.height-layoutMeasurement.height - contentOffset.y <  paddingToBottom;
  };

  onEndReached = ({ nativeEvent }) => {
    console.log("Native event "+ nativeEvent);
      if (this.isCloseToBottom(nativeEvent)) {
         this.tabContent.loadPagination();
      }
  };
  updateLoading = (uploading) => {
    //console.log("uploading "+uploading);
      this.setState({
          uploading
      })

  };

    updateRoute = (route) => {
        //console.log("updte " + route);
        this.setState({
            route: route
        })
    };

  moveScrollToEnd(code) {
      //console.log(" _scrollToBottomYcode "+this.ScrollPosition+" this._scrollToBottomY "+code);
      if(code!=0){
        if(Platform.OS==="android"){
          //this.refs.scrollView.scrollTo({ y: (this._scrollToBottomY+100) });
        }else{
          this.refs.scrollView.scrollTo({ y: (this.ScrollPosition+200)});
        }
      }else{
        //this.refs.scrollView.scrollTo({ y: (this._scrollToBottomY-800) });
      }
  }
  componentWillReceiveProps(nextProps) {
        Actions.DrawerClose();
  };
  backPressed = () =>{
    Actions.drawerOpen()
  }

  render() {
      // console.log('inside F');
      const headerHeight = this.state.scrollY.interpolate({
          inputRange: [0, 300],
          outputRange: [300, 0],
          extrapolate: 'clamp',
      });
      return (

          <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.container}>
                <IphoneHeader />
                <ScrollView ref={'scrollView'}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                      //console.log(" _scrollToBottomY "+contentHeight);
                        this._scrollToBottomY = contentHeight;
                    }}
                    onScroll={this.onEndReached}
                    scrollEventThrottle={3}
                    stickyHeaderIndices={[2]}
                    keyboardShouldPersistTaps={'always'}
                    keyboardDismissMode='on-drag' >
                      <StatusBar backgroundColor={globalColors.statusBarBck} style={{paddingTop:(Platform.OS=='ios')?50:0}} />
                      <Header isBack={false} img={globalImages.header.menuicon} headerText={"Product / Order Search"} onPressed={this.backPressed}/>
                      <TabView.Header updateRoute={this.updateRoute} activeTab={this.state.activeTab} />
                      <TabView.Content updateLoading={this.updateLoading} scrollY={this.state.scrollY} ref={(ref) => this.tabContent = ref}
                         moveScrollToEnd={(code)=>this.moveScrollToEnd(code)} route={this.state.route} />
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
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,      backgroundColor:globalColors.contentSearchBck,
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
