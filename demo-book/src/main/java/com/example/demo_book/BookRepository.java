package com.example.demo_book;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {

    List<Book> findAll();
    List<Book> findBookByName(String bookname);
    Book findBookById(Integer Id);
}