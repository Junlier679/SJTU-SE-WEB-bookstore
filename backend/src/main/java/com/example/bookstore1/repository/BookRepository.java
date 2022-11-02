package com.example.bookstore1.repository;
import java.util.List;
import com.example.bookstore1.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,Integer> {

    List<Book> findAll();
    List<Book> findBookByName(String bookname);
    Book findBookById(Integer Id);
}