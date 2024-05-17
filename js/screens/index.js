import { Navigation } from 'react-native-navigation';
import LoginPage from '../component/login';
import Router from '../App';


export function registerScreens() {
    Navigation.registerComponent('Envision.router', () => Router);
    Navigation.registerComponent('Envision.login', () => LoginPage);
}
