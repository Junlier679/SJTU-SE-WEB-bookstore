package com.example.demo_book;

import com.example.demo_book.BookDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public List<Book> findAll() {
        return bookDao.findAll();
    }

    @Override
    public List<Book> findBookByName(String bookname){
        return bookDao.findBookByName( bookname);
    };

    @Override
    public Book findBookById(Integer Id){
        return bookDao.findBookById(Id);
    };

}

