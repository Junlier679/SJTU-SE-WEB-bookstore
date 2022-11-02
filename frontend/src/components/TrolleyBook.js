import React from 'react'
import {Link} from 'react-router-dom'
import books from "../pictures/books.jpg"
import '../css/home.css'
import {createBrowserHistory} from "history";

class TrolleyBook extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bookinfo: this.props.info
        }
    }

    handleJump = () => {
        const history = createBrowserHistory();
        history.push({pathname:"../bookView"});
        localStorage.setItem("name",this.state.bookinfo[0]);
        history.go();
        return;
    }

    render() {
        return (
            <div className="booklink" onClick={this.handleJump}>
                <div id="trolley-book">
                    <img className="trolley-book-img" src={""}/>
                    <div id="trolley-book-name">{this.state.bookinfo[0]}</div>
                    <div id="trolley-book-detail1">单价：{this.state.bookinfo[1]}</div>
                    <div id="trolley-book-detail1">数量：{this.state.bookinfo[2]}</div>
                    <div id="trolley-book-detail2">总价：{this.state.bookinfo[3]}</div>
                </div>
            </div>
        );
    }
}

export default TrolleyBook;