export const actionLogin = payload => ({
    type: 'HANDLE_LOGIN',
    payload,
  });
  
  export const loginSuccess = payload => ({
    type: 'LOGIN_SUCCESS',
    payload,
  });
  
  export const loginFailure = payload => ({
    type: 'LOGIN_FAILURE',
    payload,
  });

  export const logout = payload => ({
    type: 'LOGOUT',
    payload,
  });

  export const restoreToken = payload => ({
    type: 'RESTORE_TOKEN',
    payload,
  });
  
  export default {
    actionLogin,
    loginSuccess,
    loginFailure,
    restoreToken
  };