import {action, observable, observe, computed} from 'mobx';
import {api} from '../helper/index';
import Constants from "../constants";

class store {

    @observable tokenLogin: object;
    @observable hasToken : boolean;
    @observable hasNoAccess : boolean;
    @observable hasNoAccessMsg : string;
    @observable product : object;
    @observable myorder : object;
    @observable currentroute : string;
    @observable currentIndex: number;

    constructor() {
        this.tokenLogin = {
          access_token: "",
          token_type: "",
          expires_in: "",
          resource: "",
          refresh_token: "",
          refresh_token_expires_in: "",
          scope: "",
          id_token: ""
        };
        this.hasToken = false;
        this.hasNoAccess = false;
        this.hasNoAccessMsg = "You currently have no access to Envision Mobile, please contact your company management to request access";
        this.product = {
           next_page: 0,
           active:'item_num',
           activeTxt:'Item Number',
           activeNumber:"",
           @observable data: []
        }
        this.myorder = {
           next_page: 0,
           active:'order_num',
           activeTxt:'Order Number',
           activeNumber:"",
           @observable data: []
        }
        this.orderItems={
          next_page: 0,
          @observable data: []
        }
        this.currentroute = "product";
        this.currentIndex = 0;
    }
    @action updateRouteData = (route, data,active,activeTxtde,activeNumber) => {
      //console.log("route "+route+" data "+data.data+" active "+active+" activeTxtde "+activeTxtde+" activeNumber "+activeNumber);
        this[route] = {
            data: data.data.length?data.data:[],
            active:active,
            activeTxt:activeTxtde,
            activeNumber:activeNumber,
            next_page: data.next_page
        };
        //console.log("store. "+JSON.stringify(this[route].data))
    };
    @action updateItemsData = (route, data, next_page) => {
      console.log("route "+route+" data "+data.orderitems+" next_page "+next_page);
        this[route] = {
            data: data.orderitems.length?data.orderitems:[],
            next_page: next_page
        };
        console.log("store. "+(this[route].data.length))
    };
    @action updateUser = (user) => {
      this.tokenLogin = user;
    };
    getRouteData = (route) => {
        return this[route];
    };
}

export default new store();
