import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonaMainComponent } from './persona-main.component';

fdescribe('PersonaMainComponent', () => {
  let fixture: ComponentFixture<PersonaMainComponent>;
  let component: PersonaMainComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaMainComponent],
    });

    fixture = TestBed.createComponent(PersonaMainComponent);
    component = fixture.componentInstance;
  });

  it('should create the PersonaMainComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menuItems and ItemList', () => {
    expect(component.menuItems).toEqual([]);
    expect(component.ItemList).toEqual([
      { name: 'Definitions' },
      { name: 'Assets' },
      { name: 'Governance' },
    ]);
  });
});
