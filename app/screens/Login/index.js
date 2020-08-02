import React, { Component } from 'react';
import {
    Keyboard,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import {
    actionLogin,
    loginSuccess,
    loginFailure
} from '../../redux/actions/loginAction';
import { Button } from 'react-native-elements';
import Wallpaper from '../../components/Wallpaper';
import { connect } from 'react-redux';
import styles from "./loginStyle";
import Loader from '../../components/Loader';
import { handleLogin } from '../../requests'
import AsyncStorage from '@react-native-community/async-storage';
import { validatePassword, validateEmailOrUserName, validateUserName } from '../../utils/HandleUtils'

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            userNameError: '',
            passwordError: '',
            isLoading: true,
            init: true
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let params = nextProps.route.params;
        if (params != null && params != undefined && prevState.username == '' && prevState.passwordError == ''
            && prevState.init == true) {
            return {
                username: params.username,
                password: params.password
            }
        }
        return null;
    }

    async handleLoginAction(event) {

        Keyboard.dismiss();
        let { username, password, passwordError, userNameError } = this.state;

        passwordError = validatePassword(password);
        userNameError = validateEmailOrUserName(username);

        if (passwordError != '' || userNameError != '') {
            this.setState({ passwordError, userNameError });
            return;
        }

        this.props.actionLogin();
        try {
            let data = await handleLogin(username, password);
            await AsyncStorage.setItem("accessToken", data.accessToken);
            this.props.loginSuccess({ accessToken: data.accessToken });
            this.props.navigation.navigate('Main');
        } catch (err) {
            this.props.loginFailure();
            Alert.alert(
                'Lỗi!',
                err.message,
                [
                    { text: 'OK' },
                ],
                {
                    cancelable: true
                }
            );
        }
    }

    handleUsername(text, e) {
        this.setState({
            username: text,
            userNameError: validateEmailOrUserName(text)
        });
    }

    handlePassword(text, e) {
        this.setState({
            password: text,
            passwordError: validatePassword(text)
        });
    }

    handleRedirectRegister(event) {
        this.setState({ init: true });
        this.props.navigation.navigate("Register");
    }

    render() {
        const { passwordError, userNameError } = this.state;

        return (
            <Wallpaper>
                <Loader loading={this.props.login.isLoading} />
                <KeyboardAvoidingView
                    style={styles.containerView}
                    behavior="padding">

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.loginScreenContainer}>
                            <View style={styles.loginFormView}>
                                <Text style={styles.logoText}>App Demo</Text>
                                <TextInput placeholder="Nhập username/Email"
                                    placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                                    onChangeText={this.handleUsername.bind(this)}
                                    value={this.state.username} />
                                {userNameError != '' ? <Text style={styles.messageError}>{userNameError}</Text> : null}

                                <TextInput placeholder="Mật khẩu"
                                    placeholderColor="#c4c3cb"
                                    style={styles.loginFormTextInput}
                                    secureTextEntry={true}
                                    onChangeText={this.handlePassword.bind(this)}
                                    value={this.state.password}
                                />
                                {passwordError != '' ? <Text style={styles.messageError}>{passwordError}</Text> : null}

                                <Button
                                    buttonStyle={styles.loginButton}
                                    onPress={this.handleLoginAction.bind(this)}
                                    title="ĐĂNG NHẬP"
                                />

                                <View style={styles.viewSignUp}>
                                    <Text style={styles.textSignUp} onPress={this.handleRedirectRegister.bind(this)}>
                                        ĐĂNG KÝ
                                </Text>

                                </View>
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