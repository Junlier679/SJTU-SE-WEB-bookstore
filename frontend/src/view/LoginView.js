import React from "react";
import "../css/login.css"
import LoginForm from'../components/LoginForm';

class LoginView extends React.Component {
    render() {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="login-title">登录</h1>
                        <div className="login-content">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginView;