import { TestBed } from '@angular/core/testing';

import { PedidosProveedorService } from './pedidos-proveedor.service';

describe('PedidosProveedorService', () => {
  let service: PedidosProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosProveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
