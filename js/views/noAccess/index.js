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
import NoAccess from '../../component/noAccess';
import { globalImages, globalColors } from '../../helper';
import {Actions} from 'react-native-router-flux';
import store from '../../store';

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state={}
    if(!store.hasNoAccess){
      Actions.home();
      return;
    }
  }
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      return contentSize.height-layoutMeasurement.height - contentOffset.y <  500;
  };

  onEndReached = ({ nativeEvent }) => {
       if (this.isCloseToBottom(nativeEvent)) {
      }
  };
  componentWillReceiveProps(nextProps) {
        Actions.DrawerClose();
  };
  backPressed = () =>{
    Actions.drawerOpen()
  }

  render() {
      // console.log('inside F');

      return (

          <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.container}>
                <IphoneHeader />
                <ScrollView ref={'scrollView'}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                    }}
                    onScroll={this.onEndReached}
                    scrollEventThrottle={3}
                    stickyHeaderIndices={[2]}
                    keyboardShouldPersistTaps={'always'}
                    keyboardDismissMode='on-drag' >
                      <StatusBar backgroundColor={globalColors.statusBarBck} style={{paddingTop:(Platform.OS=='ios')?50:0}} />
                      <Header isBack={false} img={globalImages.header.menuicon} headerText={"Product / Order Search"} onPressed={this.backPressed}/>
                      <NoAccess />
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
    flex:1, backgroundColor:globalColors.contentSearchBck,
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
