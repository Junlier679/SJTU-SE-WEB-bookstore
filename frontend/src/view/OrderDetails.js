import React from 'react';
import {Layout,Carousel} from 'antd'
import HeaderInfo from "../components/HeaderInfo";
import SideBars from "../components/SideBars"
import '../css/home.css'
import OrderTrolleyList from "../components/OrderTrolleyList";
import {Link} from "react-router-dom";
const { Header,Content,Footer } = Layout;

class OrderDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            orderID: 0,
            priceAll: 0.0
        };
    }

    componentWillMount() {
        let id = localStorage.getItem("orderID");
        let price = localStorage.getItem("orderPrice");
        this.setState({
            orderID: id,
            priceAll: price
        });
    }

    render() {
        return (
            <Layout className="Layout">
                <header>
                    <HeaderInfo pageName={"订单详情"} />
                </header>
                <div>
                    <SideBars />
                    <Content className="content" style={{ padding: '0 50px'}}>
                        <div className="home-content">
                            <OrderTrolleyList orderID={this.state.orderID}/>
                        </div>
                        <div className="buyer">
                            <div className="payPrice">合计：{this.state.priceAll}</div>
                        </div>
                    </Content>
                </div>
                <div className="payFooter">

                </div>
            </Layout>
        );
    }
}

export default OrderDetails;