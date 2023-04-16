import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { TrendingSubjectsComponent } from '../app/components/trending-subjects/trending-subjects.component';
import { BookLibrary } from './components/book-library/book-library.component';
import { TableViewComponent } from './shared/table-view/table-view.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Open Books Library',
  },
  {
    path: 'trending-subject/:name',
    component: TrendingSubjectsComponent,
    title: 'Trending Subjects',
  },
  {
    path: 'book-library',
    component: BookLibrary,
    title: 'Book Library',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
