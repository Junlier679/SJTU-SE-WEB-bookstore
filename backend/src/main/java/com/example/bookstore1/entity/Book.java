package com.example.bookstore1.entity;
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




//public class Book {
//    private String id;
//    private String name;
//    private String type;
//    private String author;
//    private String price;
//    private String description;
//
//    public Book(String id,String name,String type,String author,String price,String description)
//    {
//        this.id = id;
//        this.name = name;
//        this.type = type;
//        this.author = author;
//        this.price = price;
//        this.description = description;
//    }
//
//    public String getId(){return id;}
//    public void setId(String id){this.id = id;}
//
//    public String getName(){return name;}
//    public void setName(String name){this.name = name;}
//
//    public String getType(){return type;}
//    public void setType(String type){this.type = type;}
//
//    public String getAuthor(){return author;}
//    public void setAuthor(String author){this.author = author;}
//
//    public String getPrice(){return price;}
//    public void setPrice(String price){this.price = price;}
//
//    public String getDescription(){return description;}
//    public void setDescription(String description){this.description = description;}
//
//    @Override
//    public String toString()
//    {
//        return String.format(
//            "Book[id='%s', name='%s', type='%s', author='%s', price='%s', description='%s']",
//            id,name,type,author,price,description
//        );
//    }
//}
