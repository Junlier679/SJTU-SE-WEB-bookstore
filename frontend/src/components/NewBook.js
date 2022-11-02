import React from 'react'
import {Link} from 'react-router-dom'
import books from "../pictures/books.jpg"
import '../css/home.css'
import {createBrowserHistory} from "history";

class NewBook extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            bookName: "书名",
            bookAuthor: "作者",
            bookPrice: 0.0,
            bookDescriptions: "书籍描述",
            bookStock: 0
        }
        this.handleBookNameChange=this.handleBookNameChange.bind(this);
        this.handleBookAuthorChange=this.handleBookAuthorChange.bind(this);
        this.handleBookPriceChange=this.handleBookPriceChange.bind(this);
        this.handleBookDescriptionsChange=this.handleBookDescriptionsChange.bind(this);
        this.handleBookStockChange=this.handleBookStockChange.bind(this);
        this.handleNewClick=this.handleNewClick.bind(this);
    }

    handleBookStockChange(e){
        var target=e.target.value;
        this.setState({ bookStock:target})
    }
    handleBookNameChange(e){
        var target=e.target.value;
        this.setState({ bookName:target})
    }
    handleBookAuthorChange(e){
        var target=e.target.value;
        this.setState({ bookAuthor:target})
    }
    handleBookPriceChange(e){
        var target=e.target.value;
        this.setState({ bookPrice:target})
    }
    handleBookDescriptionsChange(e){
        var target=e.target.value;
        this.setState({ bookDescriptions:target})
    }

    handleNewClick(){
        let bookName=this.state.bookName;
        let bookAuthor=this.state.bookAuthor;
        let bookPrice=this.state.bookPrice;
        let bookDescriptions=this.state.bookDescriptions;
        let bookStock=this.state.bookStock;
        fetch("http://localhost:8080/newbook/"
            +bookName+"/"+bookAuthor+"/"+bookPrice+"/"+bookDescriptions+"/"+bookStock , {})
            .then((response) => response.json())
            .then((data) => {
            });
        alert("添加成功!");
    }

    render() {
        return (
            <div className="book-line">
                <input type="text" className="book-text1" required="bookName"
                       value={this.state.bookName} onChange={this.handleBookNameChange}>
                </input>
                <input type="text" className="book-text2" required="bookAuthor"
                       value={this.state.bookAuthor} onChange={this.handleBookAuthorChange}>
                </input>
                <input type="text" className="book-text3" required="bookPrice"
                       value={this.state.bookPrice} onChange={this.handleBookPriceChange}>
                </input>
                <input type="text" className="book-text4" required="bookDescriptions"
                       value={this.state.bookDescriptions} onChange={this.handleBookDescriptionsChange}>
                </input>
                <input type="text" className="book-text3" required="bookStock"
                       value={this.state.bookStock} onChange={this.handleBookStockChange}>
                </input>
                <button className="book-button" onClick={this.handleNewClick}>添加</button>
            </div>
        );
    }
}

export default NewBook;