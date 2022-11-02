package com.example.bookstore1.daoimpl;
import com.example.bookstore1.dao.OrderItemDao;
import com.example.bookstore1.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.bookstore1.repository.OrderItemRepository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public class OrderItemDaoImpl implements OrderItemDao {
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public List<OrderItems> findAll() {
        return orderItemRepository.findAll();
    }

    @Override
    public void edit(OrderItems orderItem){
        orderItemRepository.save(orderItem);
    }

    @Override
    public OrderItems findOrderItemsByID(Integer itemID){
        return orderItemRepository.findOrderItemsById(itemID);
    }
}
