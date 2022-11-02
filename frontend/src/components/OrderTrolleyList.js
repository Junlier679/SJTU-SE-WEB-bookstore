import React from 'react';
import TrolleyBook from './TrolleyBook';
import '../css/home.css'
import OrderItem from "./OrderItem";

const initialData = [];

class OrderTrolleyList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: initialData,
            orderID: this.props.orderID
        };
        this.getOrders=this.getOrders.bind(this);
    }

    getOrders =	()	=>	{
        fetch("http://localhost:8080/getOrderItems/"+this.state.orderID,{})
            .then(response	=>	response.json())
            .then(data	=>	{
                this.setState({
                    data: data
                });
            }).catch(function	(ex)	{
            console.log('parsing	failed',	ex)
        })
    }

    componentWillMount() {
        this.getOrders();
    }

    render() {
        return (
            <div className="booktable">
                <div className="trolleylist">
                    {this.state.data.map(function(aItem,itemId){
                        return(<OrderItem itemID={aItem}/>);
                    },this)}
                </div>
            </div>
        );
    }
}

export default OrderTrolleyList;