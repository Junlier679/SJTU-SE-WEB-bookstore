package com.example.bookstore1.repository;
import java.util.List;
import com.example.bookstore1.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItems,Integer>{
    List<OrderItems> findAll();
    OrderItems findOrderItemsById(Integer Id);
}