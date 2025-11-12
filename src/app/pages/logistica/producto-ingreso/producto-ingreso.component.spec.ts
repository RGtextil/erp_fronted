import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoIngresoComponent } from './producto-ingreso.component';

describe('ProductoIngresoComponent', () => {
  let component: ProductoIngresoComponent;
  let fixture: ComponentFixture<ProductoIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoIngresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
