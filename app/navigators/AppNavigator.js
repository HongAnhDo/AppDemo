
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import CreateArticle from '../screens/CreateArticle';
import { useSelector } from 'react-redux';
import CustomDrawer from '../components/CustomNavigator';
import HeaderCustom from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../Theme';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainStackScreen() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      style={{ flex: 1 }}

      drawerContentOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "#000",
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          justifyContent: "center",
          alignContent: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 16,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home" >
      <Drawer.Screen
        name="Home"
        component={HomeScreenStack}
        options={{
          title: 'Trang chủ',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home"
              size={size}
              color={focused ? Theme.Colors.appLight : '#ccc'}
            />
          )
        }}
      />

      < Drawer.Screen
        name="CreateArticle"
        component={ArticleScreenStack}
        options={{
          title: 'Đăng bài',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="pencil"
              size={size}
              color={focused ? Theme.Colors.appLight : '#ccc'}
            />
          ),
        }} />

    </Drawer.Navigator >
  )
}

function HomeScreenStack({ navigation }) {
  return (
    <RootStack.Navigator initialRouteName="HomePage">
      <RootStack.Screen
        name="HomePage"
        component={Home}
        options={{
          header: () => <HeaderCustom navigation={navigation} title="Đăng bài" />
        }}
      />
    </RootStack.Navigator>
  );
}

function ArticleScreenStack({ navigation }) {
  return (
    <RootStack.Navigator initialRouteName="ArticlePage">
      <RootStack.Screen
        name="ArticlePage"
        component={CreateArticle}
        options={{
          header: () => <HeaderCustom navigation={navigation} title="Tạo bài viết" />
        }}
      />
    </RootStack.Navigator>
  );
}


function LoginStack() {
  return (
    <RootStack.Navigator initialRouteName="Login">
      <RootStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} />
      <RootStack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}

const Route = () => {
  const accessToken = useSelector((state) =>
    state.loginReducer.accessToken
  );
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={accessToken == '' ? 'Login' : 'Main'}>
        {
          accessToken != '' ?
            <RootStack.Screen
              component={MainStackScreen}
              name="Main"
              headerShown={false}
            /> :
            <RootStack.Screen
              component={LoginStack}
              name="Login"
            />
        }
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Route;