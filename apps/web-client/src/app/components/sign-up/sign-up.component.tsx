/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, createUserProfileDocument } from '../../../firebase/firebase.utils';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import styles from './sign-up.module.scss';

interface SignUpData {
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

export const SignUp:FC = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [signUpData, setSignUpData ] = useState<SignUpData>(initialState);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    console.log(event)
    
    await setSignUpData({...signUpData, [name]: value});
    console.log(signUpData)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('signUn', event)
    if(signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      const {user} = await createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)

      await createUserProfileDocument(user, {displayName:signUpData.displayName})
      setSignUpData(initialState)

    } catch (error) {
      console.error( 'Error creating user profile', error)
    }
  }

  return (
    <div className={styles['sign-up']}>
      <h2 className={styles['title']}>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className={styles['sign-up-form']} onSubmit={handleSubmit}>
        <FormInput 
          type="text" 
          name='displayName'
          label="Display Name"
          value={signUpData.displayName}
          required
          handleChange={handleChange}/>
        <FormInput 
          type="email" 
          name='email'
          label="Email"
          value={signUpData.email}
          required
          handleChange={handleChange}/>
        <FormInput 
          type="password" 
          name='password'
          label="Password"
          value={signUpData.password}
          required
          handleChange={handleChange}/>
        <FormInput 
          type="password" 
          name='confirmPassword'
          label="Confirm Password"
          value={signUpData.confirmPassword}
          required
          handleChange={handleChange}/>

        <div className="buttons">
            <CustomButton type="submit">Sign Up</CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
