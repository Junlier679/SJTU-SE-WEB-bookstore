package com.example.bookstore1.serviceimpl;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.bookstore1.service.UserService;
import com.example.bookstore1.entity.User;
import com.example.bookstore1.dao.UserDao;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public  String save(String username,String password,String emailaddress){
        if(username.equals(""))return "NullUsername";
        if(password.equals(""))return "NullPassword";
        List<User> users=userDao.findAll();
        Iterator<User> it = users.iterator();
        while (it.hasNext()) {
            User user = (User) it.next();
            if(username.equals(user.getUsername())){
                return "User name already exists";
            }}
        User user=new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmailaddress(emailaddress);
        user.setValid("valid");
        userDao.save(user);
        return "success";
    };


    @Override
    public  User findUserbyName(String username){
        return userDao.findUserbyName(username);
    }

    @Override
    public void validsave(User user){
        userDao.save(user);
    }

}
