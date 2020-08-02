import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Image, View, StyleSheet, Platform} from 'react-native';
import logoImage from '../../assets/images/logo.png';
import AsyncStorage from '@react-native-community/async-storage';
import {logout} from '../../redux/actions/loginAction';
import {connect} from 'react-redux';
import Theme from '../../Theme';
import Icon from 'react-native-vector-icons/FontAwesome';

class CustomDrawer extends React.Component {
  async _handleLogout() {
    await AsyncStorage.removeItem('accessToken');

    this.props.logout();
  }

  render() {
    return (
      <DrawerContentScrollView
        {...this.props}
        renderHeader={() => null}
        style={{margin: 0, paddingTop: 0, borderWidth: 0}}>
        <View style={styles.viewLogo}>
          <Image source={logoImage} style={styles.logo} />
        </View>

        <View style={styles.drawerBody}>
          <DrawerItemList {...this.props} />
          <DrawerItem
            label="Đăng xuất"
            activeTintColor="blue"
            inactiveTintColor="#000"
            inactiveBackgroundColor="transparent"
            itemStyle={styles.itemStyle}
            labelStyle={styles.lableStyle}
            onPress={this._handleLogout.bind(this)}
            icon={({focused, size}) => (
              <Icon
                name="sign-out"
                size={size}
                color={focused ? Theme.Colors.appLight : '#ccc'}
              />
            )}
          />
        </View>
      </DrawerContentScrollView>
    );
  }
}

const styles = StyleSheet.create({
  lableStyle: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  itemStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden',
  },
  viewLogo: {
    height: Platform.OS == 'android' ? 200 : 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS == 'android' ? -4 : 0,
  },
  logo: {
    width: 80,
    height: 80,
  },
  drawerContent: {
    paddingTop: 0,
    margin: 0,
    borderWidth: 0,
  },
  drawerBody: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default connect(
  null,
  {logout},
)(CustomDrawer);
