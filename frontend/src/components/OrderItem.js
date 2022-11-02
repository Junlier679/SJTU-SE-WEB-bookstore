import React from 'react'
import {Link} from 'react-router-dom'
import books from "../pictures/books.jpg"
import '../css/home.css'
import {createBrowserHistory} from "history";

class OrderItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            itemID: this.props.itemID,
            bookName: "",
            bookPrice: 0.0,
            bookNumber: 0,
            priceAll: 0.0
        }
    }

    componentWillMount() {
        fetch("http://localhost:8080/getItemDetails/"+this.state.itemID,{})
            .then(response	=>	response.json())
            .then(data	=>	{
                this.setState({
                    bookNumber: data[0][0],
                    bookPrice: data[1][0],
                    priceAll: data[1][1],
                    bookName: data[2][0]
                })
            }).catch(function	(ex)	{
            console.log('parsing	failed',	ex)
        })
    }

    handleJump = () => {
        const history = createBrowserHistory();
        history.push({pathname:"../bookView"});
        localStorage.setItem("name",this.state.bookName);
        history.go();
        return;
    }

    render() {
        return (
            <div className="booklink" onClick={this.handleJump}>
                <div id="trolley-book">
                    <img className="trolley-book-img" src={""}/>
                    <div id="trolley-book-name">{this.state.bookName}</div>
                    <div id="trolley-book-detail1">单价：{this.state.bookPrice}</div>
                    <div id="trolley-book-detail1">数量：{this.state.bookNumber}</div>
                    <div id="trolley-book-detail2">总价：{this.state.priceAll}</div>
                </div>
            </div>
        );
    }
}

export default OrderItem;