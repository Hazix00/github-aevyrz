import React from "react";

import './sign-in-and-up.styles.scss';

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import { useSelector } from "react-redux";
import { isUserAuthenticatedSelector } from "../../store/slices/user/auth/auth.selectors";
import { Navigate } from "react-router-dom";

const SignInAndUpPage = () => {

    const authenticated = useSelector(isUserAuthenticatedSelector)

    if(authenticated === true) {
        return <Navigate to="/" replace/>
    }

    return (
        <div className="sign-in-and-up">
        <SignIn />
        <SignUp />
        </div>
    ); 
}

export default SignInAndUpPage;