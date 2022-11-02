package com.example.bookstore1.daoimpl;
import com.alibaba.fastjson.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.bookstore1.dao.BookDao;
import com.example.bookstore1.entity.Book;
import com.example.bookstore1.util.RedisUtil;
import java.util.ArrayList;
import java.util.List;
import com.example.bookstore1.repository.BookRepository;

@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    RedisUtil redisUtil;

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
        System.out.println("Searching Book: " + bookname + " in Redis");
        Object p = redisUtil.get("book" + bookname);
        if (p == null) {//not in redis
            System.out.println("Book: " + bookname + " is not in Redis");
            System.out.println("Searching book: " + bookname + " in DB");
            books =  bookRepository.findBookByName(bookname);
            redisUtil.set("book" + bookname, JSONArray.toJSON(books.get(0)));
        }else{
            book = JSONArray.parseObject(p.toString(), Book.class);
            System.out.println("Book: " + bookname + " is in Redis");
            books.add(book);
        }
        return books;
    };

    @Override
    public void edit(Book book,String oldname){
        System.out.println("edit book: "+oldname+" in Redis");
        redisUtil.del(oldname);
        redisUtil.set("book" + book.getName(), JSONArray.toJSON(book));
        bookRepository.save(book);
    }

    @Override
    public void delete(Book book){
        System.out.println("delete book: "+book.getName()+" in Redis");
        redisUtil.del(book.getName());
        bookRepository.delete(book);
    }

    @Override
    public Book findBookById(Integer Id){
        return bookRepository.findBookById(Id);
    };

}

