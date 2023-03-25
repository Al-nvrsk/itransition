import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { Context } from '../../../App';

interface IRequireAuth {
    children: JSX.Element;
}

export const RequireAuth = ({ children }: IRequireAuth) => {
    const  context = useContext(Context)
    return context?.userContext.isAuth ? children : <Navigate to="/task4/auth" replace />;
};
