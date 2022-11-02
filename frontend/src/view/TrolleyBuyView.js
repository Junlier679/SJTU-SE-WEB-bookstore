import React from 'react';
import {Layout,Carousel} from 'antd'
import HeaderInfo from "../components/HeaderInfo";
import SideBars from "../components/SideBars"
import '../css/home.css'
//import {withCarousel} from "../components/BookCarousel";
import TrolleyList from "../components/TrolleyList";
import {createBrowserHistory} from "history";
const { Header,Content,Footer } = Layout;

var socket;
function TrolleyBuyView(){
    const username = localStorage.getItem("username");
    const trolley=JSON.parse(localStorage.getItem("trolley"));
    let priceAll = 0.0;

    function openSocket() {
        if(socket != null)return;
        var socketUrl = "ws://localhost:8080/websocket/getorderInfo/" + username;
        socket = new WebSocket(socketUrl);
        socket.onopen = function () {
            console.log("websocket open");
        };
        socket.onmessage = function(msg) {
            var serverMsg = msg.data;
            var data2 = new Array();
            data2 = serverMsg.split(",");
            let len = data2.length;
            var order = new Array();
            for(let i=0;i<len-1;i+=4){
                var tmp = new Array();
                tmp.push(data2[i]);//bookname
                tmp.push(data2[i+1]);//each price
                tmp.push(data2[i+2]);//number
                tmp.push(data2[i+3]);//price-all
                order.push(tmp);
            }
            localStorage.setItem("orderinfo",JSON.stringify(order));
            // const history = createBrowserHistory();
            // history.push({
            //         pathname:"/PaymentView",
            //     });
            // history.go();
            alert(order);
        };
        //关闭事件
        socket.onclose = function () {
            console.log("websocket shut down");
        };
        //发生了错误事件
        socket.onerror = function () {
            console.log("websocket wrong");
        }
    }
    openSocket();
    trolley.forEach(
        (key) => {
            priceAll += key[3];
        });
    localStorage.setItem("priceAll",priceAll);

    function setOrder(){
        let trolley=JSON.parse(localStorage.getItem("trolley"));
        let username = localStorage.getItem("username");

        fetch("http://localhost:8080/pay/"+trolley) .then(response =>	response.json())
            .then(data	=>	{
                if(data=="success"){
                    fetch("http://localhost:8080/createorder/"+username+"/"+priceAll+"/"+trolley , {})
                        .then((response) => response.json())
                        .then((data) => {})
                    var emptyTrolley=[];
                    localStorage.setItem("trolley",JSON.stringify(emptyTrolley));
                }else{
                    alert(data+"库存不够！");
                }
            }).catch(function	(ex)	{
            console.log('parsing	failed',	ex)
        })
    }
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
                    <input className="orderHost"
                           required="请输入联系人"
                           type="text" placeholder="联系人"></input>
                    <input className="orderHostnumber"
                           required="请输入联系人电话"
                           type="text" placeholder="联系人电话"></input>
                    <input className="orderPlace"
                           required="请输入收货地址"
                           type="text" placeholder="收货地址"></input>
                    <div className="foot-wrapper">
                        <button className="buynow" type="button" onClick={setOrder}>下订单</button>
                        <div className="payPrice">合计：{priceAll.toFixed(2)}</div>
                    </div>
                </Content>
            </div>
            <div className="payFooter"></div>
        </Layout>
    );
}

export default TrolleyBuyView;












// class ShoppingBuyView extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: this.props.showData,
//             user: "",
//             priceAll: 0.0
//         };
//     }
//
//     componentDidMount() {
//         let trolley=JSON.parse(localStorage.getItem("trolley"));
//         let username = localStorage.getItem("username");
//         let price = 0.0;
//         trolley.forEach(
//             (key) => {
//                 price += key[3];
//             }
//         )
//
//         this.setState({
//             data: trolley,
//             user: username,
//             priceAll: price
//         });
//         localStorage.setItem("priceAll",price);
//     }
//
//     setOrder(){
//         let trolley=JSON.parse(localStorage.getItem("trolley"));
//         let username = localStorage.getItem("username");
//         let priceAll=localStorage.getItem("priceAll");
//
//         fetch("http://localhost:8080/pay/"+trolley) .then(response =>	response.json())
//             .then(data	=>	{
//                 if(data=="success"){
//                     fetch("http://localhost:8080/createorder/"+username+"/"+priceAll+"/"+trolley , {})
//                         .then((response) => response.json())
//                         .then((data) => {})
//                     var emptyTrolley=[];
//                     localStorage.setItem("trolley",JSON.stringify(emptyTrolley));
//                 }else{
//                     alert(data+"库存不够！");
//                 }
//             }).catch(function	(ex)	{
//             console.log('parsing	failed',	ex)
//         })
//     }
//
//     render() {
//         return (
//             <Layout className="Layout">
//                 <header>
//                     <HeaderInfo pageName={"购物车"} />
//                 </header>
//                 <div>
//                     <SideBars />
//                     <Content className="content" style={{ padding: '0 50px'}}>
//                         <div className="home-content">
//                             <TrolleyList />
//                         </div>
//
//                         <input className="orderHost"
//                                required="请输入联系人"
//                                type="text" placeholder="联系人"></input>
//                         <input className="orderHostnumber"
//                                required="请输入联系人电话"
//                                type="text" placeholder="联系人电话"></input>
//                         <input className="orderPlace"
//                                required="请输入收货地址"
//                                type="text" placeholder="收货地址"></input>
//
//                         <div className="foot-wrapper">
//                             <button className="buynow" type="button" onClick={this.setOrder}>下订单</button>
//                             <div className="payPrice">合计：{this.state.priceAll.toFixed(2)}</div>
//                         </div>
//                     </Content>
//                 </div>
//                 <div className="payFooter">
//
//                 </div>
//             </Layout>
//         );
//     }
// }
//
// export default ShoppingBuyView;