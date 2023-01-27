/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/user/auth/auth.slice';
import { authErrorSelector } from '../../store/slices/user/auth/auth.selectors';
import GoogleButton from 'react-google-button';

interface SignInData {
  email?: string | undefined;
  password?: string | undefined;
}

export const SignIn: FC = () => {
  const dispatch = useDispatch();
  const initialState = {
    email: '',
    password: '',
  };

  const [signInData, setSignInData] = useState<SignInData>(initialState);

  const authError = useSelector(authErrorSelector)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(login({ ...signInData, logInType: 'email' }));
      if(authError) return
      setSignInData(initialState);
    
    } catch (error) {
      console.error('unable to athenticate user', error);
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    console.log(event)
    
    await setSignInData({...signInData, [name]: value});
    console.log(signInData)
  }

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign In with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={signInData?.email}
          handleChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={signInData?.password}
          handleChange={handleChange}
          required
        />
         <div>
          <strong className='error-message'>{authError?.message}</strong>
        </div>
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <GoogleButton onClick={() => dispatch(login({logInType: 'google'}))}/>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
