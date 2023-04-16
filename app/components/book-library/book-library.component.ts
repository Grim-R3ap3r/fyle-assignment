import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableViewComponent } from 'src/app/shared/table-view/table-view.component';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.scss'],
})
export class BookLibrary implements OnInit {
  li: any;
  lis = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://openlibrary.org/search.json?author=tolkien&sort=new')
      .subscribe((Response) => {
        // If response comes hideloader() function is called
        // to hide that loader
        console.log(Response);
        if (Response) {
          hideloader();
        }
        this.li = Response;
        this.lis = this.li.list;
      });
    function hideloader() {
      // console.log(document.getElementById('loading'), 'loading');
    }
  }
}
// The url of api is passed to get() and then subscribed and
// stored the response to li element data array list[] is created
// using JSON element property
