import React from 'react'
import {Link} from 'react-router-dom'
import '../css/home.css'
import {createBrowserHistory} from "history";

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderID: this.props.orderID,
            userid: this.props.userid,
            orderTime: "",
            username: "",
            priceAll: 0.0
        }
        this.handleJump=this.handleJump.bind(this);
    }

    componentWillMount() {
        fetch("http://localhost:8080/getOrderDetails/"+this.state.orderID,{})
            .then(response	=>	response.json())
            .then(data	=>	{
                this.setState({
                    userid: data[0][1],
                    priceAll: data[1][0],
                    orderTime: data[2][0]
                });
            }).catch(function	(ex)	{
            console.log('parsing	failed',	ex)
        })
    }
    componentDidMount() {
        fetch("http://localhost:8080/getUsername/"+this.state.userid,{})
            .then(response	=>	response.json())
            .then(data	=>	{
                this.setState({
                    username: data
                });
            }).catch(function	(ex)	{
            console.log('parsing	failed',	ex)
        })
    }

    handleJump = () => {
        const history = createBrowserHistory();
        history.push({pathname:"../orderDetails"});
        localStorage.setItem("orderID",this.state.orderID);
        localStorage.setItem("orderPrice",this.state.priceAll);
        history.go();
        return;
    }

    render() {
        return (
            <div className="booklink" onClick={this.handleJump}>
                <div id="order">
                    <div id="orderId">订单{this.state.orderID}</div>
                    <div id="orderPrice">用户：{this.state.username}</div>
                    <div id="orderPrice">合计：{this.state.priceAll}</div>
                    <div id="orderPrice">下单时间：{this.state.orderTime}</div>
                </div>
            </div>
        );
    }
}

export default Order;