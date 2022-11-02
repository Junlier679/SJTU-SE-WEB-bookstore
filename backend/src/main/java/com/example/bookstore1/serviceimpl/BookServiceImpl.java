package com.example.bookstore1.serviceimpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.bookstore1.service.BookService;
import com.example.bookstore1.entity.Book;
import com.example.bookstore1.dao.BookDao;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public List<Book> findAll() {
        return bookDao.findAll();
    }

    @Override
    public List<Book> findBookByName(String bookname){
        return bookDao.findBookByName( bookname);
    };

    @Override
    public void edit(Book book,String oldname){bookDao.edit(book,oldname);}

    @Override
    public void delete(Book book){bookDao.delete(book);}

    @Override
    public Book findBookById(Integer Id){
        return bookDao.findBookById(Id);
    };

}

