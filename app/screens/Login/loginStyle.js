import { Right } from "native-base";

const React = require("react-native");
import Theme from '../../Theme';

const { StyleSheet } = React;

export default {

  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "900",
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
    color: 'white'
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,

  },
  
  viewSignUp: {
    alignItems: 'flex-end',
    flex: 1
  },

  textSignUp: {
    textAlign: 'right',
    marginRight: 30,
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
    padding: 5
  },

  loginButton: {
    backgroundColor: Theme.Colors.appPrimary,
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  messageError: {
    marginLeft: 15,
    color: 'red'
  }


};