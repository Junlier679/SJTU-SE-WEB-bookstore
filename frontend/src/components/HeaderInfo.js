import React from 'react';
import { Row,Col } from 'antd';
import '../css/index.css'
import StoreLogo from '../pictures/storelogo.jpg';
import {createBrowserHistory} from "history";

class HeaderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: this.props.pageName
        };
    }

    logout = () => {
        fetch("http://localhost:8080/Logout", {})
            .then((response) => response.json())
            .then((data) => {
            if(data == "logout success") {
                alert("yes");
                const history = createBrowserHistory();
                history.push({pathname:"../login"});
                history.go();
                return;
            }
        });
    }

    render() {
        return (
            <div id="home-header">
                <div id="header-content">
                    <a href={"/"} id="logo-area">
                        <div id="logoandname">
                            <img className="logo" src={StoreLogo} />
                            <div id="store-name">牛牛书店</div>
                        </div>
                    </a>
                    <div id="page-name">{this.state.pageName}</div>
                    <button className="logout" onClick={this.logout}>退出登录</button>
                </div>
            </div>
        );
    }
}

export default HeaderInfo;