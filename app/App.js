import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Router from './navigators/AppNavigator'
import AsyncStorage from '@react-native-community/async-storage';
import { handleMe, setClientToken } from './requests'
import { StatusBar } from 'react-native';
import Theme from './Theme'
export default function App(props) {

  const bootstrapAsync = async () => {
    let userToken;
    try {

      userToken = await AsyncStorage.getItem('accessToken');
      if (userToken != undefined && userToken != null && userToken != '') {
        try {
          console.log("Token is already :" + userToken);
          await handleMe(userToken);
          // setClientToken(userToken);
          store.dispatch({
            type: 'RESTORE_TOKEN',
            payload: { "accessToken": userToken }
          });
        } catch (err) {
          console.log("Token is invalid", err);
          store.dispatch({
            type: 'STOP_LOADING',
            payload: {}
          });
          await AsyncStorage.removeItem('accessToken');
        }

      } else {
        store.dispatch({
          type: 'STOP_LOADING',
          payload: {}
        });
      }
    } catch (e) {
    }
  };



  useEffect(() => {
    bootstrapAsync();
  });

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={Theme.Colors.appDark}
        barStyle="light-content" />
      <Router />
    </Provider>
  );

}