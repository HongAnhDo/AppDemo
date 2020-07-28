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
            console.log(payload.accessToken);
            return {
                ...state,
                accessToken: payload.accessToken,
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
            return {
                ...state,
                isLoading: false,
                accessToken: payload.accessToken

            }
        case 'LOGOUT':
            return {
                ...state,
                isLoading: false,
                accessToken: ''
            }
        default:
            return state;
    }
};
export default loginReducer;