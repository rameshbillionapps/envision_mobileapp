/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
 
export default class Icon extends Component<{}> {
    static defaultProps = {
        size: 15
    };

    render() {
        const req = this.props.icon;
        return (
            <Image source={req}
                style={[styles.avatarContainer, {
                    height: this.props.size,
                    width: this.props.size,
                }]} resizeMode={'contain'} />
        );
    }
}

const styles = StyleSheet.create({
    avatarContainer: {
        overflow: 'hidden',
    },

});
