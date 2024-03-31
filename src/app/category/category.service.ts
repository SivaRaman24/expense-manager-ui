import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Category } from './model/category.items';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_BASE_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  createCategory() {}

  updateCategory() {}

  getCategories() {
    return this.httpClient.get<Array<Category>>(`${this.API_BASE_URL}/categories`);
    // .pipe(
    //   catchError((error) => {
    //     throw error;
    //   }),
    // );
  }

  getCategoryDetail(id: string) {}
}
