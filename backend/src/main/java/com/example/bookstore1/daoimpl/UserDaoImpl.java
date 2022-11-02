package com.example.bookstore1.daoimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.bookstore1.dao.UserDao;
import com.example.bookstore1.entity.User;
import java.util.List;
import com.example.bookstore1.repository.UserRepository;


@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void save( User user){
        userRepository.save(user);};

    @Override
    public User findUserbyName(String username){
        return userRepository.findUserByUsername(username);
    };

}
