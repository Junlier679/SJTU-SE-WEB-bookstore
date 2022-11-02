package com.example.bookstore1.dao;
import com.example.bookstore1.entity.*;

import java.util.List;

public interface OrderItemDao{
    void edit(OrderItems orderItem);
    List<OrderItems> findAll();
    OrderItems findOrderItemsByID(Integer orderID);
}
