package com.example.bookstore1.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.bookstore1.Article;
import com.example.bookstore1.util.LuceneUtil;
import java.util.List;

@RestController
public class IndexController {

    @PostMapping("/add")
    public String add(Article article) {
        try {
            LuceneUtil.index(article);
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @PostMapping("/delete")
    public String delete(Integer id) {
        try {
            LuceneUtil.delete(id);
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @PostMapping("/update")
    public String update(Article article) {
        try {
            LuceneUtil.update(article);
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @PostMapping("/search")
    public List<Article> search(String keyword) {
        try {
            return LuceneUtil.search(keyword);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}