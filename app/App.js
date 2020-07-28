import React, { Component, useEffect } from 'react';
import { Provider } from 'react-redux';
import redux from './configs/redux';
import Router from './navigators/AppNavigator'
import AsyncStorage from '@react-native-community/async-storage'

export default function App(props) {

  const bootstrapAsync = async () => {
    // let userToken = { "access_token": "test" };
    let userToken;
    try {
      // AsyncStorage.removeItem('accessToken');
      userToken = await AsyncStorage.getItem('accessToken');
      if (userToken != undefined)
        redux.store.dispatch({ type: 'RESTORE_TOKEN', payload: {"access_token": userToken} });

    } catch (e) {
      //no message
    }

    // console.log("Hong anh do");
    // userToken = { "access_token": "test" };
    console.log(userToken);
  };



  useEffect(() => {
    bootstrapAsync();
  });

  return (
    <Provider store={redux.store}>
      <Router />
    </Provider>
  );

}