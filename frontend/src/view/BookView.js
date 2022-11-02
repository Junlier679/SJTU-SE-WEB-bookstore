import React from 'react';
import {Layout} from 'antd'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import HeaderInfo from "../components/HeaderInfo";
import SideBars from "../components/SideBars"
import BuyView from "./BuyView"
import '../css/bookDetails.css'
import BookList from "../components/BookList";
const { Header,Content,Footer } = Layout;

class BookView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            bookName: "",
            bookAuthor: "",
            bookDescriptions: "",
            bookPrice: "",
            bookStock: "",
            added: "加入购物车"
        }
        this.getBookDetails=this.getBookDetails.bind(this);
        this.set=this.set.bind(this);
    }

    getBookDetails = () => {
        let name = localStorage.getItem("name");
        fetch("http://localhost:8080/getDetail/"+name,{
            method: 'get',
        }) .then(response	=>	response.json())
            .then(data	=>	{
                this.setState({
                    bookName: name,
                    bookAuthor: data[0][1],
                    bookDescriptions: data[0][2],
                    bookPrice: data[1][0],
                    bookStock: data[2][0]
                });
            }).catch(function	(ex)	{
            console.log('parsing	failed',	ex)
        })
    }

    componentWillMount() {
        this.getBookDetails();
    }

    set = () => {
        let trolley=JSON.parse(localStorage.getItem("trolley"));
        let aItem = new Array(4);
        aItem[0] = this.state.bookName;
        aItem[1] = this.state.bookPrice;
        aItem[2] = 1;
        aItem[3] = this.state.bookPrice;
        let flag = true;
        trolley.forEach(
            (key) => {
                if(key[0] == aItem[0]) {
                    key[2] += 1;
                    key[3] = this.state.bookPrice*key[2];
                    flag = false;
                }
            }
        )
        if(flag)trolley.push(aItem);
        localStorage.setItem("trolley",JSON.stringify(trolley));
        this.setState({added: "已加入购物车"});
    }

    render() {
        return (
            <Layout className="Layout">
                <header>
                    <HeaderInfo pageName={"书籍详情"}/>
                </header>
                <div>
                    <SideBars />
                    <Content className="content" style={{ padding: '20px 50px'}}>
                        <div id="bookview-content">
                            <img className="bookview-img"></img>
                            <div id="book-details">
                                <div id="bookview-name">{this.state.bookName}</div>
                                <div id="book-writer">作者：{this.state.bookAuthor}</div>
                                <div id="book-price">价格：{this.state.bookPrice}</div>
                                <div id="book-price">库存：{this.state.bookStock}</div>
                                <div id="book-intro">简介：{this.state.bookDescriptions}</div>
                            </div>
                            <div id="bookview-buttons">
                                <Link to="/buyView">
                                    <button className="buynow" type="button">购买</button>
                                </Link>
                                <button className="add-to-shoppingtrolley" onClick={this.set}>
                                    {this.state.added}
                                </button>
                            </div>
                        </div>
                    </Content>
                </div>
            </Layout>
        );
    }
}

export default BookView;


// function BookView (){
//
//     const location=useLocation();
//     console.log(location);
//     const bookinfo=location.state.info
//
//     return (
//         <Layout className="Layout">
//             <header>
//                 <HeaderInfo pageName={"书籍详情"}/>
//             </header>
//             <div>
//                 <SideBars />
//                 <Content className="content" style={{ padding: '20px 50px'}}>
//                     <div id="bookview-content">
//                         <img className="bookview-img" src={bookinfo[1]}></img>
//                         <div id="book-details">
//                             <div id="bookview-name">{bookinfo[0]}</div>
//                             <div id="book-writer">作者：</div>
//                             <div id="book-price">价格：</div>
//                             <div id="book-intro">简介：</div>
//                         </div>
//                     </div>
//                 </Content>
//             </div>
//         </Layout>
//     );
// }
//
// export default BookView;