import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { signupAction } from '../store/action/action';
import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';



const style = {
    margin: 15,
};
const stylenab = {
     textAlign: 'center'
}

class Signup extends Component {


    constructor(props) {
        super(props);

        this.state = {
            email: '',
            userName: '',
            password: ''
        }


        this.signup = this.signup.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangeUserName = this._onChangeUserName.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);

    }

    signup() {
        let user = {
            email: this.state.email,
            username: this.state.userName,
            password: this.state.password
        }
        this.setState({
            email: '',
            userName: '',
            password: ''
        })
        this.props.signupwithEmailPassword(user);
    }
    _onChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }
    _onChangeUserName(event) {
        this.setState({
            userName: event.target.value
        })
    }
    _onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <div  style={stylenab}>
                <MuiThemeProvider>


                    <AppBar
                        title="Sign up"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                      style={stylenab}
                     
                    />

                    <TextField
                        hintText="Name"

                        floatingLabelText="Enter Your Name"
                        value={this.state.userName} onChange={this._onChangeUserName}

                    /><br />
                    <TextField
                        hintText="Email"

                        floatingLabelText="Enter Your Email"

                        value={this.state.email} onChange={this._onChangeEmail}
                    /><br />
                    <TextField
                        hintText="Password"

                        floatingLabelText="Enter Your Password"
                        type='password'
                        value={this.state.password} onChange={this._onChangePassword}
                    /><br />
                    <RaisedButton label="Submit" primary={true} style={style} onClick={(this.signup)} />
                    <br/>
                    {/* <h3>Already Registered, Go to Login</h3>    */}
                       {/* <Link to='/about'>Go to About</Link>    */}
                    <br/> <br/>
                    <Link  to='/signin'>Already Registered, Go to Login</Link>
                     {/* <RaisedButton label="Login" primary={true} style={style} to='/signin' /> */}

                </MuiThemeProvider>

                {/* <button onClick={this.signup}>Signup</button>
                <label>Email:<input type='text' name='email' value={this.state.email} onChange={this._onChangeEmail} /></label>
                <br />
                <label>User Name:<input type='text' name='username' value={this.state.userName} onChange={this._onChangeUserName} /></label>

                <label>Password:<input type='password' name='password' value={this.state.password} onChange={this._onChangePassword} /></label> */}

            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        // userName: state.root.userName
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        signupwithEmailPassword: (userDetails) => {
            dispatch(signupAction(userDetails));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);

