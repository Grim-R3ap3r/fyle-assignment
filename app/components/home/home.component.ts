import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../core/models/book-response.model';
import { BookResponse } from '../../core/models/book-response.model';
import { SubjectsService } from '../../core/services/subjects.service';

import { Input } from '@angular/core';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl = new FormControl('');
  li: any;
  urlApi: string;
  finalString: string;
  lis = [];
  public subjectName = '';
  public foundBooks: Book[] = [];
  currentPageBooks: Book[] = [];
  public loading = true;
  inputValue: string = '';
  totalPages: number = 0;
  currentPage: number = 1;
  page: number = 1;
  itemsPerPage: number = 10;
  constructor(
    private http: HttpClient,
    private subjectsService: SubjectsService
  ) {
    this.bookSearch = new FormControl('');
    this.urlApi = 'https://openlibrary.org/search.json?q=';
    this.foundBooks = [];
    this.finalString = '';
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  onClearSearch() {
    this.inputValue = '';
  }
  getSearchResults(
    subjectName: string,
    currentPage: number,
    itemsPerPage: number
  ) {
    this.subjectsService
      .getSearchResults(this.subjectName, 1)
      .subscribe((response) => {
      
        this.loading = true;
        // If response comes hideloader() function is called
        // to hide that loader
        this.foundBooks = response.docs;
        this.currentPageBooks = this.foundBooks.slice(
          (this.currentPage - 1) * this.itemsPerPage,
          this.currentPage * this.itemsPerPage
        );

        this.totalPages = Math.ceil(response.numFound / this.itemsPerPage);
      
      });
  }
  ngOnInit(): void {
    this.bookSearch.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.currentPage = 1;
      this.subjectName = value;
      if (!this.subjectName.length) {
        this.foundBooks = [];
        this.loading = true;
      } else {
        this.loading = false;

        // Call your API service method with the search value
        this.getSearchResults(
          this.subjectName,
          this.currentPage,
          this.itemsPerPage
        );
      }
    });
  }
}
