import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import PrivateRoute from './component/nav/PrivateRoute';
import { AuthorizationCheck } from './services/actions/authAction';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.orange.light.compact.css';

// import 'devextreme/dist/css/dx.material.final-custom-dark.css';
//import 'devextreme/dist/css/dx.material.custom-scheme.css';
import routes from "./routes/rauth";
import Loadable from 'react-loadable';

//components
const Spinner = React.lazy(() => import(/* webpackChunkName: "spinner" */'./component/_lib/_spinner/Spinner'));
const AdminLayout = Loadable({
  loader: () => import('./component/admin/AdminLayout'),
  loading: Spinner
});
function App() {
  console.log('render app')
  const isAuthenticated = useSelector(s => s.auth.isAuthenticated);
  const isLoad = useSelector(state => state.auth.firstLoad);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
      if(!isAuthenticated){
        dispatch(AuthorizationCheck(history, location))
      }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);


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

    const content = () => {
      if (isLoad) { return null; }
     else{
        return (
          <>
               <Switch>
                  {menu}
                  <PrivateRoute path="/" auth={isAuthenticated} component={AdminLayout} />
               </Switch>
          </>
        )
     }
    }

    return (
      <div className="App">
        { content() }
      </div>
    );
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(App, areEqual)
