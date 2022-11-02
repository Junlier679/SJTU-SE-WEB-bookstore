package com.example.bookstore1.service;
import  com.example.bookstore1.entity.Book;
import java.util.List;

public interface BookService {
    List<Book> findAll();
    List<Book> findBookByName(String bookname);
    void edit(Book book,String oldname);
    void delete(Book book);
    Book findBookById(Integer Id);
}
