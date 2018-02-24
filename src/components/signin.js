import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { signinAction } from '../store/action/action';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';


const style = {
    margin: 15,
};
const stylenab = {
    textAlign: 'center'
}

class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }


        this.signin = this.signin.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);

    }

    signin() {
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState({
            email: '',
            password: ''
        })
        this.props.signinWithEmailPassword(user);
    }
    _onChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }
    _onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <div style={stylenab}>
                <MuiThemeProvider>
                    <AppBar
                        title="Login"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        style={stylenab}
                    /><br />

                    <br />
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
                     <RaisedButton label="Submit" primary={true} style={style} onClick={(this.signin)} />
                    <br />

                    <br />
                     <Link  to='/signup'>Not Registered yet, Registered Now </Link>
                </MuiThemeProvider>

                {/* <label>Email:<input type='text' name='email' value={this.state.email} onChange={this._onChangeEmail} /></label>
                <br />
                <label>Password:<input type='password' name='password' value={this.state.password} onChange={this._onChangePassword} /></label>
                <button onClick={this.signin}>Signin</button> */}


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
        signinWithEmailPassword: (user) => {
            dispatch(signinAction(user))
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signin);

