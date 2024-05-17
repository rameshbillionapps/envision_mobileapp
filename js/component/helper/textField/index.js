import React, { Component } from 'react';
import {
    TextInput
} from 'react-native';
import stylecust from '../../helper/resfont';


export default class TextField extends Component<{}> {

  constructor(props){
    super(props)
  }
  clear() {
    return this._textInput.clear();
  }

  focus() {
    return this._textInput.focus();
  }
  blur() {
    return this._textInput.blur();
  }
  render(){
    return(
      <TextInput onSubmitEditing={this.props.onSubmitEditing}
         keyboardType={this.props.keyboardType}
         editable = {this.props.editable?false:true}
         onLayout={this.props.onLayout}
         returnKeyType={this.props.returnKeyType}
         placeholder={this.props.placeholder}
         placeholderTextColor= {this.props.placeholderTextColor}
         onChangeText={this.props.onChangeText}
         underlineColorAndroid="transparent"
         style={this.props.style}
         onFocus={this.props.onFocus}
         onBlur={this.props.onBlur}
         textAlignVertical={this.props.textAlignVertical?"top":"center"}
         multiline={this.props.multiline}
         numberOfLines={this.props.numberOfLines}
		     ref={(r) => { this._textInput = r; }}
         autoCapitalize={"none"}
         value={(this.props.value==null|| this.props.value==undefined)?'':this.props.value}
         secureTextEntry={this.props.secureTextEntry}
         onSelectionChange={this.props.onSelectionChange}
         selection={this.props.selection}
         selectionColor={this.props.selectionColor}/>
    );
  }

}
