/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    createAsyncThunk,
    createSlice,
    SerializedError,
} from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth, signInWithGoogle } from '../../../../../firebase/firebase.utils';

export interface AuthState {
    displayName?: string | null;
    email?: string | null;
    authenticated?: boolean;
    error?: SerializedError;
}

const initialState: AuthState = {
    displayName: undefined,
    email: undefined,
    authenticated: undefined,
    error: undefined,
};

interface LoginPayLoad {
    logInType?: 'google' | 'email';
    displayName?: string | null;
    email?: string | null;
    password?: string;
}

export const login = createAsyncThunk<AuthState, LoginPayLoad>(
    'login',
    async (req, thunkAPI) => {
        try {
            if (req.logInType) {

                let response: UserCredential | null = null;
                switch (req.logInType) {
                    case 'google':
                        response = await signInWithGoogle();
                        break;
                    case 'email':
                        response = await signInWithEmailAndPassword(auth, req.email as string, req.password as string);
                        break;
                }
                console.log('login request',req);
                console.log('login response',response);

                if (response) {
                    const { displayName, email } = req;
                    return {
                        displayName,
                        email
                    };
                }
                else {
                    throw new Error("Login failed");
                }
                
                
            } else {
                console.log('login request no type',req);
                const { displayName, email } = req;
                return { displayName, email };
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const logout = createAsyncThunk('logout', async (_, thunkAPI): Promise<any> => {
    try {
        await auth.signOut();
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.authenticated = true;
        })
        .addCase(login.rejected, (state, action) => {
            state.error = action.error;
        })
        .addCase(logout.fulfilled, state => {
            state.authenticated = false;
            state.displayName = initialState.displayName;
            state.email = initialState.email;
        })
        .addCase(logout.rejected, (state, action) => {
            state.error = action.error;
        });
    },
});

//export auth reducer
export const { reducer: authReducer } = authSlice;