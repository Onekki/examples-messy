import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JcwComponent } from './jcw.component';

describe('JcwComponent', () => {
  let component: JcwComponent;
  let fixture: ComponentFixture<JcwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JcwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JcwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
