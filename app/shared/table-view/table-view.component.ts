import {
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Book } from '../../core/models/book-response.model';
import { SubjectsService } from '../../core/services/subjects.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'front-end-internship-assignment-table-view ',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() booksList: Book[] = [];
  @Input() foundBooks: Book[] = [];
  @Input() subjectName: string = '';
  @Input() loading: boolean = false;
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  private subjectName$: Subject<string> = new Subject();
  private destroy$: Subject<void> = new Subject();
  itemsPerPage: number = 10;
  // Pagination variables

  // currentPage: number = 1; // current page number
  constructor(private subjectsService: SubjectsService) {}

  //using ngONChanges To Check the change in searched value
  ngOnChanges(changes: SimpleChanges): void {
    // Check if subjectName property has changed
    if (changes.hasOwnProperty('subjectName')) {
      const updatedValue = changes['subjectName'].currentValue;
      // Perform actions when subjectName changes
      this.currentPage = 1;
      // Replace the above line with your desired logic
      // Emit the updated value of subjectName to the observable
      this.subjectName$.next(updatedValue);
    }
  }
  nextPage() {
    //to navigate to next page
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      const tempPage = this.currentPage % 10 === 0 ? 10 : this.currentPage % 10;
      this.booksList = this.foundBooks.slice(
        (tempPage - 1) * this.itemsPerPage,
        tempPage * this.itemsPerPage
      );
    }
    if (this.currentPage % 10 == 1) {
      this.searchBooks();
    }
  }
  prevPage() {
    //to navigate to the previous page
    if (this.currentPage > 1) {
      this.currentPage--;
      const tempPage = this.currentPage % 10 === 0 ? 10 : this.currentPage % 10;
      this.booksList = this.foundBooks.slice(
        (tempPage - 1) * this.itemsPerPage,
        tempPage * this.itemsPerPage
      );
    }
  }

  // searchBoooks uses subjectService to retrieve data from the api database and storing it in bookLists
  searchBooks() {
    const page = Math.ceil((this.currentPage * this.itemsPerPage) / 100);

    this.subjectsService
      .getSearchResults(this.subjectName, page)
      .subscribe((response) => {
      
        this.loading = true;
        this.foundBooks = response.docs;
        if (this.currentPage % 100 == 1) {
          this.booksList = this.foundBooks.slice(
            ((this.currentPage % 10) - 1) * this.itemsPerPage,
            (this.currentPage % 10) * this.itemsPerPage
          );
        }
      });
  }
}
