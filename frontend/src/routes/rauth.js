import React from 'react';

const Auth = React.lazy(() => import(/* webpackChunkName: "Auth" */'../component/auth/Auth'));

const route = [
    { path: '/login', exact: true, name: 'Login', component: Auth },
];

export default route;