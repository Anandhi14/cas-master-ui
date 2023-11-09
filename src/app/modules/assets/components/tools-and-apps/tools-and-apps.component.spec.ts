import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolsAndAppsComponent } from './tools-and-apps.component';
import { MenuItem } from 'primeng/api';

fdescribe('ToolsAndAppsComponent', () => {
  let component: ToolsAndAppsComponent;
  let fixture: ComponentFixture<ToolsAndAppsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolsAndAppsComponent],
    });

    fixture = TestBed.createComponent(ToolsAndAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of menu items', () => {
    expect(component.menuItems).toEqual([
      { label: 'Assets', url: '#/assets', target: '_self' },
      { label: 'Tools and Apps', url: '#/assets/tool-and-apps', target: '_self' },
    ]);
  });

  it('should have an item list with names', () => {
    const itemNames = component.ItemList.map(item => item.name);
    expect(itemNames).toEqual(['GLOVE', 'GUide', 'GUAGE', 'ATMA']);
  });
});
