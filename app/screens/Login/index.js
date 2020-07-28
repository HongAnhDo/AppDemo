import React, { Component } from 'react';
import styles from "./loginStyle";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import Wallpaper from '../../components/Wallpaper';
import { connect } from 'react-redux';
import { actionLogin } from '../../redux/actions/loginAction';
import Loader from '../../components/Loader';
import { login as callLogin } from '../../requests'

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

        console.log(`handleLoginAction: ${JSON.stringify(this.state)}`);
        await callLogin(this.state.username, this.this.state.password);
        this.props.actionLogin({
            username: this.state.username,
            password: this.state.password,
        });
    }

    handleUsername(text, e) {
        console.log(`text: ${text}`);
        this.setState({
            username: text,
        });
    }

    handlePassword(text, e) {
        console.log(`text: ${text}`);
        this.setState({
            password: text,
        });
    }

    render() {
        console.log(this.props.login.isLoading);


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
    { actionLogin }
)(LoginScreen)