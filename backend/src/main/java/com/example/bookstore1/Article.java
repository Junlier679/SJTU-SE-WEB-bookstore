package com.example.bookstore1;
import lombok.Data;

@Data
public class Article {
    private Integer id;
    private String name;
    private String author;
    private String content;
}