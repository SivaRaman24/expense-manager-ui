import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from './model/category.items';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_BASE_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  createCategory(categoryDetail: Category) {
    return this.httpClient.post(`${this.API_BASE_URL}/categories`, categoryDetail);
  }

  updateCategory(categoryDetail: Category) {
    return this.httpClient.patch(`${this.API_BASE_URL}/categories/${categoryDetail.id}`, categoryDetail);
  }

  getCategories() {
    return this.httpClient.get<Array<Category>>(`${this.API_BASE_URL}/categories`);
  }

  getCategoryDetail(id: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.API_BASE_URL}/categories/${id}`);
  }
}
