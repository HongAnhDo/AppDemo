import React, { Component } from 'react';
import styles from "./loginStyle";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import Wallpaper from '../../components/Wallpaper';
import { connect } from 'react-redux';
import { actionLogin, loginSuccess, loginFailure } from '../../redux/actions/loginAction';
import Loader from '../../components/Loader';
import { handleLogin } from '../../requests'
import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    async handleLoginAction(event) {
        Keyboard.dismiss();
        this.props.actionLogin();
        console.log(`handleLoginAction: ${JSON.stringify(this.state)}`);
        try {
            let data = await handleLogin(this.state.username, this.state.password);

            await AsyncStorage.setItem("accessToken", data.accessToken);
            this.props.loginSuccess({ accessToken: data.accessToken });
        } catch (err) {
            this.props.loginFailure();
        }


    }

    handleUsername(text, e) {
        this.setState({
            username: text,
        });
    }

    handlePassword(text, e) {
        this.setState({
            password: text,
        });
    }

    render() {

        return (

            <Wallpaper>
                <Loader
                    loading={this.props.login.isLoading} />
                <KeyboardAvoidingView style={styles.containerView} behavior="padding">

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.loginScreenContainer}>
                            <View style={styles.loginFormView}>
                                <Text style={styles.logoText}>App Demo</Text>
                                <TextInput placeholder="Username"
                                    placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                                    onChangeText={this.handleUsername.bind(this)}
                                    value={this.state.username} />
                                <TextInput placeholder="Password"
                                    placeholderColor="#c4c3cb"
                                    style={styles.loginFormTextInput}
                                    secureTextEntry={true}
                                    onChangeText={this.handlePassword.bind(this)}
                                    value={this.state.password}
                                />

                                <Button
                                    buttonStyle={styles.loginButton}
                                    onPress={this.handleLoginAction.bind(this)}
                                    title="Đăng nhập"
                                />

                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Wallpaper>
        );
    }
}

export default connect(
    state => ({
        login: state.loginReducer
    }),
    { actionLogin, loginSuccess, loginFailure }
)(LoginScreen)