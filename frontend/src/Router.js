import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomeView from "./view/HomeView";
import LoginView from './view/LoginView';
import BookView from './view/BookView';
import BuyView from './view/BuyView';
import ShoppingTrolleyView from "./view/ShoppingTrolleyView";
import TrolleyBuyView from "./view/TrolleyBuyView";
import OrderView from "./view/OrderView";
import OrderDetails from "./view/OrderDetails";
import AdministratorView from "./view/AdministratorView"
import AdminUsers from "./view/adminUsers";
import AdminBooks from "./view/adminBooks";
import AdminOrders from "./view/adminOrders";
import AdminStats from "./view/adminStats";
import RegisterView from "./view/RegisterView";
const data = [];

class BasicRoute extends React.Component{
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/login" element={<LoginView />} />
                    <Route path="/registerView" element={<RegisterView />} />
                    <Route path="/homeView" element={<HomeView pageType={"书籍浏览"}/>} />
                    <Route path="/shoppingTrolley" element={<ShoppingTrolleyView />} />
                    <Route path="/bookView" element={<BookView info={data[0]}/>} />
                    <Route path="/buyView" element={<BuyView info={data[0]}/>} />
                    <Route path="/trolleyBuyView" element={<TrolleyBuyView />} />
                    <Route path="/orderView" element={<OrderView />} />
                    <Route path="/orderDetails" element={<OrderDetails />} />
                    <Route path="/administratorView" element={<AdministratorView />} />
                    <Route path="/administratorView/users" element={<AdminUsers />} />
                    <Route path="/administratorView/books" element={<AdminBooks />} />
                    <Route path="/administratorView/orders" element={<AdminOrders />} />
                    <Route path="/administratorView/stats" element={<AdminStats />} />
                </Routes>
            </Router>
        );
    }
}

export default BasicRoute;
