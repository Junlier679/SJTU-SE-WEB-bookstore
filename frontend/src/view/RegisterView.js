import React from "react";
import "../css/login.css";
import {createBrowserHistory} from "history";
import SignupForm from "../components/SignupForm";

class RegisterView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login-page">
                <div className="signup-container">
                    <div className="login-box">
                        <h1 className="login-title">注册</h1>
                        <div className="login-content">
                            <SignupForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterView;