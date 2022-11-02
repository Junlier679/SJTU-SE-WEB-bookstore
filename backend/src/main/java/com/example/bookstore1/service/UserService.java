package com.example.bookstore1.service;
import  com.example.bookstore1.entity.User;
import java.util.List;
public interface UserService {
    List<User>findAll();
    String save(String username,String password,String emailaddress);
    User findUserbyName(String username);
    void validsave(User user);
}
