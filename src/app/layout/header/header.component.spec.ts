  import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServiceService } from 'src/app/commonService/common-service.service';
import { BehaviorSubject } from 'rxjs';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let commonService: CommonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide:  ActivatedRoute, useValue: {} },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        CommonServiceService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    commonService = TestBed.inject(CommonServiceService);
  });

  
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  

  it('should navigate to the specified URL when iteamClick is called', () => {
    const mockItem = { devurl: '/example' };
    component.iteamClick({ item: mockItem });
    expect(router.navigate).toHaveBeenCalledWith(['/example']);
  });

  it('should navigate to the previous URL when goBack is called', () => {
    const menuItems = [
      { devurl: '/page1' },
      { devurl: '/page2' },
    ];
    component.menuItems = menuItems;
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/page1']);
  });

  it('should navigate to the root URL when goBack is called with no menu items', () => {
    component.menuItems = [];
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set showAddbutton to false and navigate to /modelscreen when openAddPopup is called', () => {
    component.commonService.showAddbutton = true;
    component.openAddPopup();
    expect(component.commonService.showAddbutton).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/modelscreen']);
  });
});
