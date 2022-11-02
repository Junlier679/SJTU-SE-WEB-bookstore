import React from 'react'
import {Menu,Layout,Icon} from 'antd'
import {history} from "../utils/history";
import '../css/index.css'
import Bookslogo from "../pictures/books.jpg"
import ShoppingTrolley from "../pictures/shoppingtrolley.jpg"
import Order from "../pictures/order.jpg"

const { SubMenu } = Menu;
const { Sider } = Layout;

class SideBars extends React.Component {
    render() {
        return (
            <div id="sidebars">
                <a href={"/homeView"}>
                    <div id="Asidebar">
                        <img className="sidebar-logo" src={Bookslogo} />
                        <div id="sidebar-name">书籍浏览</div>
                    </div>
                </a>
                <a href={"/shoppingtrolley"}>
                    <div id="Asidebar">
                        <img className="sidebar-logo" src={ShoppingTrolley} />
                        <div id="sidebar-name">购物车</div>
                    </div>
                </a>
                <a href={"/orderView"}>
                    <div id="Asidebar">
                        <img className="sidebar-logo" src={Order} />
                        <div id="sidebar-name">我的订单</div>
                    </div>
                </a>
            </div>
        );
    }
}

export default SideBars;