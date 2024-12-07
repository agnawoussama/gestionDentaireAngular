import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDentisteComponent } from './modifier-dentiste.component';

describe('ModifierDentisteComponent', () => {
  let component: ModifierDentisteComponent;
  let fixture: ComponentFixture<ModifierDentisteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierDentisteComponent]
    });
    fixture = TestBed.createComponent(ModifierDentisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
