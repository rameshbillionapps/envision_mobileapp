import {Navigation} from 'react-native-navigation';
import App from './js/App';
import {registerScreens} from './js/screens';

registerScreens();


Navigation.startSingleScreenApp({
    screen: {
        screen: 'Envision.router',
        title: 'Envision',
        navigatorStyle: {
            navBarHidden: true
        }
    },
    animationType: 'fade', // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
    appStyle: {
        orientation: 'portrait',
    }
});
