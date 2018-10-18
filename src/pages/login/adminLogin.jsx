import React from "react";
import {Button, Dialog, DialogTitle, Paper, TextField} from "@material-ui/core";
import {withRouter} from "react-router-dom";

const backgroundImage = require('./library.jpg');

class AdminLoginClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: undefined,
            password: undefined,
            incorrect: false,
            notExists: false,
            status: undefined,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };

    handleIncorrectClose = () => {
        this.setState({
            incorrect: false
        })
    };

    handleIncorrectOpen = () => {
        this.setState({
            incorrect: true
        });
        setTimeout(this.handleIncorrectClose, 1500)
    };

    handleSubmit = event => {
        event.preventDefault();

        fetch('/admin/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.account,
                password: this.state.password,
            })
        })
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    status: result.state,
                });
            })
            .catch(e => alert(e));

        if (this.state.status === 0) {
            this.handleIncorrectOpen();
        }
        else if (this.state.status === 1) {
            const path = {
                pathname: '/librarian',
                account: this.state.account
            };
            this.props.history.push(path);
            window.location.href = '/admin';
        }

        // clear
        this.state.status = undefined;
        this.state.account = undefined;
        this.state.password = undefined;
    };

    render() {

        return (
            <div className='admin-login'>
                <div className='admin-login-bg' style={{backgroundImage: `url(${backgroundImage})`}} />
                <h2 className='admin-login-slogan'>Welcome to Bibliosoft <br/> Library Management System</h2>
                <Paper className='admin-login-paper'>
                    <TextField
                        className='admin-login-input'
                        label='account'
                        value={this.state.account}
                        onChange={this.handleChange('account')}
                        margin='normal'
                    />
                    <TextField
                        className='admin-login-input'
                        label='password'
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        type='password'
                        margin='normal'
                    />
                    <Button
                        style={{margin: '30px 50px'}}
                        className='admin-login-button'
                        variant='outlined'
                        color='secondary'
                        onClick={this.handleSubmit}
                    >
                        login
                    </Button>
                </Paper>
                <Dialog
                    onClose={this.handleIncorrectClose}
                    open={this.state.incorrect}
                >
                    <DialogTitle>
                        Incorrect account or password!
                    </DialogTitle>
                </Dialog>
            </div>
        )
    }
}

const AdminLogin = withRouter(AdminLoginClass);
export default AdminLogin;