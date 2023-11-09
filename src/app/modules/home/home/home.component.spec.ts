import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FormBuilder } from '@angular/forms';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [FormBuilder],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize showForm to false', () => {
    expect(component.showForm).toBe(false);
  });

  it('onAddClick should set showForm to true', () => {
    component.onAddClick();
    expect(component.showForm).toBe(true);
  });

  it('close should set showForm to false', () => {
    component.showForm = true;
    component.close();
    expect(component.showForm).toBe(false);
  });

  // You can write more test cases for other component methods and properties
});
