import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from '../../interfaces/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8000/api/ventas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${this.apiUrl}/cliente/`);
  }

  getById(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.apiUrl}/cliente/${id}/`);
  }

  create(data: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>( `${this.apiUrl}/cliente/`, data);
  }

  update(id: number, data: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${this.apiUrl}/cliente/${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cliente/${id}/`);
  }
}
