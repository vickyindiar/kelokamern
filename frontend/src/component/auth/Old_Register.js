import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { register } from '../../services/actions/authAction';
import { TOOGLE_LOADING } from '../../services/types/authType';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'; 
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    inputField: {
        width:'100%'
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        marginTop: '10px',
    }
});

class Register extends Component {
    constructor(props){
        super(props);
        this.state ={
            username: '',
            email: '',
            password: '',
            role: '',
            showPassword: false,
        }
    }
    
    handleOnChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    } 

    handleOnSubmitRegister = (e) => {
        e.preventDefault();
        this.props.showLoading();
        this.props.doRegister({...this.state}, this.props.history)
    }
    render() {
        const { classes } = this.props;
        return (
         <React.Fragment>
             <form onSubmit={this.handleOnSubmitRegister}> 
                    <p className="title-form title-signup-form"> SIGN UP </p>
                    <Grid item xs={12}>
                    <TextField
                        className={classes.inputField}
                        id="username"
                        name="username"
                        label="Username"
                        required
                        value={this.state.username}
                        onChange={this.handleOnChange}
                        margin="dense"
                        variant="outlined"
                        error={false}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        className={classes.inputField}
                        id="email-signup"
                        name="email"
                        label="Email"
                        type="email"
                        required
                        placeholder="contoh@mail.com"
                        value={this.state.email}
                        onChange={this.handleOnChange}
                        margin="dense"
                        variant="outlined"
                        error={false}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        className={classes.inputField}
                        id="password-signup"
                        name="password"
                        label="Password"
                        required
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleOnChange}
                        margin="dense"
                        variant="outlined"
                        error={false}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                            ),
                            }}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <Button className={classes.button} type="submit">
                        Sign Up
                    </Button>
                    </Grid>
                    <input type="hidden" name="role_id" id="role_id" value="2"/>
                </form>
            </React.Fragment> 
        )
    }
}

const mapDispatch = (dispatch) => ({
    doRegister: (user, history) => dispatch(register(user, history)),
    showLoading: () => dispatch({type: TOOGLE_LOADING, payload: true}) 
});

export default withStyles(styles)(connect(null, mapDispatch)(withRouter(Register)))
