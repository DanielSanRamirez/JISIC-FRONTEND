import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosInscripcionComponent } from './datos-inscripcion.component';

describe('DatosInscripcionComponent', () => {
  let component: DatosInscripcionComponent;
  let fixture: ComponentFixture<DatosInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosInscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
