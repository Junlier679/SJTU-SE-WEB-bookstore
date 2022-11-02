package com.example.bookstore1.daoimpl;
import com.example.bookstore1.dao.OrderDao;
import com.example.bookstore1.entity.*;
import com.example.bookstore1.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public Order save(Order order) {
        orderRepository.save(order);
        return order;
    }

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

//    @Override
//    public List<Order> findOrderByOrderID(Integer orderID){
//        return orderRepository.findOrderByOrder_id(orderID);
//    };
}
