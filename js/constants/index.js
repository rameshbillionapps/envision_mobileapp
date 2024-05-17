import {Dimensions} from 'react-native';

//gsbahub.eboardsolutions.com  --> live
//eboardsolutions.com/gsbahub   --> local
//gsbahub.eboardsolutions.com/stagegsbahub -->stage
export default {
    margin: 15,
    width: Dimensions.get('window').width,
    url: {
        'base':'https://cfauth01.coreforce.com/',
        'product':'auth/product_list',
        'orders':'auth/orders',
        'orderItems':'auth/order_items',
        'login':'auth/'
    }
}
