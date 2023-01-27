/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, HTMLAttributes } from "react"

import './custom-button.styles.scss';

declare type IProps = {
    isGoogleSignIn?: boolean;
    children: 
        JSX.Element | 
        JSX.Element[] | 
        string |
        string[]
    [x:string]: any;
} 

const CustomButton: FC<IProps & HTMLAttributes<any>> = ({children, isGoogleSignIn, ...otherProps}) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
);

export default CustomButton;