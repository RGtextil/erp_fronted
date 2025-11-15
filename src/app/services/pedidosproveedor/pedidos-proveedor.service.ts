import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoProveedor } from '../../interfaces/pedidoProveedor';

@Injectable({
  providedIn: 'root'
})
export class PedidosProveedorService {
 private apiUrl = 'http://localhost:8000/api/logistica';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PedidoProveedor[]> {
    return this.http.get<PedidoProveedor[]>(`${this.apiUrl}/pedido/`);
  }

  getById(id: number): Observable<PedidoProveedor> {
    return this.http.get<PedidoProveedor>(`${this.apiUrl}/pedido/${id}/`);
  }

  create(data: PedidoProveedor): Observable<PedidoProveedor> {
    return this.http.post<PedidoProveedor>( `${this.apiUrl}/pedido/`, data);
  }

  update(id: number, data: PedidoProveedor): Observable<PedidoProveedor> {
    return this.http.put<PedidoProveedor>(`${this.apiUrl}/pedido/${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pedido/${id}/`);
  }
}
