import React from "react";
import "../css/administrator.css";
import {createBrowserHistory} from "history";
import User from "../components/User";

const title=["用户名","密码","邮箱","禁用/解禁"];

class AdminUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchtext: ""
        };
        this.search=this.search.bind(this);
        this.getUserInfo=this.getUserInfo.bind(this);
    }

    getUserInfo = () => {
        fetch("http://localhost:8080/getUserinfo") .then(response	=>	response.json())
            .then(data	=>	{
                this.setState({
                    data: data,
                });
            }).catch(function	(ex)	{
            console.log('parsing	failed',	ex)
        })
    }

    componentWillMount() {
        this.getUserInfo();
    }

    search = (e) => {
        let needle = e.target.value;
        this.setState({searchtext: needle});
    }

    render() {
        return (
            <div className="adminShow">
                <input type="text" className="user-search" placeholder="searching...."
                       value={this.state.searchtext} onChange={this.search}>
                </input>
                <User username={title[0]} password={title[1]} emailaddress={title[2]} valid={title[3]} />
                {this.state.data.map(function(aUser,userId){
                    if(aUser[0].indexOf(this.state.searchtext) > -1)
                        return(<User username={aUser[0]} password={aUser[1]} emailaddress={aUser[2]} valid={aUser[3]} />);
                },this)}
            </div>
        );
    }
}

export default AdminUsers;