import React, { Component } from 'react';
import {Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/loginAction';
class HomeScreen extends Component {
    handleLoginAction(event) {
        console.log("hong anh do");
    
        this.props.logout();

    }

    async componentDidMount(){
        console.log("========================= call lisst");
    }

    render() {
        return (
            <Button onPress={this.handleLoginAction.bind(this)} title="Test"> Test</Button>
        );
    }
}

export default connect(null, {
    logout
})(HomeScreen);