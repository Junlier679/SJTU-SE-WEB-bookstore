import React from 'react';
import TrolleyBook from './TrolleyBook';
import '../css/home.css'

const initialData = [];

class TrolleyList extends React.Component{
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
        let trolley=JSON.parse(localStorage.getItem("trolley"));
        this.setState({data: trolley});
    }

    componentDidMount() {
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
                <div className="trolleylist">
                    {this.state.data.map(function(aBook,bookId){
                        if(aBook[0].indexOf(this.state.searchtext) > -1)
                            return(<TrolleyBook info={aBook} />);
                    },this)}
                </div>
            </div>
        );
    }
}

export default TrolleyList;