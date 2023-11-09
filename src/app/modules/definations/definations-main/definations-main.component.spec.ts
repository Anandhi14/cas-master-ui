import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefinationsMainComponent } from './definations-main.component';
import { MenuItem } from 'primeng/api';

fdescribe('DefinationsMainComponent', () => {
  let component: DefinationsMainComponent;
  let fixture: ComponentFixture<DefinationsMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefinationsMainComponent],
    });

    fixture = TestBed.createComponent(DefinationsMainComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menuItems with Definitions', () => {
    const menuItems: MenuItem[] = [
      { label: 'Definitions', url: '#/definitions', target: '_self' },
    ];

    expect(component.menuItems).toEqual(menuItems);
  });

  it('should initialize ItemList with predefined items', () => {
    const expectedItemList = [
      { name: 'Sub Personas' },
      { name: 'Activity' },
      { name: 'Locations' },
      { name: 'Functions' },
      { name: 'Goals' },
    ];

    expect(component.ItemList).toEqual(expectedItemList);
  });
});
