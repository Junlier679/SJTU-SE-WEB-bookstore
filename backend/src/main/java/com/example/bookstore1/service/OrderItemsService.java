package com.example.bookstore1.service;
import java.util.List;
import  com.example.bookstore1.entity.*;

public interface OrderItemsService {
    void edit(OrderItems orderItem);
    List<OrderItems> findAll();
    OrderItems findOrderItemsByID(Integer itemID);
}
