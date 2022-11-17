package com.example.demo_book;

import java.util.List;

public interface BookService {
    List<Book> findAll();
    List<Book> findBookByName(String bookname);
    Book findBookById(Integer Id);
}
