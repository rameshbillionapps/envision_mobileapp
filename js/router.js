/**
 * https://stackoverflow.com/questions/33553112/react-native-asyncstorage-fetches-data-after-rendering
 */

import React, {Component} from 'react';
import {BackHandler,Alert} from 'react-native';
import LoginPage from './component/login';
import {Router, Stack, Scene, Tabs, tabBar, Actions, Drawer, ActionConst, Reducer} from 'react-native-router-flux';
import DrawerContent from './component/drawer';
import Home from './views/home';
import ProductDetails from './component/home/product/details';
import OrderDetails from './component/home/order/details';
import NoAccess from './views/noAccess';
import { globalImages } from './helper';
import TabIcon from './component/tabicon';
import stylecust from './component/helper/resfont';

const tabStyle = {
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8
};
const labelStyle = {
    fontFamily: 'Roboto-Regular',
    fontSize: stylecust.em(1),
};


TabBarOnPress = (targetTab) => {
     //console.log(JSON.stringify(targetTab));
    let routes = targetTab;
    //let key = targetTab.route.routeName;

};

var backhardware = false;
export default class NavRouter extends Component<{}> {
  constructor(props){
      super(props);
      this.handleBackButton = this.handleBackButton.bind(this);
  }
  handleBackButton = () => {
  //  alert('backhadn');
    if(this.backhardware){
      Alert.alert(
        'Exit',
        'Exiting the application?',
        [
          {text: 'Cancel', onPress: () => {console.log('Cancel Pressed'); this.backhardware=false;return true;}, style: 'cancel'},
          {text: 'OK', onPress: () =>{ console.log('OK Pressed'); BackHandler.exitApp(); this.backhardware=false;return false;}},
          ],
        { cancelable: false }
    );
    return true;
   }else{

      this.backhardware = true;

    return true;
   }
  }
   componentDidMount(){
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
   }
   componentWillUnmount() {
     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }
    render() {
        return (
            <Router>
                <Stack key="root" headerMode={'none'}>
                    <Stack type="reset" key="login" initial={!this.props.hasToken}>
                        <Scene
                            component={LoginPage}
                            key='LoginPage'
                            title='Login'
                            type="replace"
                        />
                    </Stack>
                    <Drawer
                          key="app"
                    			drawerOpenRoute='DrawerOpen'
                    			drawerCloseRoute= 'DrawerClose'
                    			drawerToggleRoute='DrawerToggle'
                          initial={this.props.hasToken}
                          contentComponent={DrawerContent}
                          type="reset"
                          drawerLockMode='locked-closed'
                          gesturesEnabled={false}
                          drawerWidth={250}>


                          <Scene key="homemenu">
                            <Scene initial={!this.props.hasNoAccess} key="home"  component={Home}
                                   title="Home" {...this.props} />
                            <Scene initial={this.props.hasNoAccess} key="NoAccess"  component={NoAccess}
                                           title="Search" {...this.props} />
                            <Scene key="menu" tabBarLabel={'Menu'} drawerLockMode='locked-closed'
                                  iconName={'menuicon.png'} icon={TabIcon} component={DrawerContent}
                                  title="Menu"/>
                              <Scene key="ProductDetailsView"  component={ProductDetails}
                                              title="product" />
                              <Scene key="OrderDetailsView"  component={OrderDetails}
                                              title="Order" />
                           </Scene>

                    </Drawer>
                </Stack>
            </Router>
        );
    }
}
