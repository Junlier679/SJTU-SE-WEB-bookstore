import React from 'react';
import Order from './Order';
import '../css/home.css'

const initialData = [];

class OrderList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: initialData,
            searchtext: ""
        };
        this.getOrders=this.getOrders.bind(this);
        this.search=this.search.bind(this);
    }

    getOrders =	()	=>	{
        fetch("http://localhost:8080/getOrders",{method: 'get'})
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

    search = (e) => {
        let needle = e.target.value;
        this.setState({searchtext: needle});
    }

    render() {
        return (
            <div className="trolleylist">
                <div id="searching">
                    <input type="text" className="search-input" placeholder="查询订单"
                           value={this.state.searchtext} onChange={this.search}>
                    </input>
                    <button className="search-button"></button>
                </div>
                {this.state.data.map(function(aOrder,orderId){
                    if(aOrder[0].toString().indexOf(this.state.searchtext) > -1)
                        return(<Order orderID={aOrder[0]} userid={aOrder[1]}/>);
                    },this)}
            </div>
        );
    }
}

export default OrderList;