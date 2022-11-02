import React from 'react'
import {Link} from 'react-router-dom'
import books from "../pictures/books.jpg"
import '../css/home.css'
import {createBrowserHistory} from "history";

class AdminBook extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data: "",
            bookName: this.props.bookName,
            bookAuthor: "",
            bookPrice: "",
            bookDescriptions: "",
            oldName: "",
            bookStock: ""
        }
        this.getBookDetails=this.getBookDetails.bind(this);
        this.handleBookNameChange=this.handleBookNameChange.bind(this);
        this.handleBookAuthorChange=this.handleBookAuthorChange.bind(this);
        this.handleBookPriceChange=this.handleBookPriceChange.bind(this);
        this.handleBookDescriptionsChange=this.handleBookDescriptionsChange.bind(this);
        this.handleBookStockChange=this.handleBookStockChange.bind(this);
        this.handleEditClick=this.handleEditClick.bind(this);
        this.handleDeleteClick=this.handleDeleteClick.bind(this);
    }

    getBookDetails =	()	=>	{
        var name=this.state.bookName;
        if(name=="")return;
        fetch("http://localhost:8080/getDetail/"+name,{method: 'get',})
            .then(response	=>	response.json())
            .then(data	=>	{
                this.setState({
                    oldName:data[0][0],
                    bookAuthor:data[0][1],
                    bookDescriptions:data[0][2],
                    bookPrice:data[1][0],
                    bookStock:data[2][0]

                });
            }).catch(function	(ex)	{
            console.log('parsing	failed',	ex)
        })
    }
    componentWillMount() {
        this.getBookDetails();
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

    handleEditClick(){
        let oldName=this.state.oldName;
        let bookName=this.state.bookName;
        let bookAuthor=this.state.bookAuthor;
        let bookPrice=this.state.bookPrice;
        let bookDescriptions=this.state.bookDescriptions;
        let bookStock=this.state.bookStock;
        fetch("http://localhost:8080/edit/"
            +oldName+"/"+bookName+"/"+bookAuthor+"/"+bookPrice+"/"+bookDescriptions+"/"+bookStock , {})
            .then((response) => response.json())
            .then((data) => {
            });
    }
    handleDeleteClick(){
        let bookName=this.state.bookName;
        let bookAuthor=this.state.bookAuthor;
        let bookPrice=this.state.bookPrice;
        let bookDescriptions=this.state.bookDescriptions;
        fetch("http://localhost:8080/deletebook/"+bookName+"/"+bookAuthor+"/"+bookPrice+"/"+bookDescriptions , {})
            .then((response) => response.json())
            .then((data) => {
                    if(data=="不存在此书"){
                        this.setState({
                            bookName: "不存在此书"
                        })
                        return;
                    }
                    if(data=="已删除"){
                        this.setState({
                            bookName: "已删除",
                            bookAuthor: "",
                            bookPrice: "",
                            bookDescriptions: "",
                            bookStock: ""
                        })
                        return;
                    }
                }
            )
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
                <button className="book-button" onClick={this.handleEditClick}>修改</button>
                <button className="book-button" onClick={this.handleDeleteClick}>删除</button>
            </div>
        );
    }
}

export default AdminBook;