'use strict';
import React from 'react';
import {AsyncStorage} from 'react-native';


  function getKey(key) {
    //console.log('inisde'+key);
    return AsyncStorage.getItem(key);
  }

  function saveKey(key, value) {
      //console.log(value+' save1 '+JSON.stringify(value));
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  function updateKey(key, value) {
    return deviceStorage.get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }

  function deleteKey(key) {
    return AsyncStorage.removeItem(key);
  }
  function clearAllKey(){
    return AsyncStorage.clear();
  }


export {
  deleteKey,
  clearAllKey,
  updateKey,
  saveKey,
  getKey
};
