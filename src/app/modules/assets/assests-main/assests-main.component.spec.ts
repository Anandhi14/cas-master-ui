import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssestsMainComponent } from './assests-main.component';

fdescribe('AssestsMainComponent', () => {
  let component: AssestsMainComponent;
  let fixture: ComponentFixture<AssestsMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssestsMainComponent],
    });

    fixture = TestBed.createComponent(AssestsMainComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menuItems with the correct values', () => {
    expect(component.menuItems).toEqual([{ label: 'Assets', url: '#/assets', target: '_self' }]);
  });

  it('should initialize ItemList with the correct values', () => {
    expect(component.ItemList).toEqual([{ name: 'Tools & App' }]);
  });
});
