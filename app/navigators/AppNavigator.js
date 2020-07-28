
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../screens/Login'
import Home from '../screens/Home'
import { useSelector } from 'react-redux';
import { useWindowDimensions, Dimensions } from 'react-native';

const { width } = Dimensions.get("screen");

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();


function LoginStack() {
  return (
    <RootStack.Navigator initialRouteName="Login">
      <RootStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}

function MainStackScreen() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      // drawerContent={props => (
      //   <CustomDrawerContent {...props} profile={profile} />
      // )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "#000",
        // activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          // paddingVertical: 4,
          justifyContent: "center",
          alignContent: "center",
          // alignItems: 'center',
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />

    </Drawer.Navigator>
  )
}

const Route = () => {
  const accessToken = useSelector((state) =>
    state.loginReducer.accessToken
  );
  return (
    <NavigationContainer>
      {(accessToken == null || accessToken == undefined || accessToken == '') ?

        <LoginStack /> :
        <MainStackScreen />
      }
    </NavigationContainer>
  );
};

export default Route;