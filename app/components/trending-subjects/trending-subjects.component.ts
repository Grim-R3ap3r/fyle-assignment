import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from '../../core/models/book-response.model';
import { Location } from '@angular/common';

@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})
export class TrendingSubjectsComponent implements OnInit {
  // @Input() loading: boolean = false;
 isLoading: boolean = false;

  subjectName: string = '';

  allBooks: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
    private location: Location
  ) {}

  //implementation of back button using location.back()
  goBack() {
    this.location.back();
  }

  //getALLBooks() uses subjectService Services to get all the books from api
  getAllBooks() {
    this.subjectsService.getAllBooks(this.subjectName).subscribe((data) => {
      this.allBooks = data?.works;
      this.isLoading = true;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      // this.isLoading = false;
      this.getAllBooks();
    });
  }
}
