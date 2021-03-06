import React from 'react';

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */'../component/home/Home'));
const Data = React.lazy(() => import(/* webpackChunkName: "Data" */'../component/data/Data'));
const Report = React.lazy(() => import(/* webpackChunkName: "Report" */'../component/report/Report'));
const Sales = React.lazy(() => import(/* webpackChunkName: "Sales" */'../component/sales/Sales'));
const Purchase  = React.lazy(() => import(/* webpackChunkName: "Purchase" */'../component/purchase/Purchase'));
const Return  = React.lazy(() => import(/* webpackChunkName: "Return" */'../component/return/Return'));
const Setting  = React.lazy(() => import(/* webpackChunkName: "Setting" */'../component/setting/Setting'));


const routes = [
    { path: '/home', exact: true, name: 'Home', component: Home },
    { path: '/data', exact: true, name: 'Data', component: Data },
    { path: '/report', exact: true, name: 'Report', component: Report },
    { path: '/sales', exact: true, name: 'Sales', component: Sales },
    { path: '/purchase', exact: true, name: 'Purchase', component: Purchase },
    { path: '/return', exact: true, name: 'Return', component: Return },
    { path: '/setting', exact: true, name: 'Setting', component: Setting },
];

export default routes;

