import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public bookList: Array<Book> = [
    {
      id: 1,
      name: "Operatinge System",
      author: "Galvin",
      count: 5
    },
    {
      id: 2,
      name: "JAVA",
      author: "Herbert",
      count: 1
    },
    {
      id: 3,
      name: "Angular",
      author: "Angular University",
      count: 2
    }
  ];

  constructor(private httpCl: HttpClient) { }

  ngOnInit(): void {
    this.getBookList();
  }

  clickEventFn() {
    alert('In Handler');
  }


  getBookList() {
    this.httpCl.get("api/book")
      .subscribe(
        resp => {
          debugger
        },
        err => {
          debugger
        }
      )
  }

}
