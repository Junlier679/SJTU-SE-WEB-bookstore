import React from "react";
import { Link } from "react-router-dom"
import { Form,Icon,Input,Button,CheckBox } from 'antd';
import 'antd/dist/antd.css';
import '../css/login.css'
import {createBrowserHistory} from "history";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data: "",
            username: "",
            password: "",
            passwordcheck:"",
            emailaddress:""
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleUsernameChange=this.handleUsernameChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.handlePasswordcheckChange=this.handlePasswordcheckChange.bind(this);
        this.handleEmailaddressChange=this.handleEmailaddressChange.bind(this);
    }

    handleUsernameChange(e) {
        var target = e.target.value;
        this.setState({username:target})
    }
    handlePasswordChange(e) {
        var target = e.target.value;
        this.setState({password:target})
    }
    handlePasswordcheckChange(e){
        var target=e.target.value;
        this.setState({passwordcheck:target})
    }

    handleEmailaddressChange(e){
        var target=e.target.value;
        this.setState({emailaddress:target})
    }

    handleBack = () => {
        const history = createBrowserHistory();
        history.push({pathname:"/login"});
        history.go();
    }

    handleSubmit = () => {
        let username=this.state.username;
        let password=this.state.password;
        let passwordcheck=this.state.passwordcheck;
        let emailadrress=this.state.emailaddress;
        if(password != passwordcheck){
            alert("确认密码与密码不同！")
            this.setState({
                passwordcheck:""
            })
            return;
        }
        fetch("http://localhost:8080/signup/"+username+"/"+password+"/"+emailadrress , {})
            .then((response) => response.json())
            .then((data) => {
                if(data=="User name already exists"){
                    alert("用户名已存在！");
                    this.setState({
                        username: ""
                    })
                    return;}
                if(data=="success"){
                    alert("注册成功！");
                    this.setState({
                        username:"",
                        password:"",
                        passwordcheck:"",
                        emailaddress:""
                    })
                }
            })
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
                <input className="username-input"
                       required="请输入密码"
                       value={this.state.password}
                       onChange={this.handlePasswordChange}
                       type="password" placeholder="密码"></input>
                <input className="username-input"
                       required="请输入密码"
                       value={this.state.passwordcheck}
                       onChange={this.handlePasswordcheckChange}
                       type="password" placeholder="确认密码"></input>
                <input className="username-input"
                       required="请输入邮箱地址"
                       value={this.state.emailaddress}
                       onChange={this.handleEmailaddressChange}
                       type="email" placeholder="邮箱地址"></input>

                <button className="login" type="submit" onClick={this.handleSubmit}>注册</button>
                <button className="signin" type="button" onClick={this.handleBack}>返回登陆</button>
            </Form>
        );
    }
}
export default SignupForm;