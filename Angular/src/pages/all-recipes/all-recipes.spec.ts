import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRecipes } from './all-recipes';

describe('AllRecipes', () => {
  let component: AllRecipes;
  let fixture: ComponentFixture<AllRecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRecipes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRecipes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
