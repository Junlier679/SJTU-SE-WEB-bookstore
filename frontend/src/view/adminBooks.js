import React from "react";
import "../css/administrator.css";
import {createBrowserHistory} from "history";
import AdminBook from "../components/AdminBook";
import NewBook from "../components/NewBook";

class AdminUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchtext: ""
        };
        this.search=this.search.bind(this);
        this.getBooks=this.getBooks.bind(this);
    }

    getBooks =	()	=>	{
        fetch("http://localhost:8080/") .then(response	=>	response.json())
            .then(data	=>	{
                this.setState({
                    data:	data,
                });
            }).catch(function	(ex)	{
            console.log('parsing	failed',	ex)
        })
    }

    componentWillMount() {
        this.getBooks();
    }

    search = (e) => {
        let needle = e.target.value;
        this.setState({searchtext: needle});
    }

    render() {
        return (
            <div className="adminShowBooks">
                <input type="text" className="user-search" placeholder="searching...."
                       value={this.state.searchtext} onChange={this.search}>
                </input>
                {this.state.data.map(function(aBook,bookId){
                    if(aBook[0].indexOf(this.state.searchtext) > -1)
                        return(<AdminBook bookName={aBook[0]} />);
                },this)}
                <NewBook />
            </div>
        );
    }
}

export default AdminUsers;