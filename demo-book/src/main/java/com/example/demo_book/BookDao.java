package com.example.demo_book;

import java.util.List;

public interface BookDao {
    List<Book> findAll();
    List<Book> findBookByName(String bookname);
    Book findBookById(Integer Id);
}
