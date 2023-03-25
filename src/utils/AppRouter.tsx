import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { routePath } from './routePath';
import { Task5Page } from '../task5/Task5Page';
import { RegistrationPage } from '../task4/client/pages/RegistrationPage/RegistrationPage';
import { AuthPage } from '../task4/client/pages/AuthPage/AuthPage';
import { RequireAuth } from '../task4/client/utils/RequireAuth';
import { ContentPage } from '../task4/client/pages/ContentPage/ContentPage';
import { MenuPage } from '../pages/MenuPage';

export const AppRouter = () => {

    return (
        <Routes>
            <Route 
                path={routePath.menu} 
                element={<MenuPage />}
            />
            <Route
                path={routePath.task5}
                element={ <Task5Page /> }
            />
            <Route
                path={routePath.registration}
                element={ <RegistrationPage />}
            />
            <Route
                path={routePath.auth}
                element={<AuthPage />}
            />
            <Route
                path={routePath.task4}
                element={
                    <RequireAuth>
                        <ContentPage />
                    </RequireAuth>
                }
            />
        </Routes>
    );
};
