import React, { Suspense } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import routes from '../../routes/rpage';

const Nav = React.lazy(() => import(/* webpackChunkName: "Nav" */'./Nav'));
const Spinner = React.lazy(() => import(/* webpackChunkName: "Spinner" */'../_lib/_spinner/Spinner'));
function AdminLayout() {
    const menu = routes.map((route, index) => {
        return (route.component) ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                    <route.component {...props} />
                )} />
        ) : (null);
    });
    return (
        <>
            <Nav />  
            <main>
            <section className="cd-section cd-selected">  
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    {menu}
                    <Redirect from="/" to={'/home'} />
                </Switch>
            </Suspense>
            </section>
             </main>
        </>
    )
}

const areEqual = (p, n) => true;
export default React.memo(AdminLayout, areEqual);
