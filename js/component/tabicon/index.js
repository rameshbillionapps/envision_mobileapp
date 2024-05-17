import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from '../icon';
import { globalImages, globalColors } from '../../helper';

export default class TabIcon extends Component {
    constructor(props) {
        super(props);
        this.iconTxt = this.props.iconName;
        //this.icon = '';
        if(this.iconTxt=="menuicon.png"){
            this.icon = globalImages.header.menuicon;
        }
        if(props.focused){
          //  this.icon = this.icon.replace('off','on');
            if(this.iconTxt=="menuicon.png"){
                this.icon = globalImages.header.menuicon;
            }
        }
    }
    render() {
        return (
            <Icon icon={this.icon} size={27}/>
        )
    }
}
