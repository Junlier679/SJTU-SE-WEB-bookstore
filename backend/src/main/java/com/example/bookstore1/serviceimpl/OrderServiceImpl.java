package com.example.bookstore1.serviceimpl;
import java.util.List;
import java.util.Iterator;

import com.alibaba.fastjson.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.bookstore1.service.*;
import com.example.bookstore1.entity.*;
import com.example.bookstore1.dao.*;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Calendar;
@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderDao orderDao;

    @Autowired
    private UserService userService;
    @Autowired
    private OrderItemDao orderItemDao;

    @Autowired
    private BookService bookService;

    @Override
    public Order save(int user_id,double price) {
        Order order=new Order();
        order.setUser_id(user_id);
        order.setPrice(price);
        String date=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
        order.setTime(date);
        return orderDao.save(order);
    }

    @Override
    public List<Order> findAll() {
        return orderDao.findAll();
    }

//    @Override
//    public List<Order> findOrderByOrderID(Integer orderID) {
//        return orderDao.findOrderByOrderID(orderID);
//    }

    @Override
    @Transactional (propagation = Propagation.REQUIRED)
    public void createOrder(String username, Double priceAll, JSONArray trolley) {
        User user=userService.findUserbyName(username);
        int user_id=user.getId();
        Order order = new Order();
        order.setPrice(priceAll);
        order.setUser_id(user_id);
        try{
            orderDao.save(order);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        int orderID = order.getOrder_id();
        Integer len=trolley.size();
        for(Integer i=0;i<len;i+=4){
            List<Book> books=bookService.findBookByName(trolley.getString(i));
            Iterator<Book> it = books.iterator();
            Book book = (Book) it.next();
            OrderItems orderItem = new OrderItems();
            orderItem.setOrderID(orderID);
            orderItem.setItemsID(book.getId());
            orderItem.setNumber(trolley.getInteger(i+2));
            orderItemDao.edit(orderItem);
        }
        System.out.println(order.getOrder_id());
    }

}
