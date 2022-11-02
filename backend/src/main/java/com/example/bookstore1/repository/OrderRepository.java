package com.example.bookstore1.repository;
import java.util.List;
import com.example.bookstore1.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Integer>{
    List<Order> findAll();
//    List<Order> findOrderByOrder_id(Integer orderID);
}