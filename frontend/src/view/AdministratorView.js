import React from "react";
import "../css/login.css";
import {createBrowserHistory} from "history";

class AdministratorView extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick = (e) => {
        const history = createBrowserHistory();
        history.push({pathname:"/administratorView/"+e});
        history.go();
        return;
    }

    render() {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <button className="adminButton" type="button" onClick={this.handleClick.bind(this,"users")}>用户管理</button>
                        <button className="adminButton" type="button" onClick={this.handleClick.bind(this,"books")}>书籍管理</button>
                        <button className="adminButton" type="button" onClick={this.handleClick.bind(this,"orders")}>订单管理</button>
                        <button className="adminButton" type="button" onClick={this.handleClick.bind(this,"stats")}>统计</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdministratorView;