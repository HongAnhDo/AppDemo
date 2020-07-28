const initData = {
    refreshToken: '',
    accessToken: '',
    isLoading: false,
    error: '',
};

const loginReducer = (state = initData, { type, payload }) => {
    switch (type) {
        case 'HANDLE_LOGIN':
            return {
                ...state,
                isLoading: true,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                accessToken: payload.access_token,
                isLoading: false,
                error: '',
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: 'Login fail',
            };
        case 'RESTORE_TOKEN':
            console.log(type);
            console.log(payload);
            console.log("______________________")
            return {
                ...state,
                isLoading: false,
                accessToken: payload.access_token

            }
        case 'LOGOUT':
            return {
                ...state,
                isLoading: false,
                accessToken: null
            }
        default:
            return state;
    }
};
export default loginReducer;