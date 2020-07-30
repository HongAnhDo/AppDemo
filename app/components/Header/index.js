import React from 'react';
import { Header } from 'react-native-elements'

export default class HeaderCustom extends React.Component {

    _openDrawer() {
        this.props.navigation.openDrawer();
    }

    _goToHome() {
        this.props.navigation.navigate("Trang chủ");
    }

    render() {
        return (
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', onPress: this._openDrawer.bind(this) }}
                centerComponent={{ text: this.props.title, style: { color: '#fff', fontWeight: 'bold', fontSize: 18 } }}
                rightComponent={{ icon: 'home', color: '#fff', onPress: this._goToHome.bind(this) }}
            />
        )
    }
}

