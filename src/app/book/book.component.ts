import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public bookList: Array<Book> = [];
  public bookForm: FormGroup;
  private bookId: number = 0;

  constructor(private httpCl: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getBookList();
  }

  initializeForm() {
    this.bookForm = this.formBuilder.group({
      'name': [''],
      'author': [''],
      'count': ['']
    });
  }

  getBookList() {
    this.httpCl.get("api/book")
      .subscribe(
        (resp: Array<Book>) => {
          this.bookList = resp;
        },
        err => {
          alert(err);
        }
      )
  }

  saveBook() {
    this.httpCl.post("api/book", this.bookForm.value)
      .subscribe(resp => {
        this.getBookList();
      }, err => {
        alert(err);
      });
  }

  editBook(bookObj: Book) {
    this.bookForm.get("name").setValue(bookObj.name);
    this.bookForm.get("author").setValue(bookObj.author);
    this.bookForm.get("count").setValue(bookObj.count);
    this.bookId = bookObj.id;
  }

  updatetBook() {
    this.httpCl.put("api/book/" + this.bookId, this.bookForm.value)
      .subscribe(resp => {
        this.getBookList();
      }, err => {
        alert(err);
      });
  }

  deleteBook(id: number) {
    this.httpCl.delete("api/book/" + id)
      .subscribe(resp => {
        this.getBookList();
      },
        err => {
          this.getBookList();
        });
  }

}
