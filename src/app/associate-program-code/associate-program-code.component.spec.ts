import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateProgramCodeComponent } from './associate-program-code.component';

describe('AssociateProgramCodeComponent', () => {
  let component: AssociateProgramCodeComponent;
  let fixture: ComponentFixture<AssociateProgramCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateProgramCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociateProgramCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
