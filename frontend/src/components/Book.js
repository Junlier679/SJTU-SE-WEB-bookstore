import React from 'react'
import {Link} from 'react-router-dom'
import books from "../pictures/books.jpg"
import '../css/home.css'
import {createBrowserHistory} from "history";

class Book extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bookinfo: this.props.info
        }
    }

    handleJump = () => {
        const history = createBrowserHistory();
        history.push({pathname:"../bookView"});
        localStorage.setItem("name",this.state.bookinfo);
        history.go();
        return;
    }

    render() {
        return (
            <div className="booklink" onClick={this.handleJump}>
                <div id="book">
                    <img className="book-img" src={""}/>
                    <div id="book-name">{this.state.bookinfo}</div>
                </div>
            </div>
        );
    }
}

export default Book;