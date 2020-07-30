const validateEmail = email => {
    if (email == '')
        return 'Email là bắt buộc';
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    let check = re.test(email);
    if (!check) {
        return 'Sai định dạng email';
    }
    return '';
};


const validateEmailOrUserName =(nameLogin) =>{
    if (nameLogin == '') {
        return 'Username/Email là bắt buộc';
    }
    if (nameLogin.length < 3) {
        return 'Username/Email quá ngắn';
    }
    return '';
}



const validateUserName = (username) => {
    if (username == '') {
        return 'Username là bắt buộc';
    }
    if (username.length < 3) {
        return 'Username quá ngắn';
    }
    var re = /^([\\w\\s!\"#$%&'^_`{|}~:;@*+,.()?<>=\\-\\/\\[\\\\\\]]){8,100}$/;
    if( !re.test(username)){
        return "Username không được chứa ký tự đặc biệt, khoảng trắng";
    }
    return '';
}

const validatePassword = (password) => {
    if (password == '') {
        return 'Mật khẩu là bắt buộc';
    }

    if (password.length < 6) {
        return 'Mật khẩu phải >= 6 ký tự';
    }

    return '';
}

const validatePasswordComfirm = (password, passwordComfirm) => {
    if (password != passwordComfirm)
        return 'Mật khẩu không trùng khớp!'

    return '';
}

export {
    validateEmail,
    validatePassword,
    validateUserName,
    validatePasswordComfirm,
    validateEmailOrUserName
}