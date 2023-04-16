import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookLibrary } from './book-library.component';

describe('BookLibrary', () => {
  let component: BookLibrary;
  let fixture: ComponentFixture<BookLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookLibrary],
    }).compileComponents();

    fixture = TestBed.createComponent(BookLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
