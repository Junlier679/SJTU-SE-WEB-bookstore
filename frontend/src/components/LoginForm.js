import React from "react";
import { Link } from "react-router-dom"
import { Form,Icon,Input,Button,CheckBox } from 'antd';
import 'antd/dist/antd.css';
import '../css/login.css'
import {createBrowserHistory} from "history";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data: "",
            username: "",
            password: ""
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleRegister=this.handleRegister.bind(this);
        this.handleUsernameChange=this.handleUsernameChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(e) {
        var target = e.target.value;
        this.setState({username:target})
    }
    handlePasswordChange(e) {
        var target = e.target.value;
        this.setState({password:target})
    }

    handleSubmit= () => {
        if(this.state.username=="Administrator" && this.state.password=="Administrator"){
            const history = createBrowserHistory();
            history.push({pathname:"/administratorView"});
            history.go();
            return;
        }
        let username = this.state.username;
        let password = this.state.password;

        fetch("http://localhost:8080/login/"+username+"/"+password , {})
            .then((response) => response.json())
            .then((data) => {
                if(data=="success"){

                    const history = createBrowserHistory();
                    history.push({pathname:"../homeView"});
                    localStorage.setItem("username",this.state.username);
                    var trolley=[];
                    localStorage.setItem("trolley",JSON.stringify(trolley));
                    history.go();
                    return;

                }else if(data=="failure"){
                    this.setState({
                        username:"用户名或密码错误",
                        password:"用户名或密码错误"
                    })
                    return;
                }else if(data=="notValid"){
                    this.setState({
                        username:"用户已被禁用",
                        password:"用户已被禁用"
                    })
                    return;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    handleRegister = () => {
        const history = createBrowserHistory();
        history.push({pathname:"/registerView"});
        history.go();
    }

    render() {
        return (
            <Form>
                <input className="username-input"
                       required="请输入用户名"
                       value={this.state.username}
                       onChange={this.handleUsernameChange}
                       type="text" placeholder="用户名"></input>
                <input className="password-input"
                       required="请输入密码"
                       value={this.state.password}
                       onChange={this.handlePasswordChange}
                       type="password" placeholder="密码"></input>

                <button className="login" type="submit" onClick={this.handleSubmit}>登录</button>
                <button className="signin" type="button" onClick={this.handleRegister}>注册</button>
            </Form>
        );
    }
}
export default LoginForm;