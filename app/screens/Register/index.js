import React, { Component } from 'react';
import {
    Keyboard,
    Text,
    View,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native';
import {
    actionLogin,
    loginSuccess,
    loginFailure
} from '../../redux/actions/loginAction';
import { Button } from 'react-native-elements';
import Wallpaper from '../../components/Wallpaper';
import { connect } from 'react-redux';
import styles from "./registerStyle";
import Loader from '../../components/Loader';
import { handleRegister } from '../../requests';
import {
    validatePassword, validateUserName,
    validateEmail, validatePasswordComfirm
} from '../../utils/HandleUtils';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            comfirmPassword: '',
            email: '',
            userNameError: '',
            passwordError: '',
            emailError: '',
            comfirmPasswordError: '',
            isLoading: false
        };
    }

    async handleRegisterAction(event) {
        Keyboard.dismiss();

        let { username, password, email, comfirmPassword,
            passwordError, userNameError,
            comfirmPasswordError, emailError } = this.state;

        passwordError = validatePassword(password);
        userNameError = validateUserName(username);
        emailError = validateEmail(email);
        comfirmPasswordError = validatePasswordComfirm(password, comfirmPassword);

        if (passwordError != '' || userNameError != '' || emailError != '' || comfirmPasswordError != '') {
            this.setState({ passwordError, userNameError, emailError, comfirmPasswordError });
            return;
        }

        try {
            this.setState({ isLoading: true });
            await handleRegister(username, email, password);
            this.setState({ isLoading: false });

            this.props.navigation.navigate('Login', {
                username: username,
                password: password
            });
        } catch (err) {
            this.setState({ isLoading: false });
            Alert.alert(
                'Lỗi!',
                err.message,
                [
                    { text: 'OK', onPress: () => console.log('Yes button clicked') },
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
            userNameError: validateUserName(text)
        });
    }

    handleEmail(text, e) {
        this.setState({
            email: text,
            emailError: validateEmail(text)
        });
    }

    handlePassword(text, e) {
        this.setState({
            password: text,
            passwordError: validatePassword(text)
        });
    }
    handlePasswordComfirm(text, e) {
        const { password } = this.state;
        this.setState({
            comfirmPassword: text,
            comfirmPasswordError: validatePasswordComfirm(password, text)
        });
    }


    render() {

        const { comfirmPasswordError, passwordError, userNameError, emailError } = this.state;
        return (
            <Wallpaper>
                <Loader loading={this.state.isLoading} />
                <KeyboardAvoidingView
                    style={styles.containerView}
                    behavior="padding">

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.loginScreenContainer}>
                            <View style={styles.loginFormView}>
                                <Text style={styles.logoText}>App Demo</Text>
                                <View style={styles.formInput}>
                                    <Text style={styles.titleInput}>Username (*)</Text>
                                    <TextInput placeholder="Nhập username"
                                        placeholderColor="#c4c3cb"
                                        style={styles.loginFormTextInput}
                                        onChangeText={this.handleUsername.bind(this)}
                                        value={this.state.username} />
                                    {userNameError != '' ? <Text style={styles.messageError}>{userNameError}</Text> : null}

                                </View>

                                <View style={styles.formInput}>
                                    <Text style={styles.titleInput}>Email (*)</Text>
                                    <TextInput placeholder="Nhập email"
                                        placeholderColor="#c4c3cb"
                                        style={styles.loginFormTextInput}
                                        onChangeText={this.handleEmail.bind(this)}
                                        value={this.state.email} />
                                    {emailError != '' ? <Text style={styles.messageError}>{emailError}</Text> : null}

                                </View>

                                <View style={styles.formInput}>
                                    <Text style={styles.titleInput}>Nhập mật khẩu (*)</Text>
                                    <TextInput placeholder="Password"
                                        placeholderColor="#c4c3cb"
                                        style={styles.loginFormTextInput}
                                        secureTextEntry={true}
                                        onChangeText={this.handlePassword.bind(this)}
                                        value={this.state.password}
                                    />
                                    {passwordError != '' ? <Text style={styles.messageError}>{passwordError}</Text> : null}

                                </View>
                                <View style={styles.formInput}>
                                    <Text style={styles.titleInput}>Xác nhận mật khẩu (*)</Text>
                                    <TextInput placeholder="Password comfirm"
                                        placeholderColor="#c4c3cb"
                                        style={styles.loginFormTextInput}
                                        secureTextEntry={true}
                                        onChangeText={this.handlePasswordComfirm.bind(this)}
                                        value={this.state.comfirmPassword}
                                    />
                                    {comfirmPasswordError != '' ? <Text style={styles.messageError}>{comfirmPasswordError}</Text> : null}

                                </View>

                                <Button
                                    buttonStyle={styles.registerButton}
                                    onPress={this.handleRegisterAction.bind(this)}
                                    title="ĐĂNG KÝ"
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
)(RegisterScreen)