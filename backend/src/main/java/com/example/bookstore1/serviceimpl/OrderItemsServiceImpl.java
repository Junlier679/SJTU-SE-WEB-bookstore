package com.example.bookstore1.serviceimpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.bookstore1.service.*;
import com.example.bookstore1.entity.*;
import com.example.bookstore1.dao.*;
@Service

public class OrderItemsServiceImpl implements OrderItemsService{
    @Autowired
    private OrderItemDao orderItemDao;

    @Override
    public List<OrderItems> findAll() {
        return orderItemDao.findAll();
    }

    @Override
    public void edit(OrderItems orderItem){orderItemDao.edit(orderItem);}

    @Override
    public OrderItems findOrderItemsByID(Integer itemID){
        return orderItemDao.findOrderItemsByID(itemID);
    };
}
