import Theme from "../../Theme";

const React = require("react-native");

const { StyleSheet } = React;

export default styles = StyleSheet.create({

  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "900",
    marginTop: 100,
    marginBottom: 30,
    textAlign: 'center',
    color: Theme.Colors.textColor
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
  registerButton: {
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
  titleInput: {
    marginLeft: 15,
    color: Theme.Colors.textColor,
    fontWeight: "bold",
    fontSize: 16
  },
  messageError: {
    marginLeft: 15,
    color: 'red'
  },
  formInput:{
    marginBottom: 10
  }
});