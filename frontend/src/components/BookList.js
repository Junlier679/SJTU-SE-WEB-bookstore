import React from 'react';
import Book from './Book';
import '../css/home.css'
import book1 from "../pictures/三体1.jpg";
import book2 from "../pictures/三体2.jpg";
import book3 from "../pictures/三体3.jpg";
import book4 from "../pictures/追风筝的人&摆渡人.jpg";
import book5 from "../pictures/数据结构.jpg";
import book6 from "../pictures/白夜行.jpg";
import book7 from "../pictures/白鹿原.jpg";
import book8 from "../pictures/银河帝国.jpg";
import book9 from "../pictures/高数下.jpg";
import book10 from "../pictures/库里传.jpg";
import book11 from "../pictures/巨人的陨落.jpg";
import book12 from "../pictures/伊斯坦布尔假期.jpg";

const initialData = [];

class BookList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: initialData,
            searchtext: ""
        };
        this.search=this.search.bind(this);
        this.getBooks=this.getBooks.bind(this);
    }

    getBooks =	()	=>	{
        fetch("http://localhost:8080/") .then(response =>	response.json())
            .then(data	=>	{
                this.setState({data: data});
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
            <div className="booktable">
                <div id="searching">
                    <input type="text" className="search-input" placeholder="查找你想要的书籍"
                           value={this.state.searchtext} onChange={this.search}>
                    </input>
                    <button className="search-button"></button>
                </div>
                <div className="booklist">
                    {this.state.data.map(function(aBookName,bookId){
                        if(aBookName[0].indexOf(this.state.searchtext) > -1)
                            return(<Book info={aBookName[0]} />);
                    },this)}
                </div>
            </div>
        );
    }
}

export default BookList;