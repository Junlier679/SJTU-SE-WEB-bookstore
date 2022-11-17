package com.example.demo_book;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@Table(name="books")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "bookId")
public class Book {
    private int id;
    private String name;
    private String author;
    private double price;
    private String descriptions;
    private Integer stock;

    public Book(){};
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    @Basic
    @Column(name = "name")
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    @Basic
    @Column(name = "author")
    public String getAuthor(){return  author;}
    public void setAuthor(String author){this.author=author;}

    @Basic
    @Column(name="price")
    public double getPrice(){return price;}
    public void setPrice(double price){this.price=price;}

    @Basic
    @Column(name = "descriptions")
    public String getDescriptions(){return descriptions;}
    public void setDescriptions(String descriptions){this.descriptions=descriptions;}

    @Basic
    @Column(name = "stock")
    public Integer getStock(){return stock;}
    public void setStock(Integer stock){this.stock=stock;}
}
