import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Image, Platform } from 'react-native';
import { globalColors ,globalImages } from '../../../helper';
import PropTypes from 'prop-types';
import stylecust from '../../helper/resfont';

export default class Checkbox extends Component
{
  constructor(props)
  {
     super(props);
     //alert("Props "+JSON.stringify(props))
     this.state = { checked: null }
  }

  componentWillMount()
  {
     if(this.props.checked)
     {
       this.setState({ checked: true }, () =>
       {
         this.props.selectedArrayObject.setItem({ 'key': this.props.keyValue, 'label': this.props.label });
          this.props.onPress(true);
       });
     }
     else
     {
       this.setState({ checked: false });
        this.props.onPress(false);
     }
  }
  toggleState(key, label)
  {
     this.setState({ checked: !this.state.checked }, () =>
     {
        if(this.state.checked)
        {
           this.props.selectedArrayObject.setItem({ 'key': key, 'label': label });
           this.props.onPress(true);
        }
        else
        {
           this.props.onPress(false);
           this.props.selectedArrayObject.getArray().splice( this.props.selectedArrayObject.getArray().findIndex(x => x.key == key), 1 );
        }
     });
  }

  render()
  {
     return(
       <TouchableHighlight onPress = { this.toggleState.bind(this, this.props.keyValue, this.props.label) } underlayColor = "transparent" style = { styles.checkBoxButton }>
          <View style = { styles.checkBoxHolder }>
             <View style = {{ width: this.props.size, height: this.props.size, backgroundColor: !this.state.checked?globalColors.txtLineClrOnnotFocus:globalColors.txtLineClr, padding: 3 }}>
             {
                (this.state.checked)
                ?
                   (<View style = { styles.checkedView }>
                      <Image source = {globalImages.checkbox.check} style = { styles.checkedImage }/>
                   </View>)
                :
                   (<View style = { styles.uncheckedView }/>)
             }
             </View>
             <Text style = {[ styles.checkBoxLabel, { color:!this.state.checked?globalColors.textLoginColor:globalColors.txtLineClr}]}>{ this.props.label }</Text>
          </View>
       </TouchableHighlight>
     );
  }
}


const styles = StyleSheet.create(
{
  container:
  {
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  selectedArrayItemsBtn:
  {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch'
  },

  btnText:
  {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'stretch',
    fontSize: 18
  },

  checkBoxButton:
  {
    marginVertical: 10
  },

  checkBoxHolder:
  {
    flexDirection: 'row',
    alignItems: 'center'
  },

  checkedView:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  checkedImage:
  {
    height: '80%',
    width: '80%',
    tintColor: 'white',
    resizeMode: 'contain'
  },

  uncheckedView:
  {
    flex: 1,
    backgroundColor: 'white'
  },

  checkBoxLabel:
  {
    fontSize: stylecust.em(1.1),
    fontFamily:"Roboto-Regular",
    color:globalColors.textLoginColor,
    paddingLeft: 10
  }
});

Checkbox.propTypes =
{
  size: PropTypes.number,
  keyValue: PropTypes.number.isRequired,
  selectedArrayObject: PropTypes.object.isRequired,
  color: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool
}

Checkbox.defaultProps =
{
  size: 30,
  color: '#636c72',
  label: 'Default',
  checked: false
}
