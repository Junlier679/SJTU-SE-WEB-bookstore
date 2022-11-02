import React from 'react';
import {Layout,Carousel} from 'antd'
import HeaderInfo from "../components/HeaderInfo";
import SideBars from "../components/SideBars"
import '../css/home.css'
//import {withCarousel} from "../components/BookCarousel";
import TrolleyList from "../components/TrolleyList";
import {Link} from "react-router-dom";
const { Header,Content,Footer } = Layout;

class ShoppingTrolleyView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.showData,
            user: "",
            priceAll: 0.0
        };
    }

    componentDidMount() {
        let trolley=JSON.parse(localStorage.getItem("trolley"));
        let user = localStorage.getItem("user");
        let price = 0.0;
        trolley.forEach(
            (key) => {
                price += key[3];
            }
        )

        this.setState({
            data: trolley,
            user: user,
            priceAll: price
            });
    }

    render() {
        return (
            <Layout className="Layout">
                <header>
                    <HeaderInfo pageName={"购物车"} />
                </header>
                <div>
                    <SideBars />
                    <Content className="content" style={{ padding: '0 50px'}}>
                        <div className="home-content">
                            <TrolleyList />
                        </div>
                        <div className="buyer">
                            <Link to="/trolleyBuyView">
                                <button className="buynow" type="button">购买</button>
                            </Link>
                            <div className="payPrice">合计：{this.state.priceAll.toFixed(2)}</div>
                        </div>
                    </Content>
                </div>
                <div className="payFooter">

                </div>
            </Layout>
        );
    }
}

export default ShoppingTrolleyView;
