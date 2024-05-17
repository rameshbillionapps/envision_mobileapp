import React, { Component, PureComponent } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
// import Data from './data.json'
import envision from '../../home';
import stylecust from '../../helper/resfont';
const { width } = Dimensions.get('window');
import { globalImages, globalColors } from '../../../helper';
import store from '../../../store';

class TabHeader extends Component {
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
                <View onLayout={this.tabWidthCalculator} style={styles.tabStyle}>
                    <Text style={tabTextStyle} >{this.props.tab}</Text>
                    {
                        this.props.activeTab === this.props.index &&
                        <View style={[styles.underline, { width: this.state.tabWidth }]} />
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
            activeTab: 0,
            containerWidth: 0,
            tabBarWidth: 0,
            loading: true,
            data: []
        }
        this._isMounted = false;
    }
    gotoPage = (index) => {
        this.setState({
            activeTab: index
        }, () => {

        })
    }
    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.renderChildren(this.props.route);
    }
    componentWillUnmount(){
      this._isMounted = false;
    }
    componentWillReceiveProps(nextProps) {
        //console.log("store.productDetails "+JSON.stringify(store.productDetails));
        if (nextProps.route != this.props.route) {
            this.renderChildren(nextProps.route);
        }
    }

    renderChildren(route) {
        this.setState({
            activeTab:0
        }, async () => {
            switch (route) {
                case 'product':
                  this.setState({
                      activeTab:0
                  });
                  store.currentIndex = 0;
                    break;
                case 'myorder':
                    this.setState({
                        activeTab:1
                    });
                    store.currentIndex = 1;
                    break;
                default:
                    return null;
            }
        });
    }
    loadPagination=()=>{
      if(this.state.activeTab===1) {
        this.order.loadPagination();
      }else {
        this.product.loadPagination();
      }
    }
    renderTab = () => {
        if (this.state.activeTab===1) {
            return <envision.order {...this.props} ref={(ref) => this.order = ref} />
        }
        return (
            <envision.product {...this.props} ref={(ref) => this.product = ref} />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderTab()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    underline: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: globalColors.tabbarClr,
        height: 3,
    },
    tabStyle: {
        height: 50,
    },
    tabTextActiveStyle: {
        color: globalColors.selectedClr,
        fontFamily: 'Roboto-Regular',
        fontSize: stylecust.em(1)
    },
    tabTextInactiveStyle: {
        color: globalColors.unSelectedClr,
        fontFamily: 'Roboto-Regular',
        fontSize:stylecust.em(1)
    }
})
