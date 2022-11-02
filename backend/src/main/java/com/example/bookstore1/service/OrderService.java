package com.example.bookstore1.service;
import java.util.List;

import com.alibaba.fastjson.JSONArray;
import  com.example.bookstore1.entity.*;

public interface OrderService {
    Order save(int user_id,double price);
    List<Order> findAll();
//    List<Order> findOrderByOrderID(Integer orderID);
    void createOrder(String username, Double priceAll, JSONArray trolley);
}
