import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from '../models/book-response.model';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor(private apiService: ApiService) {}

  getAllBooks(subjectName: string): Observable<BookResponse> {
    const limit = 10;
   
    return this.apiService.get(
      `/subjects/${subjectName
        .toLowerCase()
        .split(' ')
        .join('_')}.json?limit=${limit}`
    );
  }

  getSearchResults(subjectName: string, page: number): Observable<any> {
    // const limit = 10;
  
    return this.apiService.get(
      `/search.json?q=${subjectName
        .toLowerCase()
        .split(' ')
        .join('+')}&page=${page}`
    );
  }

}
