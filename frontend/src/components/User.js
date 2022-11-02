import React from 'react'
import {Link} from 'react-router-dom'
import books from "../pictures/books.jpg"
import '../css/home.css'
import {createBrowserHistory} from "history";

class User extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            username: this.props.username,
            password: this.props.password,
            emailaddress: this.props.emailaddress,
            valid: this.props.valid
        };
        this.handleValid=this.handleValid.bind(this);
    }

    handleValid(){
        if(this.state.valid == "禁用/解禁")return;
        var username=this.props.username;
        fetch("http://localhost:8080/valid/"+username) .then(response	=>	response.json())
            .then(data	=>	{
                this.setState({
                    valid: data
                });
            }).catch(function	(ex)	{
            console.log('parsing	failed',	ex)
        })
    }

    render() {
        return (
            <div className="user-line">
                <div className="user-text1">{this.state.username}</div>
                <div className="user-text1">{this.state.password}</div>
                <div className="user-text2">{this.state.emailaddress}</div>
                <button className="user-valid" onClick={this.handleValid}>{this.state.valid}</button>
            </div>
        );
    }
}

export default User;