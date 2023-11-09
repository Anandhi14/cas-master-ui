import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppsComponent } from './apps.component';

fdescribe('AppsComponent', () => {
  let component: AppsComponent;
  let fixture: ComponentFixture<AppsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppsComponent],
    });

    fixture = TestBed.createComponent(AppsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menuItems with the correct values', () => {
    const expectedMenuItems = [
      { label: 'Assets', url: '#/', target: '_self' },
      { label: 'Tools and Apps', url: '#/', target: '_self' },
      { label: 'guage', url: '#/', target: '_self' },
    ];
    expect(component.menuItems).toEqual(expectedMenuItems);
  });

  it('should initialize ItemList with the correct values', () => {
    const expectedItemList = [
      { name: 'Configuration' },
      { name: 'Data Manegment' },
      { name: 'Master Data' },
    ];
    expect(component.ItemList).toEqual(expectedItemList);
  });
});
