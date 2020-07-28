import React, { Component, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Router from './navigators/AppNavigator'
import AsyncStorage from '@react-native-community/async-storage';
import { handleMe } from './requests'

export default function App(props) {

  const bootstrapAsync = async () => {
    let userToken;
    try {
      userToken = await AsyncStorage.getItem('accessToken');
      if (userToken != undefined && userToken != null && userToken != '') {
        try {
          console.log("handleMe");
          await handleMe(userToken);
          store.dispatch({ type: 'RESTORE_TOKEN', payload: { "accessToken": userToken } });
        } catch (err) {
          await AsyncStorage.removeItem('accessToken');
        }
      }
    } catch (e) {
    }


  };



  useEffect(() => {
    bootstrapAsync();
  });

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );

}