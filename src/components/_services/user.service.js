import { authHeader } from '../_helpers';
import * as Constant from '../_helpers/constant';

export const userService = {
    login,
    logout
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(Constant.API_LIVE + "/signin", requestOptions)
        .then(res => res.json()).then((response)=>{
            localStorage.setItem('token',response.token.accessToken);
            localStorage.setItem('user',JSON.stringify(response.userCompany));
    })
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('image');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}