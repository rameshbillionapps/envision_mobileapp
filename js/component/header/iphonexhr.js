/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { globalImages, globalColors } from '../../helper';

export default class IphoneXHr extends Component<{}> {

    renderBarIphoneX(){

        if (isIphoneX()) {
           return(<View style={{backgroundColor:globalColors.statusBarBck,paddingTop:35}} />)
        } else {
            // do that...
        }
    }

    render() {
        return (
            <View>{this.renderBarIphoneX()}</View>
        );
    }
}
