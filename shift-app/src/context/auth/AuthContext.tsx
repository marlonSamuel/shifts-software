import { createContext, useContext, useEffect, useReducer, useState } from "react";
import  api  from "../../api/axios";
import { IUser, IAuthData, ILoginData } from "../../interfaces/IAuth";
import { authReducer, IAuthState } from "./AuthReducer";
import { jwtDecode } from 'jwt-decode'

export interface AuthContextProps {
    errorMessage: string;
    user: IUser | null;
    logged: boolean;
    token: string | null;
    login: (loginData: ILoginData) => void;
    logout: () => void;
    refreshToken: () => void;
    removeError: () => void;
}

export const initialState: IAuthState = {
    logged: false,
    user: null,
    errorMessage: '',
    token: null
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
      const logged = localStorage.getItem('logged');
      if(logged){
          checkToken();
      }
      
    }, [])


    //verificar si existe token activo
    const checkToken = async() => {
        const token = await localStorage.getItem('token');

        //no token, no autenticadl
        if(!token) return;
        let user:IUser = jwtDecode(token);
        console.log(JSON.stringify(user));
        dispatch({
            type: 'login',
            payload: {
                token: token,
                user: user
            }
        });
    }

    //refrescar token en caso de ser necesario
    const refreshToken = () => {
        dispatch({type: 'logout'});
        localStorage.removeItem('logged');
        return true;
    }
    

    //disparar estado login
    const login = async( {username, password} : ILoginData ) => {

        await api.post<IAuthData>('/users/login',{username, password}).then(r=>{
            localStorage.setItem('logged','true');
            localStorage.setItem('token',r.data.token);
            let user:IUser = jwtDecode(r.data.token);
            dispatch({
                type: 'login',
                payload: {
                    token: r.data.token,
                    user: user
                }
            });
        }).catch(e=> {
            dispatch({
                type: 'addError',
                payload: e.message
            })
        });
    }

    //disparar estado logout
    const logout = () => {
        dispatch({type: 'logout'});
        localStorage.removeItem('logged');
        localStorage.removeItem('token');
        return true;
    }

    const removeError = () => {
        dispatch({
            type: 'removeError'
        })
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            logout,
            refreshToken,
            removeError
        }}>
            { children }
        </AuthContext.Provider>
    )
}
