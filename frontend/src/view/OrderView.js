import React from 'react';
import {Layout,Carousel} from 'antd'
import HeaderInfo from "../components/HeaderInfo";
import SideBars from "../components/SideBars"
import '../css/home.css'
import OrderList from "../components/OrderList";
const { Header,Content,Footer } = Layout;

class OrderView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        };
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }

    render() {
        return (
            <Layout className="Layout">
                <header>
                    <HeaderInfo pageName={"我的订单"} />
                </header>
                <div>
                    <SideBars />
                    <Content className="content" style={{ padding: '0 50px'}}>
                        <OrderList />
                    </Content>
                </div>
            </Layout>
        );
    }
}

export default OrderView;