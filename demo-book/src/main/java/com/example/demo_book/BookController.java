package com.example.demo_book;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.serializer.SerializerFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo_book.BookService;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo_book.Book;
import com.example.demo_book.DTO.ResultDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


@Slf4j
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

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

    @RequestMapping("/getAuthor")
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
}
