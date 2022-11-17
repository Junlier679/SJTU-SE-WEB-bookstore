package com.example.demo_book;

import com.alibaba.fastjson.JSONArray;
import com.example.demo_book.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public List<Book> findBookByName(String bookname){
        List<Book> books = new ArrayList<Book>();
        Book book = null;
        books =  bookRepository.findBookByName(bookname);
        return books;
    };

    @Override
    public Book findBookById(Integer Id){
        return bookRepository.findBookById(Id);
    };

}

