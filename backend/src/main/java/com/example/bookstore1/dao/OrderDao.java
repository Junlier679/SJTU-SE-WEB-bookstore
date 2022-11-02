package com.example.bookstore1.dao;
import com.example.bookstore1.entity.*;

import java.util.List;
public interface OrderDao{
    Order save(Order order);
    List<Order> findAll();
//    List<Order> findOrderByOrderID(Integer orderID);
}
