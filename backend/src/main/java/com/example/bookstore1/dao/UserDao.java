package com.example.bookstore1.dao;
import com.example.bookstore1.entity.User;

import java.util.List;
public interface UserDao {

    List<User>findAll();
    void save( User user);
    User findUserbyName(String username);


}
