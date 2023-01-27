import { Route, Routes } from 'react-router-dom';
import './app.module.scss';


import Header from './components/header/header.component';
import HomePage from './pages/home/home.page';
import ShopPage from './pages/shop/shop.page';
import SignInAndUpPage from './pages/sign-in-and-up/sign-in-and-up.page';
import React, { FC, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import { useDispatch, useSelector } from 'react-redux';
import { isUserAuthenticatedSelector } from './store/slices/user/auth/auth.selectors';
import { login, logout } from './store/slices/user/auth/auth.slice';

export interface AppUser {
  currentUser?: string | null;
  displayName?: string;
  email?: string;
  createdAt?: Date
}

export const App: FC = () => {

  const authenticated = useSelector(isUserAuthenticatedSelector);
  const dispatch = useDispatch();

  const refresh = React.useCallback(
    async ({displayName, email}) => {
      console.log('refresh', displayName, email);
      return dispatch(login({displayName, email}));
    },
    [dispatch]
  );

  useEffect(() => {
    const f = async () => {
      auth.onAuthStateChanged(async user => {
        if (user && !authenticated) {
          const userRef = await createUserProfileDocument(user)

          if(userRef) {
            onSnapshot(userRef, {
              next: async (userSnap) => {
                console.log('onAuthStateChanged id', userSnap.id)
                console.log('onAuthStateChanged data', userSnap.data())
                return await refresh(userSnap.data());
              },
              error: (error) => {
                console.error('Canot login the user', error)
              }
            });
          }
          
        }
        if (!user && !authenticated) {
          dispatch(logout());
        }
      });
      // await auth.setPersistence(auth..Auth.Persistence.SESSION);
    };
    f();
  });

    return (
      <>
        <Header/>
        <Routes>
          <Route  path="/" element={<HomePage/>}/>
          <Route path="/shop" element={<ShopPage/>}/>
          <Route path="/signin" element={<SignInAndUpPage/>}/>
        </Routes>
      </>
    );
  }



