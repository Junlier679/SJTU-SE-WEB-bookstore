package com.example.bookstore1.dao;
import com.example.bookstore1.entity.Book;

import java.util.List;

public interface BookDao {
    List<Book> findAll();
    List<Book> findBookByName(String bookname);
    void edit(Book book,String oldname);
    void delete(Book book);
    Book findBookById(Integer Id);
}
