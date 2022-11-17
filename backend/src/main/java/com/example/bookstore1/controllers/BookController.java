package com.example.bookstore1.controllers;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.serializer.SerializerFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.bookstore1.service.BookService;
import org.springframework.web.bind.annotation.RestController;
import com.example.bookstore1.entity.Book;
import com.example.bookstore1.DTO.ResultDTO;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/")
    @ResponseBody
    public String findAll(){
        List<Book> books = bookService.findAll();
        //return JSONArray.fromObject(books);

        Iterator<Book> it = books.iterator();

        ArrayList<com.alibaba.fastjson.JSONArray> booksJson = new ArrayList<com.alibaba.fastjson.JSONArray>();
        while (it.hasNext()) {
            Book book = (Book) it.next();
            ArrayList<String> arrayList = new ArrayList<String>();
            arrayList.add(book.getName());
            booksJson.add((com.alibaba.fastjson.JSONArray) JSONArray.toJSON(arrayList));

        }
        String  booksString = JSON.toJSONString(booksJson, SerializerFeature.BrowserCompatible);
        return booksString;

    }

    @GetMapping(value="/getDetail/{bookname}")
    @ResponseBody
    public String findbyName(@PathVariable String bookname){
        List<Book> books = bookService.findBookByName( bookname);
        Iterator<Book> it = books.iterator();
        ArrayList<com.alibaba.fastjson.JSONArray> booksJson = new ArrayList<com.alibaba.fastjson.JSONArray>();
        while (it.hasNext()) {
            Book book = (Book) it.next();
            ArrayList<String> arrayList = new ArrayList<String>();
            arrayList.add(book.getName());
            arrayList.add(book.getAuthor());
            arrayList.add(book.getDescriptions());
            ArrayList<Double> arrayListprice = new ArrayList<Double>();
            arrayListprice.add(book.getPrice());
            ArrayList<Integer>arrayListstock=new ArrayList<Integer>();
            arrayListstock.add(book.getStock());
            booksJson.add((com.alibaba.fastjson.JSONArray) JSONArray.toJSON(arrayList));
            booksJson.add((com.alibaba.fastjson.JSONArray) JSONArray.toJSON(arrayListprice));
            booksJson.add((com.alibaba.fastjson.JSONArray) JSONArray.toJSON(arrayListstock));
        }
        String  booksString = JSON.toJSONString(booksJson, SerializerFeature.BrowserCompatible);
        return booksString;
    }

    @RequestMapping("/getWriter")
    public ResultDTO findWriterByName(@RequestHeader("userName") String userName,
                                   @RequestParam("bookName") String bookName){
        log.info("userName: {}, bookName: {}", userName, bookName);
        List<Book> books = bookService.findBookByName(bookName);
        Iterator<Book> it = books.iterator();
        if(it.hasNext()){
            Book book = (Book) it.next();
            return ResultDTO.success(String.format("userName: %s, bookName: %s, bookAuthor: %s", userName, bookName, book.getAuthor()));
        }
        return ResultDTO.error("default");
    }

    @GetMapping(value="/edit/{oldname}/{bookname}/{bookauthor}/{bookprice}/{bookdescriptions}/{bookstock}")
    @ResponseBody
    public void Edit(@PathVariable String oldname,@PathVariable String bookname,@PathVariable String bookauthor,@PathVariable Double bookprice,@PathVariable String bookdescriptions,@PathVariable Integer bookstock){
        List<Book> books=bookService.findBookByName(oldname);
        Iterator<Book> it = books.iterator();
        Book book = (Book) it.next();
        book.setName(bookname);
        book.setAuthor(bookauthor);
        book.setPrice(bookprice);
        book.setDescriptions(bookdescriptions);
        book.setStock(bookstock);
        bookService.edit(book,oldname);
        return;
    }

    @GetMapping(value="/newbook/{bookname}/{bookauthor}/{bookprice}/{bookdescriptions}/{bookstock}")
    @ResponseBody
    public void Addbook(@PathVariable String bookname,@PathVariable String bookauthor,@PathVariable Double bookprice,@PathVariable String bookdescriptions,@PathVariable Integer bookstock){
        Book book=new Book();
        book.setName(bookname);
        book.setAuthor(bookauthor);
        book.setPrice(bookprice);
        book.setDescriptions(bookdescriptions);
        book.setStock(bookstock);
        bookService.edit(book,"new book");
        return;
    }

    @GetMapping(value="/deletebook/{bookname}/{bookauthor}/{bookprice}/{bookdescriptions}")
    @ResponseBody
    public String Deletebook(@PathVariable String bookname,@PathVariable String bookauthor,@PathVariable Double bookprice,@PathVariable String bookdescriptions){
        List<Book> books = bookService.findBookByName( bookname);
        if(books.isEmpty()){
            String message="不存在此书";
            return  JSON.toJSONString(message);
        }
        else{
            Iterator<Book> it = books.iterator();
            Book book = (Book) it.next();
            bookService.delete(book);
            String message="已删除";
            return JSON.toJSONString(message);

        }
    }


    @GetMapping(value="/pay/{trolley}")
    @ResponseBody
    public String Payhandle(@PathVariable JSONArray trolley){
        Integer len=trolley.size();
        for(Integer i=0;i<len;i+=4){
            List<Book> books=bookService.findBookByName(trolley.getString(i));
            Iterator<Book> it = books.iterator();
            Book book = (Book) it.next();
            Integer newstock=book.getStock()-trolley.getInteger(i+2);
            if(newstock<0){
                return JSON.toJSONString(book.getName());
            }
            else{
                book.setStock(newstock);
                bookService.edit(book,book.getName());
            }
        }
        String messsage="success";
        return JSON.toJSONString(messsage);

    }
}