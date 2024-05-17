import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,ScrollView,
    Dimensions, TouchableOpacity,Alert,TouchableWithoutFeedback
} from 'react-native';
import Icon from "../icon";
import { SinglePickerMaterialDialog } from '../../community/react-native-material-dialog';
import stylecust from '../helper/resfont';
import { globalImages,globalColors } from '../../helper';

function FilterItem(props) {

    let vlaue = (props.active===props.value)?true:false;
    //console.log("props.active "+vlaue+" "+props.active);
    return (
      <View style={{flex:1}}>
      <TouchableOpacity onPress={()=>props.onPress(props.value)}>
        <View style={vlaue && {backgroundColor: globalColors.titleBC}}>
            <Text style={styles.filterText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
      </View>
    )
}

export default class FilterMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterWidth: Dimensions.get('window').width,
            showFilters: false,
            scrolledSinglePickerVisible: false,
            scrolledSinglePickerSelectedItem: undefined,
            dataofdrop:roleDropDown
        }
        //console.log(" Fiklter "+JSON.stringify(props));
      //  this.openFilter = this.openFilter.bind(this);
    }
    getInitialState() {
        //console.log(" Fiklter instioa; ");
        return {
          scrolledSinglePickerVisible: false,
          scrolledSinglePickerSelectedItem: undefined,
        }
      }
      componentWillReceiveProps(props){
        //console.log(" Fiklter componentWillMount; "+JSON.stringify(this.props));
        if(this.props.active != props.active){
        if(this.props.identify){
            //console.log(" Fiklter componentWillMount; iondisde if");
          this.setState({
            dataofdrop:groupDropdown
          },()=>{
            //console.log(" Fiklter componentWillMount; iondisde if if"+this.props.active);
            if(this.props.active){
              let indxRole = this.findInd(this.props.active,this.state.dataofdrop);
              scrolledSinglePickerSelectedItem={value:indxRole,label:this.props.activeTxt};
              this.setState({scrolledSinglePickerSelectedItem:scrolledSinglePickerSelectedItem})
            }
          })
        }else{
          //console.log(" Fiklter componentWillMount; iondisde else");
          this.setState({
            dataofdrop:roleDropDown
          },()=>{
            //console.log(" Fiklter componentWillMount; iondisde rlede "+this.props.active);
            if(this.props.active){
              let indxRole = this.findInd(this.props.active,this.state.dataofdrop);
              scrolledSinglePickerSelectedItem={value:indxRole,label:this.props.activeTxt};
              this.setState({scrolledSinglePickerSelectedItem:scrolledSinglePickerSelectedItem})
            }
          })
        }
      }
      }
      componentWillMount(){

        //console.log(" Fiklter componentWillMount; "+JSON.stringify(this.props));
        if(this.props.identify){
          //  console.log(" Fiklter componentWillMount; iondisde if");
          this.setState({
            dataofdrop:groupDropdown
          },()=>{
            //console.log(" Fiklter componentWillMount; iondisde if if"+this.props.active);
            if(this.props.active){
              let indxRole = this.findInd(this.props.active,this.state.dataofdrop);
              scrolledSinglePickerSelectedItem={value:indxRole,label:this.props.activeTxt};
              this.setState({scrolledSinglePickerSelectedItem:scrolledSinglePickerSelectedItem})
            }
          })
        }else{
        //  console.log(" Fiklter componentWillMount; iondisde else");
          this.setState({
            dataofdrop:roleDropDown
          },()=>{
            //console.log(" Fiklter componentWillMount; iondisde rlede "+this.props.active);
            if(this.props.active){
              let indxRole = this.findInd(this.props.active,this.state.dataofdrop);
              scrolledSinglePickerSelectedItem={value:indxRole,label:this.props.activeTxt};
              this.setState({scrolledSinglePickerSelectedItem:scrolledSinglePickerSelectedItem})
            }
          })
        }


      }
      findInd=(value,arryInd)=>{
        //console.log(" Fiklter componentWillMount; iondisde find tcnd");
        for(let i=0;i<arryInd.length;i++){
            if(arryInd[i].value==value){
              //console.log(" Fiklter componentWillMount; iondisde find iond "+i);
              return i;
            }
        }
      }
   openFilterNew = () => {
     //console.log(" Fiklter componentWillMount; openFilterNew if");
     //Alert.alert("hai ",this.state.scrolledSinglePickerSelectedItem);
      if(this.state.scrolledSinglePickerSelectedItem){
        var inx = this.state.scrolledSinglePickerSelectedItem.value;
      //  Alert.alert("hai "+(this.state.dataofdrop[inx].value+" c "+this.state.dataofdrop[inx].label));
        this.props.openFilter(this.state.dataofdrop[inx].value,this.state.dataofdrop[inx].label)
      }else{
        if(this.props.identify){
          this.props.openFilter("customer_po","Customer PO");
        }else{
          this.props.openFilter("item_num","Item Number");
        }
      }

  }

    render() {
      //console.log(" Fiklter componentWillMount; openFilterNew if render ");
        return (
            <View style={{}}>
            <TouchableWithoutFeedback onPress={() =>{this.setState({ scrolledSinglePickerVisible: true })}}>
                  <View style={styles.borderStyle}>
                     <View style={{flex:0.85,marginLeft:5,paddingTop:5,justifyContent:'center',alignItems:'flex-start'}}>
                        <Text style={{color:globalColors.txtClr,marginRight:5,fontFamily: 'Roboto-Regular', fontSize:stylecust.em(1.1)}}>
                            {this.props.activeTxt}
                        </Text>
                      </View>
                      <View style={{ flex:0.15,marginRight:5 ,paddingTop:15,justifyContent:'flex-end',alignItems:'flex-end'}}>
                         <Icon icon={globalImages.icons.theme.GDownarrow} size={16} />
                     </View>
                 </View>
            </TouchableWithoutFeedback>

            <SinglePickerMaterialDialog
                title={"Select Filter"}
                scrolled
                items={this.state.dataofdrop.map((data, index) => ({ value: index, label: data.label }))}
                visible={this.state.scrolledSinglePickerVisible}
                selectedItem={this.state.scrolledSinglePickerSelectedItem}
                onCancel={() => this.setState({ scrolledSinglePickerVisible: false })}
                onOk={(result) => {
                  this.setState({ scrolledSinglePickerVisible: false,  scrolledSinglePickerSelectedItem: result.selectedItem },()=>{this.openFilterNew();});
               }}
            />
          </View>
        )
    }


}

