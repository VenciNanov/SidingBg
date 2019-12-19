import React from "react";


export default class AuthService {
    isAuth() {
        console.log(localStorage)
        let isAuth = localStorage.getItem("isAuth");

        return isAuth !== true
    }

    login(user, token) {
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
    }

    logOut() {
        localStorage.clear();
    }
}