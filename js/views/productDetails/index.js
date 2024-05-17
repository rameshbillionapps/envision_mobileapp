/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StatusBar, ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, Platform, Keyboard, Animated} from 'react-native';
import Header from '../../component/header';
import IphoneHeader from '../../component/header/iphonexhr';
import ProductDetailsView from '../../component/home/product/details';
import { globalImages, globalColors } from '../../helper';
import {Actions} from 'react-native-router-flux';

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
    console.log("props New onw "+JSON.stringify(props));
    this._isMounted = false;
  }

  componentDidMount() {
      this._isMounted = true;
    //  this._isMounted && this.renderChildren(this.props.route);
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  backPressed = () =>{
    Actions.pop();
  }
  render() {
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
                    <Header isBack={false}  identify={1} img={globalImages.icons.activity.backimg} headerText={"Details"} onPressed={this.backPressed} />
                    <ProductDetailsView {...this.props} />
                </ScrollView>
        </View>
     );
   }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
