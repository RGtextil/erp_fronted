import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../../interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoClienteService {
  private apiUrl = 'http://localhost:8000/api/ventas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/pedido/`);
  }

  getById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/pedido/${id}/`);
  }

  create(data: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>( `${this.apiUrl}/pedido/`, data);
  }

  update(id: number, data: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/pedido/${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pedido/${id}/`);
  }
}
