import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoComentarioComponent } from './nuevo-comentario.component';

describe('NuevoComentarioComponent', () => {
  let component: NuevoComentarioComponent;
  let fixture: ComponentFixture<NuevoComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
