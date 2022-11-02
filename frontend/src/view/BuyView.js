import React from 'react';
import {Layout} from 'antd'
import { useLocation } from 'react-router-dom'
import HeaderInfo from "../components/HeaderInfo";
import SideBars from "../components/SideBars"
import '../css/bookDetails.css'
import BookList from "../components/BookList";
const { Header,Content,Footer } = Layout;

class BuyView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            bookinfo: this.props.info
        }
    }

    render() {
        return (
            <Layout className="Layout">
                <header>
                    <HeaderInfo pageName={"订单详情"}/>
                </header>
                <div>
                    <SideBars />
                    <Content className="content" style={{ padding: '20px 50px'}}>
                        <div id="bookview-content">
                            <img className="bookview-img" ></img>
                            <div id="book-details">
                                <div id="bookview-name">{localStorage.getItem("name")}</div>
                                <div id="book-price">价格：{localStorage.getItem("price")}</div>
                                <input className="order-host" 
                                       required="请输入联系人"
                                       type="text" placeholder="联系人"></input>
                                <input className="order-hostnumber"
                                       required="请输入联系人电话"
                                       type="text" placeholder="联系人电话"></input>
                                <input className="order-place"
                                       required="请输入收货地址"
                                       type="text" placeholder="收货地址"></input>
                                <button className="payment" type="button">购买</button>
                            </div>
                        </div>
                    </Content>
                </div>
            </Layout>
        );
    }
}

export default BuyView;