const roleDropDown =[{label:"Item Number",value:"item_num"},
{label:"Item Description",value:"item_desc"},
{label:"Item Number Display",value:"item_num_display"},
{label:"Licensor",value:"licensor"},
{label:"Product Line",value:"product_line"},
{label:"Retailer Commodity",value:"retailer_commodity"},
{label:"Sub Class",value:"sub_class"},
{label:"Sub commodity",value:"sub_commodity"}];

const groupDropdown =[{label:"Customer PO",value:"customer_po"},
{label:"Order Number",value:"order_num"},
{label:"Customer",value:"customer"}];


const styles = StyleSheet.create({
    selectedFilter: {
        paddingLeft: 20,
        fontSize: 13,
        fontFamily: 'Roboto-Regular',
    },borderStyle:{
      flex:1,flexDirection:'row',backgroundColor: globalColors.contentSearchBck,
       padding: stylecust.em(0.6),
       borderBottomWidth: 1, borderColor: globalColors.unSelectedClr, justifyContent:'center',alignItems:'center'
    },
    filterMenu: {
        marginTop: 50,
        position:'absolute',
        right: 10,
        width: 300,
        backgroundColor: globalColors.backPageColor,
        elevation: 10,
        zIndex: 10,
        paddingTop: 3,
        paddingBottom: 3,
    },
    filter: {
        height: 50,
        marginBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: globalColors.backPageColor,
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'visible'

    },
    container: {
        flex: 1,
        marginTop: 5
    },
    filterText: {
        fontSize: stylecust.em(1.2),
        fontFamily: 'Roboto-Regular',
        padding: 9,
        color:globalColors.contentColor
    }
});
