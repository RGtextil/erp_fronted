import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../interfaces/producto'
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    private apiUrl = 'http://localhost:8000/api/logistica';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/producto/`);
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/producto/${id}/`);
  }

  create(data: Producto): Observable<Producto> {
    return this.http.post<Producto>( `${this.apiUrl}/producto/`, data);
  }

  update(id: number, data: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/producto/${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/producto/${id}/`);
  }
}
