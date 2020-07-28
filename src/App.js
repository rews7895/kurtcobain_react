import React from 'react';
import './App.css';

import { Route, Switch} from 'react-router-dom';

import loadable from "@loadable/component";

import {useSelector} from "react-redux";

import { SnackbarProvider } from 'notistack';

import Rendering from "./components/common/Rendering";
import OAuth2RedirectHandler from "./lib/oauth2/OAuth2RedirectHandler";
import BackDrop from "./components/common/BackDrop";

const NotFoundPage = loadable(() => import('./pages/NotFoundPage'), {
    fallback: <Rendering/>
});
const BoardPage = loadable(() => import('./pages/board/BoardPage'), {
    fallback: <Rendering/>
});
const BoardCreatePage = loadable(() => import('./pages/board/BoardCreatePage'), {
    fallback: <Rendering/>
});
const BoardUpdatePage = loadable(() => import('./pages/board/BoardUpdatePage'), {
    fallback: <Rendering/>
});
const BoardViewPage = loadable(() => import('./pages/board/BoardViewPage'), {
    fallback: <Rendering/>
});
const LoginPage = loadable(() => import("./pages/auth/LoginPage"), {
    fallback: <Rendering/>
});
const RegisterPage = loadable(() => import("./pages/auth/RegisterPage"), {
    fallback: <Rendering/>
});


function App() {
    const {open} = useSelector(({loading}) => ({
        open: loading.open
    }));
    return (
        <SnackbarProvider maxSnack={3}>
            <Rendering/>
            <BackDrop open={open}/>
            <Switch>
                <Route component={LoginPage} path="/login" />
                <Route component={BoardPage} path={['/board', '/']} exact/>
                <Route component={BoardCreatePage} path="/board/create"/>
                <Route component={BoardViewPage} path="/board/:id" exact/>
                <Route component={BoardUpdatePage} path="/board/:id/edit"/>
                <Route component={RegisterPage} path="/register" />
                <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </SnackbarProvider>
    );
}

export default App;
