import React from 'react';
import { AppContext } from './../context/ContextProvider';

class Login extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            loginFailed: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentDidUpdate() {

    }

    processLogin(email, password) {
        fetch('http://127.0.0.1:3001/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                response.json().then(json => {
                    if (response.status == 200) {
                        window.localStorage.setItem('token', json.token);
                        this.setState({ loginFailed: false });
                        this.props.history.push("/");
                    } else {
                        this.setState({ loginFailed: true });
                    }
                })
            });
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (

            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-img-left d-none d-md-flex">
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Login</h5>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input type="text" id="inputUserame" className="form-control" onChange={this.handleEmailChange} placeholder="Username" required autofocus />
                                        <label for="inputUserame">Email</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" className="form-control" onChange={this.handlePasswordChange} placeholder="Password" required />
                                        <label for="inputPassword">Password</label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" /* NEVER EVER USE TYPE = "SUBMIT" */ onClick={(event) => this.processLogin(this.state.email, this.state.password)}
                                        data-toggle="modal" data-target="#loginFailedMessage">Submit</button>

                                    {this.state.loginFailed && <p>Login failed</p>}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;