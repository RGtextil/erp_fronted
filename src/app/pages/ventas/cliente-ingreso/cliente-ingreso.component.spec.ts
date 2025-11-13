import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteIngresoComponent } from './cliente-ingreso.component';

describe('ClienteIngresoComponent', () => {
  let component: ClienteIngresoComponent;
  let fixture: ComponentFixture<ClienteIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteIngresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
