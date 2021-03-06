import React, {useEffect, useState} from "react";
import * as C from "./StyledC";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TOOGLE_LOADING } from '../../services/types/authType';
import { login, register } from '../../services/actions/authAction';
import "./styles.css";

function Auth() {
  console.log('render auth')
  const [signIn, toggle] = useState(true); 
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(s => s.auth.isAuthenticated);
  const history = useHistory();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin');
  const [role] = useState('');
  const [showPass, setshowPass] = useState(false);

  useEffect(() => {
    if(isAuthenticated){
       history.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleOnSubmitLogin = (e) =>{
    e.preventDefault();
    dispatch({type: TOOGLE_LOADING, payload: true}); 
    dispatch(login({email, password, showPass}, history));  
  }

  const handleOnSubmitRegister = (e) => {
    e.preventDefault();
    dispatch({type: TOOGLE_LOADING, payload: true}); 
    dispatch(register({name, email, password, role }, history));
  }

  const handleOnChange = (e) => {
      if (e.target.name === 'name') { setName(e.target.value) }
      else if(e.target.name === 'email') { setEmail(e.target.value) }
      else if(e.target.name === 'password') { setPassword(e.target.value) }
    }

  const handleClickShowPassword = () => { setshowPass(!showPass) } 

  return (
    <C.Container>
      <C.SignUpContainer signingIn={signIn}>
        <C.Form onSubmit={ handleOnSubmitRegister }>
          <C.Title>Create Account</C.Title>
          <C.Input type="text" placeholder="Name" name="name" onChange={handleOnChange} value={name} />
          <C.Input type="email" placeholder="Email" name="email" onChange={handleOnChange} value={email} />
          <C.Input type="password" placeholder="Password" name="password" onChange={handleOnChange} value={password}/>
          <input type="hidden" name="role_id" id="role_id" value="2"/>
          <C.Button>Sign Up</C.Button>
        </C.Form>
      </C.SignUpContainer>
      <C.SignInContainer signingIn={signIn}>
        <C.Form onSubmit={ handleOnSubmitLogin }> 
          <C.Title>Sign in</C.Title>
          <C.Input type="email" placeholder="Email" name="email" onChange={handleOnChange} value={email} />
          <C.Input type="password" placeholder="Password"  name="password" onChange={handleOnChange} value={password} />
          <C.Anchor href="#">Forgot your password?</C.Anchor>
          <C.Button type="submit">Sign In</C.Button>
        </C.Form>
      </C.SignInContainer>
      <C.OverlayContainer signingIn={signIn}>
        <C.Overlay signingIn={signIn}>
          <C.LeftOverlayPanel signingIn={signIn}>
            <C.Title>Welcome Back!</C.Title>
            <C.Paragraph>
              To keep connected with us please login with your personal info
            </C.Paragraph>
            <C.GhostButton onClick={() => toggle(true)}>
              Sign In
            </C.GhostButton>
          </C.LeftOverlayPanel>
          <C.RightOverlayPanel signingIn={signIn}>
            <C.Title>Hello, Friend!</C.Title>
            <C.Paragraph>
              Enter your personal details and start journey with us
            </C.Paragraph>
            <C.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </C.GhostButton>
          </C.RightOverlayPanel>
        </C.Overlay>
      </C.OverlayContainer>
    </C.Container>
  );
}

const areEqual = (prevProps, nextProps) => true;
export default React.memo(Auth, areEqual);
