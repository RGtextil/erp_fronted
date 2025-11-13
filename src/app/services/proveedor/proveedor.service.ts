import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedor } from '../../interfaces/proveedor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

    private apiUrl = 'http://localhost:8000/api/logistica';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/proveedor/`);
  }

  getById(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/proveedor/${id}/`);
  }

  create(data: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>( `${this.apiUrl}/proveedor/`, data);
  }

  update(id: number, data: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.apiUrl}/proveedor/${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/proveedor/${id}/`);
  }
}
