package com.example.bookstore1.repository;
import java.util.List;

import com.example.bookstore1.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {


    List<User>findAll();
    User findUserByUsername(String username);
}
